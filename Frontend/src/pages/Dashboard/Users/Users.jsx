import { useEffect, useState } from "react";
import Search from "../../../components/Search";
import { UsersTable } from "../../../components/Tables";
import Pagination from "../../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { fetchUserData } from "../../../lib/data";
import { ToastContainer, Bounce } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";

export default function Users() {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const { theme } = useTheme();
  const limit = 5;

  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  
  useEffect(() => {
    fetchUserData(limit, page, query, token)
      .then((data) => {
        if (data && data.totalPages) {
          setTotalPages(data.totalPages);
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => console.error("An error occurred:", error));
  }, [query, page, limit, token]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1
          className={`text-2xl ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Users
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <UsersTable
        query={query}
        currentPage={Number(page)}
        theme={theme}
        limit={limit}
      />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} theme={theme} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
