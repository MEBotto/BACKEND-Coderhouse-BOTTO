import { Link } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";

export default function EmptyCart({ theme }) {
  return (
    <div className="w-full lg:w-fit h-minusNavbar grid max-sm:grid-rows-auto-1fr md:max-lg:grid-cols-auto-1fr lg:grid-cols-4 gap-4 p-4">
      <div className="border border-gray-400 rounded-lg flex flex-col items-center justify-center md:h-1/2 lg:col-span-3 p-4">
        <i className="ri-shopping-cart-2-fill text-6xl" />
        <h1 className="text-bold text-center text-lg md:text-3xl my-4">
          It looks like you don&apos;t have anything in your cart!
        </h1>
        <h2 className="text-sm md:text-base">
          Add products for free shipping!
        </h2>
        <h2 className="text-sm md:text-base text-center my-2">
          Add more than 10 products to get <b>FREE SHIPPING!</b>
        </h2>
        <Link to={"/products"}>
          <Button
            text={"Back to shop"}
            className={`${
              theme === "dark"
                ? "bg-mainColor text-black"
                : "bg-mainColorLight text-white"
            } p-2 rounded-xl font-bold`}
          />
        </Link>
      </div>
      <div className="border border-gray-400 rounded-lg h-fit lg:w-56 flex flex-col items-center justify-start">
        <div className="w-full border-b border-gray-400 p-5">
          <h2 className="text-xl">Purchase Summary</h2>
        </div>
        <div className="h-full p-5">
          <p>
            Here you&apos;ll see your purchase amounts once you add products.
          </p>
        </div>
      </div>
    </div>
  );
}

EmptyCart.propTypes = {
  theme: PropTypes.string.isRequired,
};
