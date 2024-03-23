import { useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../../components/Button/Button.jsx";

const PasswordReset = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { theme } = useTheme();
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
    return password === confirmPassword || "Passwords don't match";
  };

  const onSubmitEmail = async (data) => {
    console.log(data);
    setIsClicked(!isClicked);
  };

  const onSubmitPassword = async (data) => {
    console.log(data);
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
          <h2 className={`mt-3 mb-5 text-2xl`}>Name</h2>
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
                <Button
                  type="submit"
                  text="Return to sign in"
                  className={`${
                    theme === "dark"
                      ? "bg-mainColor text-black"
                      : "bg-mainColorLight text-white"
                  } rounded-3xl font-bold py-2 px-5 mt-3 w-full`}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
