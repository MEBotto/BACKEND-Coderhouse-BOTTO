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
    setMessages([...messages, { message, user: name, timestamp: new Date().toLocaleString()}]);
    socket.emit("message", { message, user: name, timestamp: new Date().toLocaleString()});
  };

  useEffect(() => {
    if (token) {
      socket.connect();
      socket.on("message", receiveMessage);
      fetchMessages(token)
      .then(({ data }) => setMessages(data))
      .catch(error => {
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
    <>
      {token ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Write your message..."
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>Send</button>
          </form>

          <ul>
            {messages?.map((msg, index) => (
              <li key={index}>{msg.timestamp.toLocaleString()} - {msg.user}: {msg.message}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="h-screen w-screen flex items-center justify-center">
          VOLVE A INICAR SESION
        </div>
      )}
    </>
  );
};

export default Chat;
