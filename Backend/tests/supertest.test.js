import { expect } from "chai";
import supertest from "supertest";
import bcrypt from "bcrypt";

const requester = supertest("http://localhost:8080");

let createdUser;

describe("Testing Auth Endpoints", () => {
  describe("Create a new account", () => {
    it("Register account successfully using email and password", async function () {
      const mockUser = {
        first_name: "John",
        last_name: "Test",
        email: "test@example.com",
        registerWith: "form",
        role: "user",
        password: "test1234",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/auth/register")
        .send(mockUser);

      expect(statusCode).is.equals(200);
      expect(ok).is.equals(true);
      expect(_body.success).is.equals(true);

      createdUser = _body.data;
    });

    it("The password should be stored encrypted", async function () {
      const isMatch = await bcrypt.compare("test1234", createdUser.password);

      expect(createdUser.password).to.not.equal("test1234");
      expect(isMatch).is.equals(true);
    });

    it("User register within the App should not have GitHubID or GoogleID", async function () {
      expect(createdUser).not.have.property("github_id");
      expect(createdUser).not.have.property("google_id");
    });

    it("New user should have 'user' role", async function () {
      expect(createdUser.role).to.be.equals("user");
      expect(createdUser.role).to.be.a("string");
    });

    it("New user should have 'form' registerWith", async function () {
      expect(createdUser.registerWith).to.be.equals("form");
      expect(createdUser.registerWith).to.be.a("string");
    });
  });

  describe("Login user", () => {
    it("Login user successfully using valid credentials", async function () {
      const mockUser = {
        email: "test@example.com",
        password: "test1234",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/auth/login")
        .send(mockUser);

      expect(statusCode).is.equals(200);
      expect(ok).is.equals(true);
      expect(_body.success).is.equals(true);
    });

    it("Login user failed with invalid credentials", async function () {
      const mockUser = {
        email: "test@example.com",
        password: "test123456",
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/auth/login")
        .send(mockUser);

      expect(statusCode).is.equals(400);
      expect(ok).is.equals(false);
      expect(_body.success).is.equals(false);
      expect(_body.error).is.equals("Invalid credentials");
    });
  });

  describe("Logout user", () => {
    it("Logout user successfully", function (done) {
      requester.get("/api/auth/logout").end((error, response) => {
        if (error) {
          done(error);
        } else {
          const { statusCode, ok, _body, headers } = response;

          const cookieResult = headers["set-cookie"][0];
          const cookieData = cookieResult.split(";");

          this.cookie = {
            name: cookieData[0].split("=")[0],
            value: cookieData[0].split("=")[1],
          };

          expect(this.cookie.name).to.be.ok.and.equal("access_token");
          expect(this.cookie.value).to.be.equals("");

          expect(statusCode).is.equals(200);
          expect(ok).is.equals(true);
          expect(_body.success).is.equals(true);

          done();
        }
      });
    });
  });
});

describe("Testing Product Endpoints", () => {
  let newProduct;
  describe("Create a new product", () => {
    it("Create a new product with all information neccesary", async function () {
      const mockProduct = {
        title: "Test product",
        description: "Description for a random test product",
        price: 100,
        thumbnail: "https://images.unsplash.com/photo-1519002",
        category: "Manga",
        code: "TEST01",
        stock: 10,
        status: true,
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/product")
        .send(mockProduct);

      expect(statusCode).is.equals(201);
      expect(ok).is.equals(true);
      expect(_body.productCreated).to.not.be.empty;

      newProduct = _body.productCreated;
    });

    it("Fail to create a new product with missing properties", async function () {
      const mockProduct = {
        title: "Test product",
        thumbnail: "https://images.unsplash.com/photo-1519002",
        category: "Manga",
        code: "TEST02",
        stock: 10,
        status: true,
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/product")
        .send(mockProduct);

      expect(statusCode).is.equals(400);
      expect(ok).is.equals(false);
      expect(_body.error).is.equals("Product creation error");
      expect(_body.code).is.equals(3);
    });

    it("Fail to create a new product with existing code", async function () {
      const mockProduct = {
        title: "Test product",
        description: "Description for a random test product",
        price: 100,
        thumbnail: "https://images.unsplash.com/photo-1519002",
        category: "Manga",
        code: "TEST01",
        stock: 10,
        status: true,
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/product")
        .send(mockProduct);

      expect(statusCode).is.equals(400);
      expect(ok).is.equals(false);
      expect(_body.error).is.equals("Error");
      expect(_body.message).is.equals("Product not created");
    });
  });

  describe("Get products", () => {
    it("Get all products", async function () {
      const { statusCode, ok, _body } = await requester.get("/api/product");

      expect(statusCode).is.equals(200);
      expect(ok).is.equals(true);
      expect(_body.productData.payload).to.not.be.empty;
    });

    it("Get product by ID", async function () {
      const { statusCode, ok, _body } = await requester.get(
        `/api/product/${newProduct._id}`
      );

      expect(statusCode).is.equals(200);
      expect(ok).is.equals(true);
      expect(_body.productSelected).to.not.be.empty;
    });

    it("Failed to get product with an invalid ID", async function () {
      const { statusCode, ok, _body } = await requester.get(
        `/api/product/asleñw`
      );

      expect(statusCode).is.equals(404);
      expect(ok).is.equals(false);
      expect(_body.error).is.not.equals("");
    });
  });

  describe("Delete a product", () => {
    it("Failed to delete a product with invalid ProductID", async function () {
      const { statusCode, ok, _body } = await requester.delete(
        `/api/product/sñelqweña`
      );

      expect(statusCode).is.equals(400);
      expect(ok).is.equals(false);
      expect(_body.error).is.not.equals("");
    });

    it("Delete a product with a valid ProductID", async function () {
      const { statusCode, ok, _body } = await requester.delete(
        `/api/product/${newProduct._id}`
      );

      expect(statusCode).is.equals(200);
      expect(ok).is.equals(true);
      expect(_body.message).is.equals("Content successfully deleted!");
    });
  });
});

describe("Testing Cart Endpoints", () => {
  describe("Create a new cart", () => {
    it("Create a new cart successfully", async function () {
      const mockProduct = {
        title: "Test product",
        description: "Description for a random test product",
        price: 100,
        thumbnail: "https://images.unsplash.com/photo-1519002",
        category: "Manga",
        code: "TEST01",
        stock: 10,
        status: true,
      };

      const result = await requester.post("/api/product").send(mockProduct);

      const productGeneratedForTesting = result._body;

      const cartMock = {
        userId: createdUser._id,
        products: [productGeneratedForTesting.productCreated._id],
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/cart")
        .send(cartMock);
      expect(statusCode).is.equals(200);
      expect(ok).is.equals(true);
      expect(_body.cartCreated).to.not.be.empty;
    });

    it("Fail to create a new cart with missing properties", async function () {
      const cartMock = {
        userId: createdUser._id,
      };

      const { statusCode, ok, _body } = await requester
        .post("/api/cart")
        .send(cartMock);

      expect(statusCode).is.equals(400);
      expect(ok).is.equals(false);
      expect(_body.error).is.equals(
        "Please send an array of products to create your cart."
      );
    });
  });
});
