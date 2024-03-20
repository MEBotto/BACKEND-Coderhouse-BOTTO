import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const Chat = () => {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:8080'); // Reemplaza 'PORT' con el puerto donde está corriendo tu servidor

  useEffect(() => {
    // Conexión al socket cuando el componente se monta
    socket.connect();

    // Escucha los mensajes del servidor
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Maneja la limpieza cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    // Obtener todos los mensajes al cargar la página
    fetch('http://localhost:8080/api/extend/messages', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token si es necesario
        },
    })
    .then(response => response.json())
    .then(data => setMessages(data.data))
    .catch(error => console.error('Error fetching messages:', error));
}, []);

  const sendMessage = () => {
    // Envía el mensaje al servidor y emite el evento 'chat message'
    socket.emit('chat message', { user: user.name, message: newMessage });

    // Limpiar el input después de enviar el mensaje
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.user}:</strong> {message.message}
          </div>
        ))}
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
  );
};

export default Chat;