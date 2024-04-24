import { useState } from "react";
import useTheme from "../hooks/useTheme.js";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import Button from "../components/Button.jsx";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswords = () => {
    return password === confirmPassword || "Passwords don't match";
  };

  const onSubmitEmail = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/recover-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Something went wrong";

        if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new Error(errorMessage);
      }

      toast.success(`The email was sent!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setIsClicked(true);
    } catch (error) {
      toast.error(`${error}`, {
        position: "bottom-center",
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

  const onSubmitPassword = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/new-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      toast.success(`Successfully updated password!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      toast.error(`${error}`, {
        position: "bottom-center",
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

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color text-white" : "bg-colorLight text-black"
      } h-screen w-screen flex flex-col justify-start items-center`}
    >
      {token ? (
        <>
          <h1 className={`mt-5 text-2xl`}>Change password for</h1>
          <h2 className={`mt-3 mb-5 text-2xl`}>{email}</h2>
          <div className="border border-gray-400 rounded-xl p-5 w-1/4">
            <form onSubmit={handleSubmit(onSubmitPassword)}>
              <div className="flex flex-col items-center">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className={`w-full text-black p-3 rounded-3xl ${
                    theme === "dark" ? "" : "border border-black"
                  } ${errors.password ? "mt-3" : "mb-3"}`}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500 mb-3">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: validatePasswords,
                  })}
                  placeholder="Confirm Password"
                  className={`w-full text-black p-3 rounded-3xl ${
                    theme === "dark" ? "" : "border border-black"
                  }`}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                text="Change password"
                className={`${
                  theme === "dark"
                    ? "bg-mainColor text-black"
                    : "bg-mainColorLight text-white"
                } rounded-3xl font-bold py-2 px-5 mt-3 w-full`}
              />
            </form>
          </div>
        </>
      ) : (
        <>
          {" "}
          <h1 className={`my-5 text-2xl`}>Reset your password</h1>
          <div className="border border-gray-400 rounded-xl p-5 w-1/4">
            {!isClicked ? (
              <>
                <p className="mb-3">
                  Enter your user account&apos;s email adress and we will send you a
                  password reset link.
                </p>
                <form onSubmit={handleSubmit(onSubmitEmail)}>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      {...register("email", { required: true })}
                      className={`w-full text-black p-3 rounded-3xl ${
                        theme === "dark" ? "" : "border border-black"
                      }`}
                      placeholder="Enter your email adress"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    text="Send password reset email"
                    className={`${
                      theme === "dark"
                        ? "bg-mainColor text-black"
                        : "bg-mainColorLight text-white"
                    } rounded-3xl font-bold py-2 px-5 mt-3 w-full`}
                  />
                </form>
              </>
            ) : (
              <>
                <p>
                  Check your email for a link to reset your password. If it
                  doesn&apos;t appear within a few minutes, check your spam folder.
                </p>
                <Link to={"/login"}>
                  <Button
                    type="submit"
                    text="Return to sign in"
                    className={`${
                      theme === "dark"
                        ? "bg-mainColor text-black"
                        : "bg-mainColorLight text-white"
                    } rounded-3xl font-bold py-2 px-5 mt-3 w-full`}
                  />
                </Link>
              </>
            )}
          </div>
        </>
      )}
      <ToastContainer
        position="bottom-center"
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

export default PasswordReset;
