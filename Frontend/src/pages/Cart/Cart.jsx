import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/Button/Button";

const Cart = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? "bg-color text-white" : "bg-colorLight text-black"
      } w-screen h-screen flex justify-center pt-24 pb-12`}
    >
      <div className="w-3/4 grid grid-cols-4 gap-4 p-5">
        <div className="border border-gray-400 rounded-lg col-span-3 h-1/2 flex flex-col items-center justify-center">
          <i className="ri-shopping-cart-2-fill text-6xl" />
          <h1 className="text-bold text-3xl my-4">
            It looks like you don't have anything in your cart!
          </h1>
          <h2>Add products for free shipping!</h2>
          <h2 className="my-2">
            Add more than 10 products to get <b>FREE SHIPPING!</b>
          </h2>
          <Link to={"/products"}>
            <Button
              text={"Back to shop"}
              className={`${
                theme === "dark"
                  ? "bg-mainColor text-black"
                  : "bg-mainColorLight text-white"
              } p-2 rounded-xl font-bold mt-8`}
            />
          </Link>
        </div>
        <div className="border border-gray-400 rounded-lg col-span-1 h-fit flex flex-col items-center justify-start">
          <div className="w-full border-b border-gray-400 p-5">
            <h2 className="text-xl">Purchase Summary</h2>
          </div>
          <div className="h-full p-5">
            <p>Here you'll see your purchase amounts once you add products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
