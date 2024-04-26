import PropTypes from "prop-types";

export function ChatInput({ theme, handleSubmit, message, setMessage }) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`w-full flex items-center gap-4 p-4 ${
        theme === "dark" ? "bg-zinc-900" : "bg-zinc-300"
      }`}
    >
      <input
        type="text"
        placeholder="Write your message..."
        value={message}
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
  );
}

ChatInput.propTypes = {
  theme: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};