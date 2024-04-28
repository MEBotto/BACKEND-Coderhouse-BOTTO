import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ServicesSection({ theme }) {
  return (
    <section className="w-full">
      <div
        className={`container mx-auto p-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <h2 className="text-4xl text-center font-bold mb-2">
          Welcome to the best online store
        </h2>
        <p className="text-center text-lg">
          Here you can find the best products at the best price
        </p>
      </div>
      <div
        className={`grid sm:max-lg:grid-rows-3 lg:grid-cols-3 divide-y lg:divide-x lg:divide-y-0 ${
          theme === "dark"
            ? "divide-zinc-400 text-white"
            : "divide-zinc-600 text-black"
        } divide-gray-200`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 p-4">
          <i className="ri-lock-star-line text-6xl hover:scale-110 transition-transform duration-200" />
          <div className="flex flex-col items-center lg:items-start">
            <Link
              to={"/premium"}
              className="font-bold text-xl underline underline-offset-2"
            >
              Become Premium
            </Link>
            <p
              className={`${
                theme === "dark" ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              and create your own products!
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 p-4">
          <i className="ri-secure-payment-line text-6xl hover:scale-110 transition-transform duration-200" />
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="font-bold text-xl underline underline-offset-2">
              Pay online!
            </h3>
            <p
              className={`${
                theme === "dark" ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              with MercadoPago
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 p-4">
          <i className="ri-chat-1-line text-6xl hover:scale-110 transition-transform duration-200" />
          <div className="flex flex-col items-center lg:items-start">
            <Link
              to={"/chat"}
              className="font-bold text-xl underline underline-offset-2"
            >
              Use our chat!
            </Link>
            <p
              className={`${
                theme === "dark" ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              chat with the community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

ServicesSection.propTypes = {
  theme: PropTypes.string.isRequired,
};
