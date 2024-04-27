import { FormRegister } from "../components/Forms.jsx";
import useTheme from "../hooks/useTheme.js";

const Register = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } h-screen w-screen my-auto flex justify-center items-center`}
    >
      <FormRegister t={theme} />
    </div>
  );
};

export default Register;
