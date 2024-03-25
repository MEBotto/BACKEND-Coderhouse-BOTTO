import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";

const FormRegister = ({ t }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex flex-col justify-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2
        className={`${
          t === "dark" ? "text-white" : "text-black"
        } font-bold text-4xl mb-4 text-center`}
      >
        Register
      </h2>
      <div className="flex flex-col justify-center items-start">
        <input
          type="text"
          placeholder="First Name"
          {...register("first_name", { required: true })}
          className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
            t === "dark" ? "" : "border border-black"
          }`}
        />
        {errors.first_name && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <input
          type="text"
          placeholder="Last Name"
          {...register("last_name", { required: true })}
          className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
            t === "dark" ? "" : "border border-black"
          }`}
        />
        {errors.last_name && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
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
      <div className="flex flex-col justify-center items-start">
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
      <div className="flex flex-col justify-center items-start">
        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirm_password", { required: true })}
          className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
            t === "dark" ? "" : "border border-black"
          }`}
        />
        {errors.confirm_password && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="flex flex-col justify-center items-start">
        <input
          type="number"
          placeholder="Age"
          {...register("age", { required: true })}
          className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
            t === "dark" ? "" : "border border-black"
          }`}
        />
        {errors.age && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div className="flex justify-center mt-3">
        <p className={`${t === "dark" ? "text-white" : "text-black"}`}>
          Already Registered? Sign in{" "}
          <Link to={"/login"} className="hover:underline">
            <b>here</b>
          </Link>
        </p>
      </div>
      <Button
        type="submit"
        text="Sign Up"
        className={`${
          t === "dark"
            ? "bg-mainColor text-black"
            : "bg-mainColorLight text-white"
        } rounded-3xl font-bold py-2 px-5 mt-3`}
        iconName="ri-login-box-fill"
      />
    </form>
  );
};

export default FormRegister;
