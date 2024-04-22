import PropTypes from "prop-types";
import clsx from "clsx";
import { useLocation, Link } from "react-router-dom";
import { generatePagination } from "../lib/utils.js";

export default function Pagination({ totalPages, theme }) {
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(Number(currentPage), Number(totalPages));

  const createPageURL = (page) => {
    const params = new URLSearchParams(location.search);
    params.set("page", page?.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
          theme={theme}
        />
        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
                theme={theme}
              />
            );
          })}
        </div>
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
          theme={theme}
        />
      </div>
    </>
  );
}

function PaginationNumber({ href, page, position, isActive, theme }) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-lg text-white",
    {
      "z-10 border-b border-b-2 border-mainColor text-white": isActive && theme === "dark",
      "z-10 border-b border-b-2 border-mainColorLight text-black": isActive && theme === "light",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link to={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ href, direction, isDisabled, theme }) {
  const className = clsx(
    "flex text-4xl items-center justify-center",
    {
      "text-white": theme === "dark",
      "text-black": theme === "light",
      "pointer-events-none text-gray-600": isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <i className="ri-arrow-left-s-line" />
    ) : (
      <i className="ri-arrow-right-s-line" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} to={href}>
      {icon}
    </Link>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  theme: PropTypes.string,
};

PaginationArrow.propTypes = {
  href: PropTypes.string,
  direction: PropTypes.oneOf(["left", "right"]),
  isDisabled: PropTypes.bool,
  theme: PropTypes.string,
};

PaginationNumber.propTypes = {
  href: PropTypes.string,
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  position: PropTypes.oneOf(["first", "middle", "last", "single"]),
  isActive: PropTypes.bool,
  theme: PropTypes.string,
};
