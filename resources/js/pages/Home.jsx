import { Link } from "react-router-dom";

function Home() {
    return ( <>
    <h1>ToDo app</h1>
    <p>Please <Link to="/login" >login</Link> or <Link to="/register" >register</Link> before using the application.</p>
    </> );
}

export default Home;
