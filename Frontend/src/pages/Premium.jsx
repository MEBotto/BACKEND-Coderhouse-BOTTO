import useTheme from "../hooks/useTheme";

export default function Premium() {
  const { theme } = useTheme(); 

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } w-screen h-screen flex justify-center items-end`}
    >
      <h1>PREMIUM</h1>
    </div>
  );
}
