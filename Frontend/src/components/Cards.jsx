import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { fetchCardData, fetchUserCart } from "../lib/data.js";
import {
  createUserCart,
  addProductToCart,
  deleteProductFromCart,
  updateProductQuantity,
  purchaseCart,
} from "../lib/actions.js";
import {
  showToast,
  calculateTotalPrice,
  calculateTotalQuantity,
} from "../lib/utils.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import Button from "./Button.jsx";
import useAuth from "../hooks/useAuth";

const iconMap = {
  collected: "ri-wallet-3-line",
  customers: "ri-folder-user-line",
  products: "ri-store-2-line",
  invoices: "ri-bill-line",
};

export default function CardWrapper({ theme }) {
  const { token } = useAuth();
  const [data, setData] = useState({
    numberOfCustomers: "Loading...",
    numberOfInvoices: "Loading...",
    totalPaidInvoices: "Loading...",
    numberOfProducts: "Loading...",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const cardData = await fetchCardData(token);
        setData(cardData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    numberOfProducts,
  } = data;

  return (
    <>
      <Card
        title="Collected"
        type="collected"
        theme={theme}
        value={totalPaidInvoices}
      />
      <Card
        title="Total Products"
        type="products"
        theme={theme}
        value={numberOfProducts}
      />
      <Card
        title="Total Invoices"
        type="invoices"
        theme={theme}
        value={numberOfInvoices}
      />
      <Card
        title="Total Customers"
        type="customers"
        theme={theme}
        value={numberOfCustomers}
      />
    </>
  );
}

export function Card({ title, type, theme, value }) {
  const Icon = iconMap[type];

  return (
    <div
      className={`rounded-xl ${
        theme === "dark" ? "bg-zinc-900" : "bg-zinc-300"
      } p-2 shadow-sm`}
    >
      <div className="flex p-4">
        {Icon ? <i className={Icon} /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`truncate rounded-xl ${
          theme === "dark" ? "bg-color" : "bg-colorLight"
        } px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

export function CategoryCard({ category, theme }) {
  let title;
  let description;
  let url;
  switch (category) {
    case "Comics":
      title = "Comics";
      description = "Vibrant & action-packed!";
      url = "/comics.webp";
      break;
    case "Josei":
      title = "Josei";
      description = "Realistic & heartfelt!";
      url = "/josei.webp";
      break;
    case "Seinen":
      title = "Seinen";
      description = "Sophisticated & intertwining!";
      url = "/seinen.webp";
      break;
    case "Shojo":
      title = "Shōjo";
      description = "Dreamy & emotional!";
      url = "/shojo.webp";
      break;
    case "Shonen":
      title = "Shōnen";
      description = "For teens & for everyone!";
      url = "/shonen.webp";
      break;
    case "Yaoi":
      title = "Yaoi";
      description = "Passionate & dramatic!";
      url = "/yaoi.webp";
      break;
    case "Yuri":
      title = "Yuri";
      description = "Emotional & inspiring connections!";
      url = "/yuri.webp";
      break;
  }

  return (
    <div
      className="flex flex-col justify-center items-center gap-6 p-12 rounded-2xl lg:w-[352px] grid-area-category"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-4xl font-bold text-white">{title}</h2>
      <p className="text-sm text-white">{description}</p>
      <Link
        to={`/products/${category.toLowerCase()}`}
        className={`underline py-3 px-7 ${
          theme === "dark"
            ? "bg-mainColor text-black"
            : "bg-mainColorLight text-white"
        } rounded-lg`}
      >
        View More
      </Link>
    </div>
  );
}

export function ProductCard({ p, t }) {
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
      title: `${p.title} #${p.volume}`,
      text: p.description,
    });
  };

  return (
    <div
      className={`flex flex-col items-center group ${
        t === "dark"
          ? "border-gray-400 text-white"
          : "border-zinc-900 text-black"
      } pb-2 hover:bg-opacity-90 hover:border-transparent transition-all duration-500 ease-in-out hover:${
        t === "dark" ? "bg-zinc-900" : "bg-zinc-300"
      } rounded-lg hover:shadow-lg p-2`}
    >
      <div
        className={`p-4 ${
          t === "dark"
            ? "border-gray-400 text-white"
            : "border-zinc-900 text-black"
        }`}
      >
        <img
          src={p.thumbnail}
          alt={`Imagen de ${p.title}`}
          className="md:h-[400px] lg:h-[340px] xl:h-[390px]"
        />
      </div>
      <h2 className="uppercase text-lg font-bold">
        {p.title} #{p.volume}
      </h2>
      <p className="mx-4 text-justify overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[90%]">
        {p.description}
      </p>
      <p className="text-xl font-bold my-2">${p.price}</p>
      <div
        className={`border-b w-[90%] mt-2 ${
          t === "dark" ? "border-white" : "border-black"
        } group-hover:opacity-0 opacity-100 transition-all duration-500 ease-in-out`}
      />
      <div className="flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out invisible group-hover:visible">
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

export function CartProductCard({
  product,
  theme,
  cid,
  forceUpdate,
  setForceUpdate,
}) {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteProductOfCart = async () => {
    await deleteProductFromCart(
      cid,
      product.productId._id,
      setForceUpdate,
      forceUpdate
    );
  };

  const updateQuantityOnServer = async (newQuantity) => {
    await updateProductQuantity(
      cid,
      product.productId._id,
      newQuantity,
      setIsLoading,
      setIsDisabled,
      setForceUpdate,
      forceUpdate
    );
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.productId.stock) {
      setQuantity(newQuantity);
      updateQuantityOnServer(newQuantity);
    } else {
      console.error("Invalid quantity");
    }
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (
      !isNaN(inputValue) &&
      inputValue >= 1 &&
      inputValue <= product.productId.stock
    ) {
      setQuantity(inputValue);
    } else {
      console.error("Invalid quantity");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuantityChange(parseInt(e.target.value));
    }
  };

  return (
    <div className="w-full min-w-[815px] grid grid-cols-8 p-5 border border-gray-400 rounded-lg">
      <div className="col-span-5 flex items-center gap-4">
        <img
          src={product.productId.thumbnail}
          alt={`Image of ${product.productId.title}`}
          className="w-[64px]"
        />
        <div className="grid grid-rows-2">
          <h2 className="text-bold row-span-1 text-2xl">
            {product.productId.title}
          </h2>
          <div className="flex gap-4">
            <Button
              text={"Delete"}
              className="hover:underline hover:cursor-pointer text-blue-600"
              onClickFunction={() => deleteProductOfCart()}
            />
            <Button
              text={"Save"}
              className="hover:underline hover:cursor-pointer text-blue-600"
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center border border-gray-400 rounded-sm py-1 px-4">
          <Button
            text={"-"}
            isDisabled={isDisabled}
            onClickFunction={() => handleQuantityChange(quantity - 1)}
          />
          {!isLoading ? (
            <input
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              value={quantity}
              min={1}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="border-none bg-transparent focus:outline-none app text-center w-16"
            />
          ) : (
            <Spinner
              className={`h-6 w-6 mx-5 ${
                theme === "dark" ? "text-mainColor" : "text-mainColorLight"
              }`}
            />
          )}
          <Button
            text={"+"}
            isDisabled={isDisabled}
            onClickFunction={() => handleQuantityChange(quantity + 1)}
          />
        </div>
        {product.productId.stock === 1 ? (
          <p>Latest available</p>
        ) : (
          <p>{product.productId.stock} available</p>
        )}
      </div>
      <div className="col-span-2 flex justify-end items-center">
        <h2 className="text-bold text-3xl">${product.productId.price}</h2>
      </div>
    </div>
  );
}

export function SummaryCard({ theme, products, cid }) {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(products));
    setTotalQuantity(calculateTotalQuantity(products));
  }, [products]);

  const purchaseFunction = async () => {
    try {
      purchaseCart(cid, theme);
      navigate("/products");
    } catch (error) {
      showToast("error", `${error}`, theme);
    }
  };

  return (
    <div className="h-full w-full p-5 grid-rows-5">
      <div className="row-span-1 flex justify-between items-center">
        {totalQuantity === 1 ? (
          <p>Product</p>
        ) : (
          <p>Products ({totalQuantity})</p>
        )}
        <p>${totalPrice}</p>
      </div>
      <div className="row-span-1 flex justify-between items-center">
        <p>Shipments</p>
        {totalQuantity <= 10 ? (
          <p>$8000</p>
        ) : (
          <p className="text-green-500">Free</p>
        )}
      </div>
      <div className="row-span-1 flex justify-start items-center">
        <p className="hover:underline hover:cursor-pointer text-blue-600">
          Enter coupon code
        </p>
      </div>
      <div className="row-span-1 flex justify-between items-center my-4 text-2xl text-bold">
        <p>Total</p>
        {totalQuantity <= 10 ? (
          <p>${totalPrice + 8000}</p>
        ) : (
          <p>${totalPrice}</p>
        )}
      </div>
      <div className="row-span-1 flex items-center">
        <Button
          text={"Checkout"}
          className={`${
            theme === "dark"
              ? "bg-mainColor text-black"
              : "bg-mainColorLight text-white"
          } p-2 rounded-xl font-bold w-full`}
          onClickFunction={() => purchaseFunction()}
        />
      </div>
    </div>
  );
}

SummaryCard.propTypes = {
  theme: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  cid: PropTypes.string.isRequired,
};

CartProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  cid: PropTypes.string.isRequired,
  forceUpdate: PropTypes.bool.isRequired,
  setForceUpdate: PropTypes.func.isRequired,
};

ProductCard.propTypes = {
  p: PropTypes.object.isRequired,
  t: PropTypes.string.isRequired,
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CategoryCard.propTypes = {
  category: PropTypes.oneOf([
    "Comics",
    "Josei",
    "Seinen",
    "Shojo",
    "Shonen",
    "Yaoi",
    "Yuri",
  ]).isRequired,
  theme: PropTypes.string.isRequired,
};

CardWrapper.propTypes = {
  theme: PropTypes.string.isRequired,
};
