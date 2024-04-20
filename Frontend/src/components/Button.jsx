import PropTypes from "prop-types";

export default function Button ({
  text,
  bg,
  className,
  iSize,
  iClass,
  onClickFunction,
  iconName,
  type,
  isDisabled,
}) {
  return (
    <>
      <button
        disabled={isDisabled}
        type={type ? type : undefined}
        onClick={onClickFunction}
        className={`my-1 ${className}`}
        style={{ background: bg }}
      >
        <span className="bg-transparent">
          {iconName && (
            <i
              className={`${iconName} bg-transparent ${
                iSize ? iSize : "text-xl"
              } ${iClass} mr-2`}
            ></i>
          )}
          {text}
        </span>
      </button>
    </>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  bg: PropTypes.string,
  className: PropTypes.string,
  iSize: PropTypes.string,
  iClass: PropTypes.string,
  onClickFunction: PropTypes.func,
  iconName: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};