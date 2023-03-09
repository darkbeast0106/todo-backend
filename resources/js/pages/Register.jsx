import { useState } from "react";
import FormInput from "../components/FormInput";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [error, setError] = useState("");
    const { onSuccess } = props;
    const navigate = useNavigate();

    if (localStorage.getItem("todoApiToken")) {
        navigate("/");
    }

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirm_password("");
        setError("");
    };
    const registerUser = () => {
        const user = {
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
        };
        fetch(`/api/register`, {
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
                inputId="nameInput"
                inputLabel="Name"
                value={name}
                setValue={setName}
            />
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
            <FormInput
                inputId="confirm_passwordInput"
                inputType="password"
                inputLabel="Confirm Password"
                value={confirm_password}
                setValue={setConfirm_password}
            />
        </>
    );

    return (
        <Form
            formTitle="Register"
            formInputs={formInputs}
            buttonText="Register"
            onSubmit={registerUser}
            error={error}
            setError={setError}
        />
    );
}

export default Register;
