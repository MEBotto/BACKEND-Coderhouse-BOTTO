import PropTypes from "prop-types";
import { ProductsCarousel } from "./Carousels.jsx";
import { CategoryCard } from "./Cards.jsx";

export default function CategoriesSection({ theme }) {
  return (
    <section className="w-full mt-12">
      <div
        className={`container mx-auto p-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <div className="grid sm:max-md:grid-rows-2 md:max-lg:grid-cols-2 lg:grid-cols-auto-1fr gap-8">
          <CategoryCard category="Seinen" theme={theme} />
          <ProductsCarousel theme={theme} category="seinen" />
        </div>
      </div>
    </section>
  );
}

CategoriesSection.propTypes = {
  theme: PropTypes.string.isRequired,
};
