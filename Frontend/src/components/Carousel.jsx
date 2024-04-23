import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const images = ["/1.webp", "/2.webp", "/3.webp", "/4.webp", "/5.webp"];

export default function Carousel({ theme }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="h-screen relative z-30 bg-black flex items-center justify-center">
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute w-full h-full"
      >
        <div className="relative w-full h-full">
          <img
            src={images[index]}
            alt="Background"
            className="w-full h-full object-cover absolute"
          />
          <div className="absolute w-full h-full bg-black opacity-50"></div>
        </div>
      </motion.div>
      <div className="w-3/4 top-1/2 left-1/4 transform z-40 grid grid-cols-2 items-center gap-4">
        <div className="col-span-1">
          <div className="grid grid-rows-2 items-center">
            <img
              src={theme === "dark" ? "/logo_dark.webp" : "/logo_light.webp"}
              alt="Logo"
            />
            <div className="h-full px-8 flex flex-col justify-start gap-4">
              <h1 className="text-white text-4xl">
                Explore Your Passion for Manga!
              </h1>
              <p className="text-xl font-bold text-zinc-300">We&apos;ve been waiting for you!</p>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full w-full flex items-center justify-center">
          <div className="h-full w-3/5 bg-black bg-opacity-50 backdrop-blur-md flex flex-col justify-between items-center">
            <div className="h-3/5 w-4/5 flex flex-col items-center justify-center gap-4">
              <div className="w-full flex flex-col justify-center items-center border-b pb-4 border-zinc-400">
                <h2 className="text-4xl text-white font-bold text-center">
                  New volumes
                </h2>
                <p className="text-xl font-bold text-zinc-400">Of the week</p>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <p className="text-xl font-bold text-zinc-400">
                  Until Wednesday
                </p>
                <h2 className="text-4xl text-white font-bold text-center">
                  10% OFF!
                </h2>
              </div>
            </div>
            <div
              className={`${
                theme === "dark" ? "bg-mainColor" : "bg-mainColorLight"
              } w-1/2 h-2/5 rounded-t-lg flex flex-col items-center justify-center`}
            >
              <h2 className="text-4xl text-black font-bold">Presale</h2>
              <p
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-300"
                } text-xl font-bold`}
              >
                Of the week
              </p>
              <Link to={"/products#"}></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  theme: PropTypes.string.isRequired,
};
