import { useEffect, useState } from "react";
import Search from "../../../../components/Search";
import { UsersTable } from "../../../../components/Tables";
import Pagination from "../../../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { fetchUserData } from "../../../../lib/data";
import { ToastContainer, Bounce } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useTheme from "../../../../hooks/useTheme";
import { deleteInactivesUsers } from "../../../../lib/actions";

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

  const deleteInactives = async () => {
    await deleteInactivesUsers(theme, token);
  }

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
        <Search placeholder="Search users..." />
        <button
          className={`flex h-10 items-center rounded-lg ${
            theme === "dark"
              ? "bg-mainColor text-black hover:bg-green-400"
              : "bg-mainColorLight text-white hover:bg-green-400"
          } px-4 text-sm font-medium  transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
          onClick={deleteInactives}
        >
          <span className="hidden md:block">Delete Inactives</span>
          <i className="ri-subtract-line md:ml-4 text-2xl" />
        </button>
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
