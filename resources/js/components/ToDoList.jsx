import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import { useNavigate } from "react-router-dom";

function ToDoList(props) {
    const [toDos, setToDos] = useState([]);
    const navigate = useNavigate();
    const { refreshApiToken } = props;

    const feladatokListazasa = () => {
        fetch("/api/todo", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("todoApiToken")}`,
                Accept: "application/json",
            },
        }).then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                setToDos(data);
            } else if (response.status === 401) {
                localStorage.removeItem("todoApiToken");
                refreshApiToken();
                navigate("/");
            }
        });
    };

    useEffect(() => {
        feladatokListazasa();
    }, []);

    const toDoList = [];
    toDos.forEach((toDo) => {
        toDoList.push(
            <ToDoItem
                key={toDo.id}
                feladat={toDo}
                onUpdate={() => feladatokListazasa()}
            />
        );
    });

    return <ul>{toDoList}</ul>;
}

export default ToDoList;
