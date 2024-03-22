import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useAuth();

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age}</p>
          <p>Role: {userData.role}</p>
        </div>
      ) : (
        <p>No user data available. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
