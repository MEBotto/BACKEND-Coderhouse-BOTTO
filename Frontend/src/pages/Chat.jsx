import { useState, useEffect, useRef } from "react";
import { fetchMessages } from "../lib/data.js";
import useAuth from "../hooks/useAuth.js";
import useTheme from "../hooks/useTheme.js";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { showToast } from "../lib/utils.js";
import { Messages } from "../components/Messages.jsx";
import { ChatInput } from "../components/ChatInput.jsx";
import { LoginPrompt } from "../components/LoginPrompt.jsx";

const socket = io("http://localhost:8080");

const Chat = () => {
  const { token, uid } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userColors, setUserColors] = useState({});

const handleSubmit = (message) => {
  if (message.trim() !== '') {
    setMessages([...messages, { message, user: uid, timestamp: new Date() }]);
    socket.emit("message", {
      message,
      user: uid,
      timestamp: new Date(),
    });
  }
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          <Messages
            theme={theme}
            messages={messages}
            uid={uid}
            userColors={userColors}
            setUserColors={setUserColors}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput
            theme={theme}
            handleSubmit={handleSubmit}
            message={message}
            setMessage={setMessage}
          />
        </div>
      ) : (
        <LoginPrompt theme={theme} />
      )}
    </div>
  );
};

export default Chat;
