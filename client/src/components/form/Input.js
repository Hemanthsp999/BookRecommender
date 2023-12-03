import { forwardRef } from "react";
const Input = forwardRef((props,ref) => {
  return (
    <div className="mb-3">
      <input
        title={props.title}
        type={props.type}
        className={props.className}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
        required
      />
      <label htmlFor={props.id}>{props.title}</label>

      <div className={props.errorDiv}>{props.errorMsg}</div>
    </div>
  );
});

export default Input;
