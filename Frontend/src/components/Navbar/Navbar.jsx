import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Button from "../Button/Button.jsx";

function Navbar() {
  const { token, logout, setToken } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let intervalId;

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.user);

      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = decodedToken.exp;
      const timeRemainingInSeconds = expirationTime - currentTime;
      setRemainingTime(timeRemainingInSeconds);

      if (timeRemainingInSeconds <= 0) {
        setToken(null);
      }

      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setUser(null);
      setRemainingTime(null);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [token]);

  useEffect(() => {
    if (remainingTime !== null) {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      // console.log(`Remaining time: ${minutes} minutes and ${seconds} seconds`);
    }
  }, [remainingTime]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setToken(null);
    fetch("http://localhost:8080/api/auth/logout")
      .then((response) => {
        console.log(response)
        if (response.ok) {
          navigate("/");
        } else {
          throw new Error("Failed to logout");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
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
          } w-full md:block md:w-auto flex justify-end`}
          id="navbar-dropdown"
        >
          <div className="flex flex-col mt-4 items-end gap-2 md:flex-row md:gap-0 md:justify-between md:items-center md:mt-0 font-bold">
            <Link to={"/"}>Home</Link>
            <Link to={"/products"} className="mx-0 md:mx-2">
              Products
            </Link>
            <Link to={"/products"} className="mx-0 md:mr-2">
              Manga
            </Link>
            <Link to={"/products"} className="mx-0 md:mr-2">
              Comics
            </Link>
            {user?.role === "admin" ? (
              <Link to={"/dashboard"} className="mx-0 md:mr-2">
                Dashboard
              </Link>
            ) : null}
            {user?.role === "premiun" ? (
              <Link to={"/products/add"} className="mx-0 md:mr-2">
                Add Product
              </Link>
            ) : null}
          </div>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <div className="flex flex-col items-end gap-2 mt-2 md:flex-row md:items-center justify-end md:gap-4 md:mr-4 md:mt-0">
            {user ? (
              <Link to={"/profile"} className="flex gap-4 items-center">
                <img
                  src={user.photo}
                  alt={`Avatar of ${user.name}`}
                  className="w-10 rounded-full"
                />
                <p>{user.name}</p>
              </Link>
            ) : (
              <div className="flex gap-4 items-center">
                <Link to={"/login"}>
                  <Button
                    text={"Log in"}
                    iconName={"ri-login-box-fill"}
                    className={"font-bold"}
                    iClass={"font-normal"}
                  />
                </Link>
                <Link to={"/register"}>
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
            )}

            <div className="flex flex-wrap gap-1 md:flex-nowrap">
              {user && (
                <Button
                  onClickFunction={handleLogout}
                  iconName={"ri-logout-box-line"}
                  iSize={"text-3xl"}
                />
              )}

              <Button
                onClickFunction={toggleTheme}
                iconName={theme === "dark" ? "ri-moon-fill" : "ri-sun-fill"}
                iSize={"text-3xl"}
              />
              <Link to={"/cart"}>
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
