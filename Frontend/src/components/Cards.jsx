import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { fetchCardData, fetchUserCart } from "../lib/data.js";
import { createUserCart, addProductToCart } from "../lib/actions.js";
import { showToast } from "../lib/utils.js";
import { useState, useEffect } from "react";
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
