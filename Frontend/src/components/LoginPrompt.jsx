import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function LoginPrompt({ theme }) {
  return (
    <div className="container min-h-screen w-full md:w-4/5 flex flex-col items-center justify-center px-4 md:px-0">
      <p
        className={`text-center ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Please, log in to continue
      </p>
      <Link
        to="/login"
        className={`${
          theme === "dark" ? "text-mainColor" : "text-mainColorLight"
        } mt-4 underline`}
      >
        Go to login
      </Link>
    </div>
  );
}

LoginPrompt.propTypes = {
  theme: PropTypes.string.isRequired,
};