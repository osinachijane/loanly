import "./Button.css";

const Button = (props) => {
  const { label, type, size, disabled = false } = props;

  let BTN_SIZE = "btn-lg";

  let BTN_DISABLED = "btn-disabled";

  if (size === "md") {
    BTN_SIZE = "btn-md";
  } else if (size === "sm") {
    BTN_SIZE = "btn-sm";
  }

  return (
    <button
      disabled={disabled}
      type={type || "button"}
      className={`${!disabled ? `button` : BTN_DISABLED} ${BTN_SIZE}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
