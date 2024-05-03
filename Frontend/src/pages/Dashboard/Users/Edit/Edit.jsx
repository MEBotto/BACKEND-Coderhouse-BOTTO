import { fetchUser } from "../../../../lib/data";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UpdateFormUser } from "../../../../components/Forms";
import PropTypes from "prop-types";

export default function Edit({ theme }) {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUser(id)
      .then(({ user }) => {
        setUserData(user);
      })
      .catch((error) => console.error("An error occurred:", error));
  }, [id]);

  return (
    <div className="w-full">
      <h1
        className={`text-2xl ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Edit User
      </h1>
      {userData ? (
        <UpdateFormUser t={theme} user={userData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

Edit.propTypes = {
  theme: PropTypes.string,
};