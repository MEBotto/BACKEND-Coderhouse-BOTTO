import { useState } from "react";
import Button from "../Button/Button";
import { Spinner } from "@material-tailwind/react";

const CartProductCard = ({
  product,
  theme,
  cid,
  forceUpdate,
  setForceUpdate,
}) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const deleteProductOfCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cid}/products/${product.productId._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantityOnServer = async (newQuantity) => {
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await fetch(
        `http://localhost:8080/api/carts/${cid}/products/${product.productId._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }
      setIsLoading(false);
      setIsDisabled(false);
      setForceUpdate(!forceUpdate);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setIsLoading(false);
      setIsDisabled(false);
    }
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
    <div className="w-full grid grid-cols-8 p-5 border border-gray-400 rounded-lg">
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
};

export default CartProductCard;
