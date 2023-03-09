function Form(props) {
    const { formTitle, formInputs, buttonText, onSubmit, error, setError } = props;
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <h1>{formTitle}</h1>{error !== "" ? (
                <div
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                >
                    {error}
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        onClick={() => setError("")}
                    ></button>
                </div>
            ) : (
                ""
            )}

            {formInputs}
            <button className="btn btn-primary" type="submit">
                {buttonText}
            </button>
        </form>
    );
}

export default Form;
