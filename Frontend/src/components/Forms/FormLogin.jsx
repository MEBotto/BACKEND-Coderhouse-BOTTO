import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

const FormLogin = ({ t }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  const handleGithubLogin = async () => {
    window.location.href = "http://localhost:8080/api/auth/github";
  };

  return (
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
        <a
          href="#"
          className={`${
            t === "dark" ? "text-white" : "text-black"
          } hover:underline`}
        >
          Forget Password
        </a>
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
  );
};

export default FormLogin;
