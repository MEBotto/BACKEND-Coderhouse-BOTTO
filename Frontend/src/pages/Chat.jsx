import { useState, useEffect } from "react";
import { fetchMessages } from "../lib/data.js";
import useAuth from "../hooks/useAuth.js";
import useTheme from "../hooks/useTheme.js";
import { useNavigate, Link } from "react-router-dom";
import io from "socket.io-client";
import { showToast } from "../lib/utils.js";

const socket = io("http://localhost:8080");

function getRandomColor(theme) {
  let color;
  do {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += Math.floor(Math.random() * 16).toString(16);
    }
  } while (isColorTooDarkOrLight(color, theme));
  return color;
}

function isColorTooDarkOrLight(color, theme) {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (theme === "dark") {
    return brightness < 128;
  } else {
    return brightness > 200;
  }
}

const Chat = () => {
  const { token, uid } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userColors, setUserColors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { message, user: uid, timestamp: new Date() }]);
    socket.emit("message", {
      message,
      user: uid,
      timestamp: new Date(),
    });
  };

  useEffect(() => {
    if (token) {
      socket.connect();
      socket.on("message", receiveMessage);
      fetchMessages(token)
        .then(({ data }) => {
          setMessages(data);
        })
        .catch((error) => {
          showToast("error", `${error}`, theme);
          navigate("/");
        });
    } else {
      socket.off("message", receiveMessage);
      socket.disconnect();
    }

    return () => {
      socket.off("message", receiveMessage);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } w-full h-screen flex justify-center items-end`}
    >
      {token ? (
        <div className="w-full h-minusNavbar flex flex-col items-center justify-end">
          <div className="w-full h-full flex flex-col overflow-y-auto gap-1 p-4">
            {messages.map((msg, index) => {
              const { message, user, timestamp } = msg;
              const date = new Date(timestamp);
              // const dateString = date.toLocaleDateString("es-AR", {
              //   day: "2-digit",
              //   month: "2-digit",
              //   year: "numeric",
              // });
              const timeString = date.toLocaleTimeString("es-AR", {
                hour: "2-digit",
                minute: "2-digit",
              });
              let name;
              if (user && user._id) {
                if (user._id === uid) {
                  name = "You";
                } else {
                  name = `${user.first_name} ${user.last_name}`;
                  name = name.split(" ")[0];
                  name =
                    name.toLowerCase().charAt(0).toUpperCase() +
                    name.slice(1).toLowerCase();
                }
              } else {
                name = "You";
              }
              let color = userColors[name];
              if (!color) {
                do {
                  color = getRandomColor(theme);
                } while (color === "#000000" || color === "#FFFFFF");
                setUserColors({ ...userColors, [name]: color });
              }

              return (
                <div
                  key={index}
                  className={`w-full flex ${
                    name === "You" ? "justify-end" : "justify-start"
                  } items-start px-4 gap-1`}
                >
                  <div
                    className={`${
                      name === "You"
                        ? `${
                            theme === "dark"
                              ? "bg-mainColor text-black"
                              : "bg-mainColorLight text-white"
                          }`
                        : `${
                            theme === "dark"
                              ? "bg-zinc-900 text-white"
                              : "bg-zinc-300 text-black"
                          }`
                    } rounded-xl p-2 max-w-[75%] flex flex-col`}
                  >
                    <p
                      className="text-sm"
                      style={{ color: `${name === "You" ? "" : color}` }}
                    >
                      {name === "You" ? "" : name}
                    </p>
                    <p className="break-words">{message}</p>
                    <p className="text-xs self-end">{timeString}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <form
            onSubmit={handleSubmit}
            className={`w-full flex items-center gap-4 p-4 ${
              theme === "dark" ? "bg-zinc-900" : "bg-zinc-300"
            }`}
          >
            <input
              type="text"
              placeholder="Write your message..."
              onChange={(e) => setMessage(e.target.value)}
              className={`${
                theme === "dark"
                  ? "text-white bg-color"
                  : "text-black bg-colorLight"
              } p-2 rounded-lg w-full focus:outline-none placeholder-gray-500`}
            />
            <button
              className={`${
                theme === "dark"
                  ? "text-black bg-mainColor"
                  : "text-white bg-mainColorLight"
              } p-2 rounded-lg focus:outline-none`}
            >
              Send
            </button>
          </form>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Chat;
