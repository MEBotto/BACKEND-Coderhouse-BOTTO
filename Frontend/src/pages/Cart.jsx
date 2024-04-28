import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme.js";
import useAuth from "../hooks/useAuth.js";
import { fetchUserCart } from "../lib/data.js";
import { createUserCart } from "../lib/actions.js";
import { showToast } from "../lib/utils.js";
import EmptyCart from "../components/EmptyCart";
import CartItems from "../components/CartItems.jsx";
import { LoginPrompt } from "../components/LoginPrompt.jsx";

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
          <EmptyCart theme={theme} />
        ) : (
          <CartItems
            theme={theme}
            cart={cart}
            forceUpdate={forceUpdate}
            setForceUpdate={setForceUpdate}
          />
        )
      ) : (
        <LoginPrompt theme={theme} page="cart" />
      )}
    </div>
  );
};

export default Cart;
