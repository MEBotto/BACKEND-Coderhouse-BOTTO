import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button/Button";

const FormLogin = ({ t }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Something went wrong";

        if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new Error(errorMessage);
      }

      const responseData = await response.json();
      toast.success(`You've logged in successfully!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setToken(responseData.jwt)
      navigate("/products");
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleGithubLogin = async () => {
    window.location.href = "http://localhost:8080/api/auth/github";
  };

  return (
    <div>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2
          className={`${
            t === "dark" ? "text-white" : "text-black"
          } font-bold text-4xl mb-4 text-center`}
        >
          Login
        </h2>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
            className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
              t === "dark" ? "" : "border border-black"
            }`}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col justify-center items-center my-4">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
              t === "dark" ? "" : "border border-black"
            }`}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex justify-between">
          <Link
            to={"/password_reset"}
            className={`${
              t === "dark" ? "text-white" : "text-black"
            } hover:underline`}
          >
            Forget Password
          </Link>
          <Link
            to="/register"
            className={`${
              t === "dark" ? "text-white" : "text-black"
            } hover:underline`}
          >
            Signup
          </Link>
        </div>
        <Button
          type="submit"
          text="Sign In"
          className={`${
            t === "dark"
              ? "bg-mainColor text-black"
              : "bg-mainColorLight text-white"
          } rounded-3xl font-bold py-2 px-5 mt-3`}
          iconName="ri-login-box-fill"
        />
        <Button
          text="Sign In with GitHub"
          className={`${
            t === "dark"
              ? "bg-mainColor text-black"
              : "bg-mainColorLight text-white"
          } rounded-3xl font-bold py-2 px-5`}
          iconName="ri-github-fill"
          onClickFunction={handleGithubLogin}
        />
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default FormLogin;
