import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button.jsx";
import PropTypes from "prop-types";

export default function FormProduct({ t }) {
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
    try {
      const response = await fetch(`http://localhost:8080/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage;

        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }

        throw new Error(errorMessage);
      }

      toast.success("The product was successfully registered!", {
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
    } catch (error) {
      console.error(error);
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
          Add Product
        </h2>
        <div className="flex flex-col justify-center items-start">
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
              t === "dark" ? "" : "border border-black"
            }`}
          />
          {errors.title && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <textarea
            placeholder="Description"
            {...register("description", { required: true })}
            className={`py-[12px] px-[20px] w-80 h-32 rounded-3xl text-black ${
              t === "dark" ? "" : "border border-black"
            }`}
          />
          {errors.description && (
            <span className="text-red-500">This field is required</span>
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
                className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
                  t === "dark" ? "" : "border border-black"
                }`}
              />
            )}
          />
          {errors.price && (
            <span className="text-red-500">
              {errors.price.message
                ? errors.price.message
                : "This field is required"}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <input
            type="text"
            placeholder="Thumbnail"
            {...register("thumbnail", { required: true })}
            className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
              t === "dark" ? "" : "border border-black"
            }`}
          />
          {errors.thumbnail && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <select
            {...register("category", { required: true })}
            className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
              t === "dark" ? "" : "border border-black"
            }`}
          >
            <option value="">Select a category</option>
            <option value="Comics">Comics</option>
            <option value="Manga">Manga</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <Controller
            control={control}
            name="stock"
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
                placeholder="Stock"
                {...field}
                className={`py-[12px] px-[20px] w-80 rounded-3xl text-black ${
                  t === "dark" ? "" : "border border-black"
                }`}
              />
            )}
          />
          {errors.stock && (
            <span className="text-red-500">
              {errors.stock.message
                ? errors.stock.message
                : "This field is required"}
            </span>
          )}
        </div>
        <Button
          type="submit"
          text="Add Product"
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

FormProduct.propTypes = {
  t: PropTypes.string.isRequired,
};
