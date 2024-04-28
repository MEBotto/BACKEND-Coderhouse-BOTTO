import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import useTheme from "../hooks/useTheme.js";
import { fetchUser } from "../lib/data.js";
import { FormUser } from "../components/Forms.jsx";
import { LoginPrompt } from "../components/LoginPrompt.jsx";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { uid } = useAuth();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        try {
          const { user } = await fetchUser(uid);
          setUserData(user);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [uid]);

  return (
    <div
      className={`w-screen h-screen ${
        theme === "dark" ? "text-white bg-color" : "text-black bg-colorLight"
      } flex items-end justify-center`}
    >
      <div >
        {userData ? (
          <div className={`p-5 h-minusNavbar w-full`}>
            <h1 className={`text-4xl font-bold mb-5`}>Profile</h1>
            <FormUser t={theme} user={userData} />
          </div>
        ) : (
          <LoginPrompt theme={theme} page="profile" />
        )}
      </div>
    </div>
  );
};

export default Profile;
