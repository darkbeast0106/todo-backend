import ToDoList from "../components/ToDoList";

function ToDo(props) {
    return ( <>
    <h1>Todo List</h1>
    <ToDoList {...props}/>
    </> );
}

export default ToDo;
