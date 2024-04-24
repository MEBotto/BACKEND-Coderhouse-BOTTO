import { Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

export default function Breadcrumbs({ breadcrumbs, theme }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={"flex text-xl md:text-2xl"}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? theme === "dark" ? "text-white" : "text-black" : "text-gray-500"
            )}
          >
            <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ).isRequired,
  theme: PropTypes.string.isRequired,
};
