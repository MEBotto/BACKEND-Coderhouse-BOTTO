import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";

export function LoginPrompt({ theme, page }) {
  return (
    <div className="w-full h-minusNavbar p-4 flex justify-center items-center">
      <div className="h-fit border border-gray-400 rounded-lg flex flex-col justify-center items-center p-4">
        <h1 className="text-bold text-3xl my-4 text-center">
          Oops! It looks like you are not logged in.
        </h1>
        <h2 className="my-2 text-center">Please log in to view the {page}</h2>
        <Link to={"/login"}>
          <Button
            text={"Go to login"}
            className={`${
              theme === "dark"
                ? "bg-mainColor text-black"
                : "bg-mainColorLight text-white"
            } p-2 rounded-xl font-bold mt-6`}
          />
        </Link>
      </div>
    </div>
  );
}

LoginPrompt.propTypes = {
  theme: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
