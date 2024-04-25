import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import io from "socket.io-client";
import { fetchMessages } from "../lib/data.js";

const socket = io("http://localhost:8080");

const Chat = () => {
  const { token, name } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.connect();
  }, []);
  
  useEffect(() => {
    socket.on("messageCreatedServer", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  
    return () => {
      socket.off("messageCreatedServer");
    };
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchMessages(token);
        setMessages((prevMessages) => [...prevMessages, ...data]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
  
    fetchData();
  }, [token]);

  const sendMessage = () => {
    const message = { user: name, message: newMessage };
    socket.emit("newMessageClient", message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };

  return (
    <>
      {token ? (
        <div>
          <div>
            {messages.map(
              (message, index) =>
                message && (
                  <div key={index}>
                    <strong>{message.user}:</strong> {message.message}
                  </div>
                )
            )}
          </div>
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </div>
      ) : (
        <div>VOLVE A INICAR SESION</div>
      )}
    </>
  );
};

export default Chat;
