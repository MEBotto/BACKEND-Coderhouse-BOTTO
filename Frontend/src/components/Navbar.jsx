import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";
import Button from "./Button.jsx";
import NavLink from "./NavLink.jsx";

const links = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Manga", path: "/products/manga" },
  { name: "Comics", path: "/products/comics" },
  { name: "Dashboard", path: "/dashboard", role: "admin" },
  { name: "Add Product", path: "/products/add", role: "premium" },
];

function Navbar() {
  const { token, setToken } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [open, setOpen] = useState(false);

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
    },
  };

  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
    },
  };

  const listVariants = {
    closed: {
      x: "10vw",
    },
    opened: {
      x: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const listItemVariants = {
    closed: {
      x: -100,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };

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
  }, [token, setToken]);

  useEffect(() => {
    if (remainingTime !== null) {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      console.log(`Remaining time: ${minutes} minutes and ${seconds} seconds`);
    }
  }, [remainingTime]);

  const handleLogout = () => {
    setToken(null);
    fetch("http://localhost:8080/api/auth/logout")
      .then((response) => {
        console.log(response);
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
      } fixed top-0 left-0 w-screen flex items-center py-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 text-lg`}
    >
      <div className="w-screen flex items-center justify-between">
        <div className="hidden lg:flex gap-4 w-1/2 2xl:w-1/3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              link={link}
              role={user?.role}
              theme={theme}
            />
          ))}
        </div>
        <div className="lg:hidden 2xl:flex 2xl:w-1/3 xl:justify-center">
          <Link to={"/"}>
            {theme === "dark" ? (
              <img src="/logo_dark.webp" alt="Logo dark" className="h-14" />
            ) : (
              <img src="/logo_light.webp" alt="Logo light" className="h-14" />
            )}
          </Link>
        </div>
        <div className="hidden lg:flex gap-4 w-1/2 2xl:w-1/3 justify-end items-center">
          {user ? (
            <div className="flex gap-2">
              <Link to={"/profile"} className="flex gap-4 items-center">
                <img
                  src={user.photo}
                  alt={`Avatar of ${user.name}`}
                  className="w-10 rounded-full"
                />
                <p>{user.name}</p>
              </Link>
              <Button
                onClickFunction={handleLogout}
                iconName={"ri-logout-box-line"}
                iSize={"text-3xl"}
              />
            </div>
          ) : (
            <>
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
            </>
          )}
          <div className="flex gap-0">
            <Button
              onClickFunction={toggleTheme}
              iconName={theme === "dark" ? "ri-moon-fill" : "ri-sun-fill"}
              iSize={"text-3xl"}
            />
            <Link to={"/cart"}>
              <Button iconName={"ri-shopping-cart-2-fill"} iSize={"text-3xl"} />
            </Link>
          </div>
        </div>
        <div className="lg:hidden">
          <button
            className="w-10 h-8 flex flex-col justify-between z-50 relative"
            onClick={() => setOpen(!open)}
          >
            <motion.div
              variants={topVariants}
              animate={open ? "opened" : "closed"}
              className={`w-10 h-1 ${
                theme === "dark" ? "bg-white" : "bg-black"
              } rounded origin-left`}
            ></motion.div>
            <motion.div
              variants={centerVariants}
              animate={open ? "opened" : "closed"}
              className={`w-10 h-1 ${
                theme === "dark" ? "bg-white" : "bg-black"
              } rounded`}
            ></motion.div>
            <motion.div
              variants={bottomVariants}
              animate={open ? "opened" : "closed"}
              className={`w-10 h-1 ${
                theme === "dark" ? "bg-white" : "bg-black"
              } rounded origin-left`}
            ></motion.div>
          </button>
          {open && (
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="opened"
              className={`absolute top-0 left-0 w-screen h-screen ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              } flex flex-col items-center justify-center gap-8 text-4xl z-40`}
            >
              {links.map((link) => {
                if (link.role && user?.role !== link.role) {
                  return null;
                }
                return (
                  <motion.div variants={listItemVariants} key={link.name}>
                    <Link to={link.path} onClick={() => setOpen(false)}>
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              {user ? (
                <motion.div variants={listItemVariants} className="flex gap-2">
                  <Link
                    to={"/profile"}
                    onClick={() => setOpen(false)}
                    className="flex gap-4 items-center"
                  >
                    <img
                      src={user.photo}
                      alt={`Avatar of ${user.name}`}
                      className={`w-10 rounded-full ${
                        theme === "dark" ? "bg-white" : ""
                      }`}
                    />
                    <p>{user.name}</p>
                  </Link>
                  <div onClick={() => setOpen(false)}>
                    <Button
                      onClickFunction={handleLogout}
                      iconName={"ri-logout-box-line"}
                      iSize={"text-4xl"}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={listItemVariants}
                  className="flex gap-4 items-center"
                >
                  <Link to={"/login"} onClick={() => setOpen(false)}>
                    <Button
                      text={"Log in"}
                      iconName={"ri-login-box-fill"}
                      className={"font-bold"}
                      iClass={"font-normal"}
                      iSize={"text-4xl"}
                    />
                  </Link>
                  <Link to={"/register"} onClick={() => setOpen(false)}>
                    <Button
                      text={"Sign Up"}
                      className={`${
                        theme === "dark"
                          ? "bg-mainColor text-black"
                          : "bg-mainColorLight text-white"
                      } p-2 rounded-xl font-bold`}
                    />
                  </Link>
                </motion.div>
              )}
              <motion.div variants={listItemVariants} className="flex gap-0">
                <div onClick={() => setOpen(false)}>
                  <Button
                    onClickFunction={toggleTheme}
                    iconName={theme === "dark" ? "ri-moon-fill" : "ri-sun-fill"}
                    iSize={"text-6xl"}
                  />
                </div>
                <Link to={"/cart"} onClick={() => setOpen(false)}>
                  <Button
                    iconName={"ri-shopping-cart-2-fill"}
                    iSize={"text-6xl"}
                  />
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
