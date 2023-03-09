function FormInput(props) {
    const { inputId, inputType = "text", inputLabel, value, setValue } = props;
    return (
      <div className="mb-3">
        <label className="form-label" htmlFor={inputId}>
          {inputLabel}
        </label>
        <input
          className="form-control"
          id={inputId}
          type={inputType}
          placeholder={inputLabel}
          value={value}
          onInput={(event) => setValue(event.target.value)}
          required
        />
      </div>
    );
  }

  export default FormInput;
