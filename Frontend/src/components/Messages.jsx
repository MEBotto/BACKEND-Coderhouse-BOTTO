import { formatDateAndTime, formatUserName, getUserColor } from "../lib/utils";
import PropTypes from "prop-types";

export function Messages({
  theme,
  messages,
  uid,
  userColors,
  setUserColors,
  messagesEndRef,
}) {
  return (
    <div className="w-full h-minusNavbar flex flex-col items-center justify-end">
      <div
        className="w-full h-full flex flex-col overflow-y-auto gap-1 p-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.5) transparent",
        }}
      >
        {messages.map((msg, index) => {
          const { message, user, timestamp } = msg;
          const { timeString } = formatDateAndTime(timestamp);
          const name = formatUserName(user, uid);
          const color = getUserColor(name, theme, userColors, setUserColors);

          return (
            <Message
              key={index}
              theme={theme}
              name={name}
              color={color}
              message={message}
              timeString={timeString}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export function Message({ theme, name, color, message, timeString }) {
  return (
    <div
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
}

Messages.propTypes = {
  theme: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  uid: PropTypes.string.isRequired,
  userColors: PropTypes.object.isRequired,
  setUserColors: PropTypes.func.isRequired,
  messagesEndRef: PropTypes.object.isRequired,
};

Message.propTypes = {
  theme: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timeString: PropTypes.string.isRequired,
};
