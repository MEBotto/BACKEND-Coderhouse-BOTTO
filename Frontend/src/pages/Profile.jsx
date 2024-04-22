import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import useTheme from "../hooks/useTheme.js";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const decodedToken = jwtDecode(token);
    setUserData(decodedToken.user);
    console.log(userData);
  }, [token, userData]);

  return (
    <div
      className={`w-screen h-screen p-5 pt-20 ${
        theme === "dark" ? "text-white bg-color" : "text-black bg-colorLight"
      }`}
    >
      <div className={`p-5`}>
        {userData ? (
          <>
            <h1 className={`text-4xl uppercase font-bold mb-5`}>
              {userData.name} - Profile
            </h1>
            <div className="grid grid-cols-4">
              <div className="col-span-1">
                <img
                  src={userData.photo}
                  alt={`Avatar of ${userData.name}`}
                  className="rounded-full"
                />
              </div>
              <div className="col-span-3">
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <p>Age: {userData.age}</p>
                <p>Role: {userData.role}</p>
              </div>
            </div>
          </>
        ) : (
          <p>No user data available. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
