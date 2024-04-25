import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";
import { purchaseCart } from "../lib/actions";
import {
  showToast,
  calculateTotalPrice,
  calculateTotalQuantity,
} from "../lib/utils";

export default function SummaryCard({ theme, products, cid }) {
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
  calculateTotalPrice: PropTypes.func,
  calculateTotalQuantity: PropTypes.func,
};
