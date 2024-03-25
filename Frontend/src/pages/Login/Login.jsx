import { useTheme } from "../../context/ThemeContext.jsx";
import FormLogin from "../../components/Forms/FormLogin.jsx";

const Login = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } h-screen w-screen my-auto flex justify-center items-center`}
    >
      <FormLogin t={theme}/>
    </div>
  );
};

export default Login;
