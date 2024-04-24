import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer, Bounce } from "react-toastify";
import useAuth from "../hooks/useAuth.js";
import "react-toastify/dist/ReactToastify.css";
import Button from "./Button.jsx";
import PropTypes from "prop-types";

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

export default function FormProduct({ t }) {
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
    const formData = new FormData();
    if (data && typeof data === 'object') {
      for (const key in data) {
        if (key === 'publication_date' && !data[key]) {
          continue;
        }
        if (key === 'checkbox') {
          continue;
        }
        formData.append(key, data[key]);
      }
    }
    formData.append('thumbnail', file);

    try {
      const response = await fetch(`http://localhost:8080/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
            accept="image/png, image/jpeg"
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

FormProduct.propTypes = {
  t: PropTypes.string.isRequired,
};
