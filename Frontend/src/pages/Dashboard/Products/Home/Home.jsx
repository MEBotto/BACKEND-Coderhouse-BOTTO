import { useEffect, useState } from "react";
import Search from "../../../../components/Search";
import { ProductsTable } from "../../../../components/Tables";
import Pagination from "../../../../components/Pagination";
import { useSearchParams, Link } from "react-router-dom";
import { fetchProductData } from "../../../../lib/data";
import PropTypes from "prop-types";

export default function Home({ theme }) {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const limit = 5;

  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function fetchAndLogTotalPages() {
      const data = await fetchProductData(limit, page, query);
      setTotalPages(data.totalPages);
    }

    fetchAndLogTotalPages();
  }, [page, query, totalPages]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1
          className={`text-2xl ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Products
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <Link
          to="/dashboard/products/create"
          className={`flex h-10 items-center rounded-lg ${
            theme === "dark"
              ? "bg-mainColor text-black hover:bg-green-400"
              : "bg-mainColorLight text-white hover:bg-green-400"
          } px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
        >
          <span className="hidden md:block">Create Product</span>
          <i className="ri-add-fill md:ml-4 text-2xl" />
        </Link>
      </div>
      <ProductsTable query={query} currentPage={Number(page)} theme={theme} limit={limit} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} theme={theme} />
      </div>
    </div>
  );
}

Home.propTypes = {
  theme: PropTypes.string,
};