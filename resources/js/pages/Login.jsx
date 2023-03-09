import { useState } from "react";
import Form from "../components/Form";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onSuccess } = props;
    const navigate = useNavigate();

    if (localStorage.getItem("todoApiToken")) {
        navigate("/");
    }
    const resetForm = () => {
        setEmail("");
        setPassword("");
        setError("");
    };
    const login = () => {
        const user = {
            email: email,
            password: password,
        };
        fetch(`/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(user),
        }).then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                resetForm();
                localStorage.setItem("todoApiToken", data.token);
                onSuccess();
                navigate("/");
            } else {
                if (data.message) {
                    setError(data.message);
                } else {
                    setError("Unknown error occured");
                }
            }
        });
    };
    const formInputs = (
        <>
            <FormInput
                inputId="emailInput"
                inputType="email"
                inputLabel="Email"
                value={email}
                setValue={setEmail}
            />
            <FormInput
                inputId="passwordInput"
                inputType="password"
                inputLabel="Password"
                value={password}
                setValue={setPassword}
            />
        </>
    );

    return (
        <Form
            formTitle="Login"
            formInputs={formInputs}
            buttonText="Login"
            onSubmit={login}
            error={error}
            setError={setError}
        />
    );
}

export default Login;
