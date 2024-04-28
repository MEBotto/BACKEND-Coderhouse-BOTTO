import { CartProductCard, SummaryCard } from "./Cards";
import PropTypes from "prop-types";

export default function CartItems({
  theme,
  cart,
  forceUpdate,
  setForceUpdate,
}) {
  return (
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
        <SummaryCard theme={theme} products={cart.products} cid={cart._id} />
      </div>
    </div>
  );
}

CartItems.propTypes = {
  theme: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
  forceUpdate: PropTypes.bool.isRequired,
  setForceUpdate: PropTypes.func.isRequired,
};
