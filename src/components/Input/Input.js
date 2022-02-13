import "./Input.css";

const Input = (props) => {
  return (
    <div className="form-group">
      <label>{props.label}:</label>
      <input className="input" {...props} />
    </div>
  );
};

export default Input;
