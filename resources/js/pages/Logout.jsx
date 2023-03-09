import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("todoApiToken");
        navigate("/");
    }, []);

    return ( <h1>Logging out...</h1> );
}

export default Logout;
