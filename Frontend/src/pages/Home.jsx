import useTheme from "../hooks/useTheme.js";
import Carousel from "../components/Carousel.jsx";

export default function Home() {
  const { theme } = useTheme();

  return (
    <>
      <Carousel theme={theme}/>
      <div
        className={`${
          theme === "dark" ? "bg-color" : "bg-colorLight"
        } w-full h-full flex flex-col justify-center`}
      >
        <h1>Home</h1>
      </div>  
    </>
  );
}
