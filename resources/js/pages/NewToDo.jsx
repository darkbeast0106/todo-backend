import { useState } from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

function NewToDo(props) {
    const [todo, setTodo] = useState("");
    const [error, setError] = useState("");
    const { refreshApiToken } = props;
    const navigate = useNavigate();

    const addTodo = () => {
        fetch("/api/todo", {
            method: "POST",
            body: JSON.stringify({ title: todo }),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("todoApiToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(async (respone) => {
            if (respone.status === 201) {
                setTodo("");
            } else if(respone.status === 401) {
                localStorage.removeItem("todoApiToken");
                refreshApiToken();
                navigate("/");
            }
            else {
                const data = await respone.json();
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
                inputId="todoInput"
                inputLabel="Todo"
                value={todo}
                setValue={setTodo}
            />
        </>
    );

    return (
        <Form
            formTitle="New Todo"
            formInputs={formInputs}
            buttonText="Add"
            onSubmit={addTodo}
            error={error}
            setError={setError}
        />
    );
}

export default NewToDo;
