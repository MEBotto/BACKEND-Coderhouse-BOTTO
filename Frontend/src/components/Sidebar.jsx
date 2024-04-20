import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const links = [
  { name: "Home", path: "/dashboard", icon: "ri-home-2-line" },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: "ri-shopping-bag-line",
  },
  { name: "Users", path: "/dashboard/users", icon: "ri-folder-user-line" },
  { name: "Invoices", path: "/dashboard/invoices", icon: "ri-file-2-line" },
];

export default function SideBar({ theme }) {
  const { pathname } = useLocation();

  return (
    <div className={`flex h-full flex-col px-3 py-4 md:px-2 gap-2`}>
      <Link
        to="/"
        className={`"mb-2 flex h-20 items-end justify-start rounded-md ${
          theme === "dark" ? "bg-mainColor" : "bg-mainColorLight"
        } p-4 md:h-40"`}
      >
        <div
          className={`flex flex-row items-center leading-none ${
            theme === "dark" ? "text-black" : "text-black"
          }`}
        >
          <p className="text-[44px]">Logo</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`flex items-center justify-start gap-2 rounded-md p-2 md:p-3 ${
              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200"
            } ${
              pathname === link.path
                ? `${
                    theme === "dark" ? "text-mainColor" : "text-mainColorLight"
                  }`
                : `${theme === "dark" ? "text-white" : "text-black"}`
            }`}
          >
            {console.log(theme)}
            <i className={`${link.icon} text-2xl`} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}
        <div className={`hidden h-auto w-full grow rounded-md ${theme === "dark" ? "bg-color" : "bg-colorLight"} md:block`}></div>
        <button
          className={`flex items-center justify-start gap-2 rounded-md p-2 md:p-3 ${
            theme === "dark" ? "hover:bg-gray-700 text-white" : "hover:bg-gray-200 text-black"
          }`}
        >
          <i className={`ri-logout-circle-line text-2xl`} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  theme: PropTypes.string.isRequired,
};
