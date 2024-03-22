import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const Profile = () => {
  const [userData, setUserData] = useState({
    photo: "https://avatars.githubusercontent.com/u/106409126?v=4",
    name: "Mariano Eloy Botto",
    email: "marianobotto92@gmail.com",
    role: "user",
  });
  const { token } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="mt-20 p-5">
      <h1 className="text-4xl uppercase font-bold mb-5">User Profile</h1>
      {userData ? (
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
      ) : (
        <p>No user data available. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
