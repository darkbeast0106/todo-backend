function ToDoItem(props) {
    const { feladat, onUpdate } = props;
    const { id, title, done } = feladat;

    const feladatAllapotModositas = (ujAllapot) => {
        fetch(`/api/todo/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ done: ujAllapot }),
            headers: {
                Authorization: `Bearer ${localStorage.getItem("todoApiToken")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }).then(async (respone) => {
            if (respone.status === 200) {
                onUpdate();
            } else {
                const data = await respone.json();
                alert(data.message);
            }
        });
    };
    let className = "ToDoItem";
    if (done) {
        className += " done";
    }

    return (
        <li className={className}>
            <input
                type="checkbox"
                name={title}
                id={"checkbox_" + title}
                checked={done}
                onChange={(event) =>
                    feladatAllapotModositas(event.target.checked)
                }
            />
            <label htmlFor={"checkbox_" + title}>{title}</label>
        </li>
    );
}

export default ToDoItem;
