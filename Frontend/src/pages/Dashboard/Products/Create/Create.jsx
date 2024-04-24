import PropTypes from "prop-types";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import FormProduct from "../../../../components/FormProduct";

export default function Create({ theme }) {
  return (
    <div
      className={`w-full h-full ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Create Product",
            href: "/dashboard/products/create",
            active: true,
          },
        ]}
        theme={theme}
      />
      <FormProduct t={theme} />
    </div>
  );
}

Create.propTypes = {
  theme: PropTypes.string,
};
