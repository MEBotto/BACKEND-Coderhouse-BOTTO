import "react-profile/themes/default.min.css";
import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  useLogin,
  registerUser,
  createProduct,
  updateUser,
  useLogout,
} from "../lib/actions";
import useAuth from "../hooks/useAuth";
import { ToastContainer, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { openEditor } from "react-profile";
import Button from "./Button";
import PropTypes from "prop-types";
import { showToast } from "../lib/utils";

const categories = [
  { value: "", label: "Select a category" },
  { value: "Comics", label: "Comics" },
  { value: "Josei", label: "Josei" },
  { value: "Seinen", label: "Seinen" },
  { value: "Shojo", label: "Shojo" },
  { value: "Shonen", label: "Shonen" },
  { value: "Yaoi", label: "Yaoi" },
  { value: "Yuri", label: "Yuri" },
];

const editorials = [
  { value: "", label: "Select an editorial" },
  { value: "Panini", label: "Panini" },
  { value: "Ivrea", label: "Ivrea" },
  { value: "Ovni Press", label: "Ovni Press" },
  { value: "Planeta Comics", label: "Planeta Comics" },
];

export function FormLogin({ t }) {
  const login = useLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await login(data);
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
}

export function FormRegister({ t }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await registerUser(data);
  };

  return (
    <div>
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
}

export function FormProduct({ t }) {
  const [fileName, setFileName] = useState("Select Image");
  const [file, setFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    await createProduct(data, file, token);
  };

  return (
    <div>
      <form
        className={`flex flex-col justify-center gap-2 ${
          t === "dark" ? "bg-zinc-900" : "bg-zinc-300"
        } rounded-xl p-2`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col justify-center items-start">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className={`py-[12px] px-[20px] w-full rounded-lg ${
              t === "dark"
                ? "bg-color placeholder-white text-white"
                : "border border-black placeholder-black text-black bg-colorLight"
            }`}
          />
          {errors.title && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <Controller
            control={control}
            name="volume"
            rules={{
              required: true,
              min: { value: 0, message: "Volume must be at least 0" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid volume",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <input
                type="number"
                placeholder="Volume"
                {...field}
                min="0"
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, e.target.value.length);
                }}
                className={`py-[12px] px-[20px] w-full rounded-lg ${
                  t === "dark"
                    ? "bg-color placeholder-white text-white"
                    : "border border-black placeholder-black text-black bg-colorLight"
                }`}
              />
            )}
          />
          {errors.volume && (
            <span className="text-red-500 text-xs italic">
              {errors.volume.message
                ? errors.volume.message
                : "This field is required"}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className={`py-[12px] px-[20px] w-full h-32 rounded-lg resize-none ${
              t === "dark"
                ? "bg-color placeholder-white text-white"
                : "border border-black placeholder-black text-black bg-colorLight"
            }`}
          />
          {errors.description && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <Controller
            control={control}
            name="price"
            rules={{
              required: true,
              min: { value: 1, message: "Price must be at least 1" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid price",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <input
                type="number"
                placeholder="Price"
                {...field}
                min="1"
                onInput={(e) => {
                  e.target.value = Math.max(1, parseInt(e.target.value))
                    .toString()
                    .slice(0, e.target.value.length);
                }}
                className={`py-[12px] px-[20px] w-full rounded-lg ${
                  t === "dark"
                    ? "bg-color placeholder-white text-white"
                    : "border border-black placeholder-black text-black bg-colorLight"
                }`}
              />
            )}
          />
          {errors.price && (
            <span className="text-red-500 text-xs italic">
              {errors.price.message
                ? errors.price.message
                : "This field is required"}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <input
            type="file"
            id="thumbnail"
            accept="image/png, image/jpeg, image/webp"
            hidden
            {...register("thumbnail", { required: true })}
            onChange={(e) => {
              if (e.target.files[0]) {
                setFileName(e.target.files[0].name);
                setFile(e.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="thumbnail"
            className={`py-[12px] px-[20px] w-full rounded-lg cursor-pointer ${
              t === "dark"
                ? "bg-color placeholder-white text-white"
                : "border border-black placeholder-black text-black bg-colorLight"
            }`}
          >
            {fileName}
          </label>
          {errors.thumbnail && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <select
            {...register("category", { required: true })}
            className={`py-[12px] px-[20px] w-full rounded-lg ${
              t === "dark"
                ? "bg-color placeholder-white text-white"
                : "border border-black placeholder-black text-black bg-colorLight"
            }`}
            title="Category"
          >
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <select
            {...register("editorial", { required: true })}
            className={`py-[12px] px-[20px] w-full rounded-lg ${
              t === "dark"
                ? "bg-color placeholder-white text-white"
                : "border border-black placeholder-black text-black bg-colorLight"
            }`}
            title="Editorial"
          >
            {editorials.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.editorial && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <Controller
            control={control}
            name="stock"
            rules={{
              required: true,
              min: { value: 1, message: "Stock must be at least 1" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid stock",
              },
            }}
            defaultValue=""
            render={({ field }) => (
              <input
                type="number"
                placeholder="Stock"
                {...field}
                min="1"
                onInput={(e) => {
                  e.target.value = Math.max(1, parseInt(e.target.value))
                    .toString()
                    .slice(0, e.target.value.length);
                }}
                className={`py-[12px] px-[20px] w-full rounded-lg ${
                  t === "dark"
                    ? "bg-color placeholder-white text-white"
                    : "border border-black placeholder-black text-black bg-colorLight"
                }`}
              />
            )}
          />
          {errors.stock && (
            <span className="text-red-500 text-xs italic">
              {errors.stock.message
                ? errors.stock.message
                : "This field is required"}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <label className="text-gray-700 font-bold">
            <input
              type="checkbox"
              className="mr-2 leading-tight"
              {...register("checkbox")}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            If the volume did not come out, check this box and enter the release
            date
          </label>
        </div>
        <div className="flex flex-col justify-center items-start">
          <input
            type="date"
            className={`appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
              !isChecked && "opacity-50 cursor-not-allowed"
            } ${
              t === "dark"
                ? "bg-color text-white placeholder-white"
                : "bg-colorLight text-black placeholder-black"
            }`}
            {...register("publication_date", { required: isChecked })}
            disabled={!isChecked}
          />
          {errors.publication_date && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            text="Create Product"
            className={`${
              t === "dark"
                ? "bg-mainColor text-black"
                : "bg-mainColorLight text-white"
            } rounded-lg font-bold py-2 px-5 my-1`}
          />
        </div>
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
}

export function FormUser({ t, user }) {
  const [displayedImage, setDisplayedImage] = useState(user.photo);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const inputClassName = `py-[12px] px-[20px] w-full rounded-lg ${
    t === "dark"
      ? "bg-color placeholder-white"
      : "border border-black placeholder-black bg-colorLight"
  } ${
    isEditing
      ? `${t === "dark" ? "text-white" : "text-black"}`
      : "text-gray-500"
  }`;
  const fileInputRef = useRef();
  const logout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    setValue("first_name", user.first_name);
    setValue("last_name", user.last_name);
    setValue("email", user.email);
    setValue("age", user.age);
    setValue("role", user.role);
  }, [user, setValue]);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = await openEditor({ src: e.target.files[0], square: true });
      const dataURL = image.editedImage?.getDataURL();
      const base64Response = await fetch(dataURL);
      const blob = await base64Response.blob();
      const file = new File([blob], e.target.files[0].name, {
        type: "image/jpeg",
      });
      setDisplayedImage(dataURL);
      setSelectedFile(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data) => {
    await updateUser(data, selectedFile, user._id, t);
    showToast("success", "You will be redirected in 5 seconds", t);
    setTimeout(async () => {
      await logout();
      navigate("/");
    }, 5000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`grid sm:max-md:grid-rows-auto-1fr md:grid-cols-auto-1fr ${
          t === "dark" ? "bg-zinc-900" : "bg-zinc-300"
        } rounded-xl p-2`}
      >
        <div className="flex flex-col items-center justify-between md:px-8">
          <input
            type="file"
            id="photo"
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            style={{ display: "none" }}
            disabled={!isEditing}
          />
          <img
            src={displayedImage}
            alt="Click to upload"
            onClick={handleImageClick}
            className={`w-80 h-auto rounded-full md:mt-2 ${
              isEditing ? "cursor-pointer" : ""
            }`}
          />
          <div className="hidden md:flex items-center justify-center md:mb-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEdit}
                  className={`${
                    t === "dark" ? "text-white" : "text-black"
                  } py-2 px-4 rounded-lg`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    t === "dark"
                      ? "bg-mainColor text-black"
                      : "bg-mainColorLight text-white"
                  } py-2 px-4 rounded-lg`}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className={`${
                  t === "dark"
                    ? "bg-mainColor text-black"
                    : "bg-mainColorLight text-white"
                } py-2 px-4 rounded-lg`}
              >
                Edit
              </button>
            )}
          </div>
        </div>

        <div
          className={`flex flex-col justify-center gap-2 ${
            t === "dark" ? "bg-zinc-900" : "bg-zinc-300"
          } rounded-xl p-2`}
        >
          <div className="flex flex-col justify-center items-start">
            <label className={`${t === "dark" ? "text-white" : "text-black"}`}>
              First Name
            </label>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
              type="text"
              disabled={!isEditing}
              placeholder="First Name"
              className={inputClassName}
            />
            {errors.first_name && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label className={`${t === "dark" ? "text-white" : "text-black"}`}>
              Last Name
            </label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              type="text"
              disabled={!isEditing}
              placeholder="Last Name"
              className={inputClassName}
            />
            {errors.last_name && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label className={`${t === "dark" ? "text-white" : "text-black"}`}>
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="text"
              disabled={!isEditing}
              placeholder="Email"
              className={inputClassName}
            />
            {errors.email && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label className={`${t === "dark" ? "text-white" : "text-black"}`}>
              Age
            </label>
            <Controller
              control={control}
              name="age"
              rules={{
                required: "Age is required",
                min: { value: 13, message: "Age must be at least 13" },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Please enter a valid age",
                },
              }}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="number"
                  placeholder="Age"
                  {...field}
                  min="13"
                  disabled={!isEditing}
                  onInput={(e) => {
                    e.target.value = Math.max(13, parseInt(e.target.value))
                      .toString()
                      .slice(0, e.target.value.length);
                  }}
                  className={inputClassName}
                />
              )}
            />
            {errors.age && (
              <span className="text-red-500 text-xs italic">
                {errors.age.message
                  ? errors.age.message
                  : "This field is required"}
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center items-start">
            <label className={`${t === "dark" ? "text-white" : "text-black"}`}>
              Role
            </label>
            <input
              {...register("role", { required: "Role is required" })}
              type="text"
              disabled={true}
              placeholder="Role"
              className={`py-[12px] px-[20px] w-full rounded-lg ${
                t === "dark"
                  ? "bg-color placeholder-white"
                  : "border border-black placeholder-black bg-colorLight"
              } text-gray-500`}
            />
            {errors.role && (
              <span className="text-red-500 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div className="flex md:hidden items-center justify-center mt-4">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEdit}
                  className={`${
                    t === "dark" ? "text-white" : "text-black"
                  } py-2 px-4 rounded-lg`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    t === "dark"
                      ? "bg-mainColor text-black"
                      : "bg-mainColorLight text-white"
                  } py-2 px-4 rounded-lg`}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className={`${
                  t === "dark"
                    ? "bg-mainColor text-black"
                    : "bg-mainColorLight text-white"
                } py-2 px-4 rounded-lg`}
              >
                Edit
              </button>
            )}
          </div>
        </div>
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
}

FormUser.propTypes = {
  t: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

FormProduct.propTypes = {
  t: PropTypes.string.isRequired,
};

FormRegister.propTypes = {
  t: PropTypes.string.isRequired,
};

FormLogin.propTypes = {
  t: PropTypes.string.isRequired,
};
