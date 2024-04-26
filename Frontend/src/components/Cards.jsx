import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fetchCardData } from "../lib/data.js";
import { useState, useEffect } from "react";
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
      className="flex flex-col justify-center items-center gap-6 p-12 rounded-2xl lg:w-[352px]"
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
