import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "../pages/errors/NotFound";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ToDo from "../pages/ToDo";
import { useEffect, useState } from "react";
import NewToDo from "../pages/NewToDo";
import Unauthenticated from "../pages/errors/Unauthenticated";
import Logout from "../pages/Logout";

function App() {
    const [apiToken, setApiToken] = useState(null);

    const refreshToken = () => {
        setApiToken(localStorage.getItem("todoApiToken"));
    };
    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={
                                apiToken ? (
                                    <ToDo refreshApiToken={refreshToken} />
                                ) : (
                                    <Home />
                                )
                            }
                        />
                        <Route
                            path="/newtodo"
                            element={
                                apiToken ? (
                                    <NewToDo refreshApiToken={refreshToken} />
                                ) : (
                                    <Unauthenticated />
                                )
                            }
                        />
                        <Route
                            path="/register"
                            element={<Register onSuccess={refreshToken} />}
                        />
                        <Route
                            path="/login"
                            element={<Login onSuccess={refreshToken} />}
                        />
                        <Route
                            path="/logout"
                            element={<Logout />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
