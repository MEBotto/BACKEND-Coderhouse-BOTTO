import { useState, useEffect } from "react";
import { fetchMessages } from "../lib/data.js";
import useAuth from "../hooks/useAuth.js";
import useTheme from "../hooks/useTheme.js";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { showToast } from "../lib/utils.js";

const socket = io("http://localhost:8080");

const Chat = () => {
  const { token, name } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([
      ...messages,
      { message, user: name, timestamp: new Date().toLocaleString() },
    ]);
    socket.emit("message", {
      message,
      user: name,
      timestamp: new Date().toLocaleString(),
    });
  };

  useEffect(() => {
    if (token) {
      socket.connect();
      socket.on("message", receiveMessage);
      fetchMessages(token)
        .then(({ data }) => setMessages(data))
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
  }, [token]);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-color" : "bg-colorLight"
      } w-full h-full flex justify-center pt-28 pb-12`}
    >
      {token ? (
        <div className="container min-h-screen w-4/5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <input
              type="text"
              placeholder="Write your message..."
              onChange={(e) => setMessage(e.target.value)}
              className={`${
                theme === "dark"
                  ? "text-white bg-gray-800"
                  : "text-black bg-white"
              } p-2 rounded`}
            />
            <button
              className={`${
                theme === "dark"
                  ? "text-white bg-gray-800"
                  : "text-black bg-white"
              } p-2 rounded`}
            >
              Send
            </button>
          </form>

          <ul className="mt-8">
            {messages?.map((msg, index) => (
              <li
                key={index}
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {msg.timestamp.toLocaleString()} - {msg.user}: {msg.message}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="container min-h-screen w-4/5 flex items-center justify-center">
          <p className={`${theme === "dark" ? "text-white" : "text-black"}`}>
            VOLVE A INICAR SESION
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
