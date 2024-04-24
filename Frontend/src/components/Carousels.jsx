import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import { fetchProductData } from "../lib/data.js";
import 'react-multi-carousel/lib/styles.css';

const images = ["/1.webp", "/2.webp", "/3.webp", "/4.webp", "/5.webp"];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

export function HomeCarousel({ theme }) {
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
      <div className="w-3/4 top-1/2 left-1/4 transform z-40 grid sm:max-md:grid-rows-1fr-auto md:max-xl:grid-rows-2 xl:grid-cols-2 items-center justify-center gap-4">
        <div className="sm:max-xl:row-span-1 xl:col-span-1">
          <div className="grid grid-rows-1fr-auto xl:grid-rows-2 items-center">
            <img
              src={theme === "dark" ? "/logo_dark.webp" : "/logo_light.webp"}
              alt="Logo"
            />
            <div className="h-auto xl:h-full px-8 flex flex-col justify-start gap-4">
              <h1 className="text-white text-2xl md:text-4xl">
                Explore Your Passion for Manga!
              </h1>
              <p className="text-lg md:text-xl font-bold text-zinc-300">
                We&apos;ve been waiting for you!
              </p>
            </div>
          </div>
        </div>
        <div className="sm:max-xl:row-span-1 xl:col-span-1 h-full w-full flex items-center justify-center">
          <div className="h-full w-full xl:w-3/5 bg-black bg-opacity-50 backdrop-blur-md flex flex-col justify-between items-center pt-4 gap-2 md:gap-0 md:pt-0">
            <div className="h-3/5 w-4/5 flex flex-col items-center justify-center md:gap-4">
              <div className="w-full flex flex-col justify-center items-center border-b md:pb-4 border-zinc-400">
                <h2 className="text-xl md:text-4xl text-white font-bold text-center">
                  New volumes
                </h2>
                <p className="md:text-xl font-bold text-zinc-400">
                  Of the week
                </p>
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <p className="md:text-xl font-bold text-zinc-400">
                  Until Wednesday
                </p>
                <h2 className="text-xl md:text-4xl text-white font-bold text-center">
                  10% OFF!
                </h2>
              </div>
            </div>
            <div
              className={`${
                theme === "dark" ? "bg-mainColor" : "bg-mainColorLight"
              } w-1/2 h-2/5 rounded-t-lg flex flex-col items-center justify-center`}
            >
              <h2 className="text-xl md:text-4xl text-black font-bold">
                Presale
              </h2>
              <p
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-300"
                } md:text-xl font-bold`}
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

// eslint-disable-next-line no-unused-vars
export function ProductsCarousel({ category }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const { products } = await fetchProductData(20, 1, null, category, null, 1);
        setProducts(products);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchData();
  }, [category]);

  return (
    <Carousel
      swipeable
      draggable
      showDots
      responsive={responsive}
      ssr
      infinite
      autoPlay={true}
      autoPlaySpeed={2000}
      keyBoardControl
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px px-1 xl:px-0 flex items-center justify-center"
    >
      {products.map((product) => (
        <div key={product._id} className="h-full lg:h-[95%] xl:h-[90%]">
          <img src={product.thumbnail} alt={`Carousel ${product._id}`} className="h-full rounded-xl"/>
        </div>
      ))}
    </Carousel>
  );
}

HomeCarousel.propTypes = {
  theme: PropTypes.string.isRequired,
};

ProductsCarousel.propTypes = {
  theme: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
