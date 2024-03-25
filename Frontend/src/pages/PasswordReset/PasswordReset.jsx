import { useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";

const PasswordReset = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { theme } = useTheme();
  const { email, setEmail } = useAuth();
  const { token } = useParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswords = () => {
    console.log(password);
    console.log(confirmPassword);
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

      const responseData = await response.json();
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
      setEmail(responseData.email);
    } catch (error) {
      console.log(error);
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

      const responseData = await response.json();
      console.log("Response:", responseData);
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
          {/* <h2 className={`mt-3 mb-5 text-2xl`}>{email}</h2> */}
          <div className="border border-gray-400 rounded-xl p-5 w-1/4">
            <form onSubmit={handleSubmit(onSubmitPassword)}>
              <div className="flex flex-col items-center">
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  className={`w-full text-black p-3 rounded-3xl my-3 ${
                    theme === "dark" ? "" : "border border-black"
                  }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="flex flex-col items-center">
                <label>Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: validatePasswords,
                  })}
                  placeholder="Confirm Password"
                  className={`w-full text-black p-3 rounded-3xl mt-3 ${
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
                  Enter your user account's email adress and we will send you a
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
                  doesn't appear within a few minutes, check your spam folder.
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
