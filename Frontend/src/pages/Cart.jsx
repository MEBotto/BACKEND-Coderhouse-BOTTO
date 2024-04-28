import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme.js";
import useAuth from "../hooks/useAuth.js";
import Button from "../components/Button";
import CartProductCard from "../components/CartProductCard";
import SummaryCard from "../components/SummaryCard";
import { fetchUserCart } from "../lib/data.js";
import { createUserCart } from "../lib/actions.js";
import { showToast } from "../lib/utils.js";

const Cart = () => {
  const { theme } = useTheme();
  const { token, uid } = useAuth();
  const [cart, setCart] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const cartData = await fetchUserCart(uid);
          if (cartData.cartSelected) {
            setCart(cartData.cartSelected);
          } else {
            const newCartData = await createUserCart(uid);
            setCart(newCartData.cartCreated);
          }
        } catch (error) {
          showToast("error", `${error}`, theme);
        }
      }
    };

    fetchData();
  }, [forceUpdate, token, uid, theme]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color text-white" : "bg-colorLight text-black"
      } w-screen h-screen flex flex-col items-center justify-end `}
    >
      {cart ? (
        cart.products.length === 0 ? (
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
                  Here you&apos;ll see your purchase amounts once you add
                  products.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-4/5 h-minusNavbar grid max-sm:grid-rows-auto-1fr md:max-lg:grid-cols-auto-1fr lg:grid-cols-4 gap-4 p-4">
            <div
              className="h-full overflow-y-auto flex flex-col items-start justify-start lg:col-span-3 gap-4 p-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
              }}
            >
              {cart.products.map((product) => (
                <CartProductCard
                  product={product}
                  theme={theme}
                  cid={cart._id}
                  forceUpdate={forceUpdate}
                  setForceUpdate={setForceUpdate}
                  key={product.productId._id}
                />
              ))}
            </div>
            <div className="border border-gray-400 rounded-lg h-fit flex flex-col items-center justify-start">
              <div className="w-full border-b border-gray-400 p-5">
                <h2 className="text-xl">Purchase Summary</h2>
              </div>
              <SummaryCard
                theme={theme}
                products={cart.products}
                cid={cart._id}
              />
            </div>
          </div>
        )
      ) : (
        <div className="w-full h-minusNavbar p-4 flex justify-center items-center">
          <div className="h-fit border border-gray-400 rounded-lg flex flex-col justify-center items-center p-4">
            <h1 className="text-bold text-3xl my-4 text-center">
              Oops! It looks like you are not logged in.
            </h1>
            <h2 className="my-2 text-center">Please log in to view the cart</h2>
            <Link to={"/login"}>
              <Button
                text={"Go to login"}
                className={`${
                  theme === "dark"
                    ? "bg-mainColor text-black"
                    : "bg-mainColorLight text-white"
                } p-2 rounded-xl font-bold mt-6`}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
