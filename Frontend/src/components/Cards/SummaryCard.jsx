import { useState, useEffect } from "react";
import Button from "../Button/Button";

const SummaryCard = ({ theme, products }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(products));
    setTotalQuantity(calculateTotalQuantity(products));
  }, [products]);

  function calculateTotalPrice(products) {
    return products.reduce((total, product) => {
      return total + product.productId.price * product.quantity;
    }, 0);
  }

  function calculateTotalQuantity(products) {
    return products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  }

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
        />
      </div>
    </div>
  );
};

export default SummaryCard;
