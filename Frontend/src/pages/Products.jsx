import { useState, useEffect } from "react";
import { fetchProductData } from "../lib/data.js";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useSearchParams, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";

const Products = () => {
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const limit = 20;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const category = pathname.split("/")[2] || "";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchProductData(limit, page, query, category);
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [page, limit, query, category]);

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } w-full h-full flex justify-center pt-24 pb-12`}
    >
      <div className="container min-h-screen w-4/5">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
            {products.map((product) => (
              <ProductCard p={product} t={theme} key={product._id} />
            ))}
          </div>
        )}
        <div
          className={`${
            theme === "dark" ? "text-white" : "text-black"
          } flex justify-center gap-4 mt-4`}
        >
          <Pagination totalPages={totalPages} theme={theme}/>
        </div>
      </div>
    </div>
  );
};

export default Products;
