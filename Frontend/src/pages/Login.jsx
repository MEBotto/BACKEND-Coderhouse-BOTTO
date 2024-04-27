import useTheme from "../hooks/useTheme.js";
import { FormLogin } from "../components/Forms.jsx";

const Login = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } h-screen w-screen my-auto flex justify-center items-center`}
    >
      <FormLogin t={theme} />
    </div>
  );
};

export default Login;
