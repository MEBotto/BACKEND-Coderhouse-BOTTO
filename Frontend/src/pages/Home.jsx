import useTheme from "../hooks/useTheme.js";
import { HomeCarousel } from "../components/Carousels.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import CategoriesSection from "../components/CategoriesSection.jsx";

export default function Home() {
  const { theme } = useTheme();

  return (
    <>
      <HomeCarousel theme={theme} />
      <div
        className={`${
          theme === "dark" ? "bg-color" : "bg-colorLight"
        } w-full h-full flex flex-col justify-center items-center p-8`}
      >
        <ServicesSection theme={theme} />
        <CategoriesSection theme={theme} />
      </div>
    </>
  );
}
