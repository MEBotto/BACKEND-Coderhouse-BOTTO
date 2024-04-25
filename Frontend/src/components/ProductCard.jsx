import Button from "./Button";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth.js";
import { addProductToCart, createUserCart } from "../lib/actions.js";
import { fetchUserCart } from "../lib/data.js";
import PropTypes from "prop-types";
import { showToast } from "../lib/utils.js";

export default function ProductCard({ p, t }) {
  const { token, uid } = useAuth();

  const addProductToUserCart = (pid) => {
    const fetchData = async () => {
      if (token) {
        try {
          const cartData = await fetchUserCart(uid);
          let cart;
          if (cartData.cartSelected) {
            cart = cartData.cartSelected;
          } else {
            const newCartData = await createUserCart(uid);
            cart = newCartData.cartCreated;
          }

          const product = cart.products.find(
            (product) => product.productId._id === pid
          );
          if (product) {
            const stock = product.productId.stock;
            const quantity = product.quantity;
            if (stock > quantity) {
              await addProductToCart(cart._id, pid);
            } else {
              showToast("error", "No more stock available", t);
            }
          } else {
            await addProductToCart(cart._id, pid);
          }
        } catch (error) {
          console.error(error);
          showToast("error", `${error}`, t);
        }
      } else {
        showToast(
          "error",
          "There is no user logged in. Please log in to be able to add to the cart.",
          t
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
      <h2 className="uppercase text-lg font-bold mt-2">
        {p.title} #{p.volume}
      </h2>
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
          onClickFunction={() => addProductToUserCart(p._id)}
        />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  p: PropTypes.object.isRequired,
  t: PropTypes.string.isRequired,
};
