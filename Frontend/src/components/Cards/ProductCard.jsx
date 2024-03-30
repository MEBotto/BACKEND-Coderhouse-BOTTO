import Button from "../Button/Button";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const ProductCard = ({ p, t }) => {
  const { token } = useAuth();

  const addProductToCart = (pid) => {
    const fetchData = async () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.user;

        try {
          const response = await fetch(
            `http://localhost:8080/api/carts/user/${user.userId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const cartData = await response.json();
          if (cartData.cartSelected) {
            const cart = cartData.cartSelected;
            const product = cart.products.find(
              (product) => product.productId._id === pid
            );
            if (product) {
              const stock = product.productId.stock;
              const quantity = product.quantity;
              if (stock > quantity) {
                const addProductResponse = await fetch(
                  `http://localhost:8080/api/carts/${cart._id}/product/${pid}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (!addProductResponse.ok) {
                  throw new Error("Add product error");
                }
                console.log("Se agrego bien el producto");
              } else {
                alert("No hay mas stock del producto");
              }
            } else {
              const addProductResponse = await fetch(
                `http://localhost:8080/api/carts/${cart._id}/product/${pid}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!addProductResponse.ok) {
                throw new Error("Add product error");
              }
              console.log("Se agrego bien el producto");
            }
          } else {
            const postResponse = await fetch(
              "http://localhost:8080/api/carts",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user.userId }),
              }
            );

            if (!postResponse.ok) {
              throw new Error("Error adding user's cart");
            }

            const newCartData = await postResponse.json();
            const cart = newCartData.cartCreated;
            const product = cart.products.find(
              (product) => product.productId._id === pid
            );
            if (product) {
              const stock = product.productId.stock;
              const quantity = product.quantity;
              if (stock > quantity) {
                const addProductResponse = await fetch(
                  `http://localhost:8080/api/carts/${cart._id}/product/${pid}`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (!addProductResponse.ok) {
                  throw new Error("Add product error");
                }
                console.log("Se agrego bien el producto");
              } else {
                alert("No hay mas stock del producto");
              }
            } else {
              const addProductResponse = await fetch(
                `http://localhost:8080/api/carts/${cart._id}/product/${pid}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!addProductResponse.ok) {
                throw new Error("Add product error");
              }
              console.log("Se agrego bien el producto");
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        alert(
          "No hay un usuario logueado. Ingrese para poder agregar al carrito"
        );
      }
    };

    fetchData();
  };

  const viewInfo = () => {
    Swal.fire({
      imageUrl: p.thumbnail,
      imageHeight: 200,
      imageAlt: p.title,
      text: p.description,
    });
  };

  return (
    <div
      className={`flex flex-col items-center border ${
        t === "dark"
          ? "border-gray-400 text-white"
          : "border-zinc-900 text-black"
      } rounded-xl pb-2`}
    >
      <div
        className={`p-4 border-b ${
          t === "dark"
            ? "border-gray-400 text-white"
            : "border-zinc-900 text-black"
        }`}
      >
        {" "}
        <img
          src={p.thumbnail}
          alt={`Imagen de ${p.title}`}
          className="rounded-lg md:h-[400px] lg:h-[340px] xl:h-[390px]"
        />
      </div>
      <h2 className="uppercase text-lg font-bold mt-2">{p.title}</h2>
      <p className="mx-4 text-justify overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[90%]">
        {p.description}
      </p>
      <p className="text-xl font-bold my-2">${p.price}</p>
      <div className="flex justify-between gap-4">
        <Button
          text={"View More"}
          className={"font-bold"}
          onClickFunction={viewInfo}
        />
        <Button
          text={"Add to Cart"}
          className={`${
            t === "dark"
              ? "bg-mainColor text-black"
              : "bg-mainColorLight text-white"
          } p-2 rounded-xl font-bold`}
          onClickFunction={() => addProductToCart(p._id)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
