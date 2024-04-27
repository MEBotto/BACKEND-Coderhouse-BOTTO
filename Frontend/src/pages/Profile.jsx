import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import useTheme from "../hooks/useTheme.js";
import { fetchUser } from "../lib/data.js";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleImageClick = () => {
    // Aquí puedes abrir un selector de archivos y actualizar la foto del usuario
  };

  return (
    <div
      className={`w-screen h-screen ${
        theme === "dark" ? "text-white bg-color" : "text-black bg-colorLight"
      } flex items-end justify-center`}
    >
      <div className={`p-5 h-minusNavbar w-full`}>
        {userData ? (
          <>
            <h1 className={`text-4xl font-bold mb-5`}>Profile</h1>
            <div className="grid grid-cols-4">
              <div className="col-span-1 flex items-center justify-center">
                <img
                  src={userData.photo}
                  alt={`Avatar of ${userData.name}`}
                  className="rounded-full cursor-pointer h-80"
                  onClick={handleImageClick}
                />
              </div>
              <form className="col-span-3 flex flex-col gap-1">
                <input
                  type="text"
                  value={userData.first_name}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  value={userData.last_name}
                  disabled={!isEditing}
                />
                <input
                  type="text"
                  value={userData.email}
                  disabled={!isEditing}
                />
                <input type="text" value={userData.age} disabled={!isEditing} />
                <input
                  type="text"
                  value={userData.role}
                  disabled={!isEditing}
                />
              </form>
            </div>
            <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
          </>
        ) : (
          <p>No user data available. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
