import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useState } from "react";
import Button from "../Button/Button.jsx";

function Navbar() {
  const { token, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/products");
  };

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      } fixed top-0 left-0`}
    >
      <div className="w-screen flex flex-wrap items-center justify-between mx-auto p-4 px-4">
        <Link to={"/"}>
          {" "}
          <Button
            text={"Logo"}
            iconName={"ri-home-smile-fill"}
            className={"text-3xl font-bold"}
            iSize={"text-3xl"}
            iClass={`${
              theme === "dark" ? "text-mainColor" : "text-mainColorLight"
            }`}
          />
        </Link>

        <button
          onClick={toggleMenu}
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded={isMenuOpen}
          id="menu-icon"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <div className="flex justify-between items-center font-bold">
            <Link to={"/"}>Home</Link>
            <Link to={"/products"} className="mx-2">
              Products
            </Link>
            <Link to={"/products"} className="mr-2">
              Manga
            </Link>
            <Link to={"/products"}>Comics</Link>
            {user?.role === "admin" ? (
              <Link to={"/dashboard"}>Dashboard</Link>
            ) : null}
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <div className="flex items-center justify-end gap-4 mr-4">
            <div className="flex gap-4 items-center">
              <Link to={"/login"}>
                {" "}
                <Button
                  text={"Log in"}
                  iconName={"ri-login-box-fill"}
                  className={"font-bold"}
                  iClass={"font-normal"}
                />
              </Link>
              <Link to={"/register"}>
                {" "}
                <Button
                  text={"Sign Up"}
                  className={`${
                    theme === "dark"
                      ? "bg-mainColor text-black"
                      : "bg-mainColorLight text-white"
                  } p-2 rounded-xl font-bold`}
                />
              </Link>
            </div>
            <div>
              <Button
                onClickFunction={toggleTheme}
                iconName={theme === "dark" ? "ri-moon-fill" : "ri-sun-fill"}
                iSize={"text-3xl"}
              />
              <Link to={"/cart"}>
                {" "}
                <Button
                  iconName={"ri-shopping-cart-2-fill"}
                  iSize={"text-3xl"}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
