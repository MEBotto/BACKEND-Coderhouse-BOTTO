import { useState, useEffect } from "react";
import ProductCard from "../../components/Cards/ProductCard";
import { useTheme } from "../../context/ThemeContext";

const Products = () => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/extend/products?limit=${limit}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const data = await response.json();
        setProducts(data.data.docs);
        setTotalPages(data.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${i === page ? "border-b-2" : ""} ${
            theme === "dark" ? "border-mainColor" : "border-mainColorLight"
          } font-bold text-2xl w-4`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

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
          <button
            className={`${page === 1 ? "invisible" : "visible"} text-2xl`}
            onClick={() => handlePageChange(setPage(page - 1))}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>
          {renderPageNumbers()}
          <button
            className={`${
              page === totalPages ? "invisible" : "visible"
            } text-2xl`}
            onClick={() => handlePageChange(setPage(page + 1))}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
