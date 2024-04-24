import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ProductsCarousel } from "./Carousels.jsx";

export default function CategoriesSection({ theme }) {
  console.log(theme);
  return (
    <section className="w-full">
      <div
        className={`container mx-auto p-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <div className="grid sm:max-md:grid-rows-2 md:max-lg:grid-cols-2 lg:grid-cols-auto-1fr gap-8">
          <div
            className="flex flex-col justify-center items-center gap-6 p-12 rounded-2xl lg:w-[352px]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/seinen.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-4xl font-bold">Seinen</h2>
            <p className="text-sm">Sofisticado y atrapante!</p>
            <Link
              to={"/products/seinen"}
              className={`underline py-3 px-7 ${
                theme === "dark"
                  ? "bg-mainColor text-black"
                  : "bg-mainColorLight text-white"
              } rounded-lg`}
            >
              Ver más
            </Link>
          </div>
          <ProductsCarousel theme={theme} category="seinen" />
        </div>
      </div>
    </section>
  );
}

CategoriesSection.propTypes = {
  theme: PropTypes.string.isRequired,
};
