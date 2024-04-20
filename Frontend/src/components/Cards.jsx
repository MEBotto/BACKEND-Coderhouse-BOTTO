import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const iconMap = {
  collected: "ri-wallet-3-line",
  customers: "ri-folder-user-line",
  products: "ri-store-2-line",
  invoices: "ri-bill-line",
};

export default function CardWrapper({ theme }) {
  const [data, setData] = useState({
    numberOfCustomers: "Loading...",
    numberOfInvoices: "Loading...",
    totalPaidInvoices: "Loading...",
    numberOfProducts: "Loading...",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const cardData = await fetchCardData();
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

async function fetchCardData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        numberOfCustomers: 100,
        numberOfInvoices: 200,
        totalPaidInvoices: "$300",
        numberOfProducts: 400,
      });
    }, 2000);
  });
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

Card.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CardWrapper.propTypes = {
  theme: PropTypes.string.isRequired,
};
