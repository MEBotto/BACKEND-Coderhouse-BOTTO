import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "FriKommerce - OpenAPI 3.0",
      description:
        "Here you have all the endpoints available at FriKommerce Server. This is a backend for and e-commerce. You have role system, CRUD for products, payments support",
      version: "1.13.0",
      contact: {
        email: "marianobotto92@gmail.com",
      },
      license: {
        name: "Apache 2.0",
        url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      },
    },
  },
  apis: [`./**/*.yaml`],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;