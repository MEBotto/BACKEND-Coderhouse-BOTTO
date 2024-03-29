import Button from "../Button/Button";

const CartProductCard = ({ product }) => {
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
            <p className="hover:underline hover:cursor-pointer text-blue-600">
              Delete
            </p>
            <p className="hover:underline hover:cursor-pointer text-blue-600">
              Save
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center border border-gray-400 rounded-sm py-1 px-4">
          <Button text={"-"} />
          <input
            type="text"
            value={product.quantity}
            pattern="[0-9]*"
            inputMode="numeric"
            className="border-none bg-transparent focus:outline-none app text-center w-16"
          />
          <Button text={"+"} />
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
