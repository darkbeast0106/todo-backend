import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
    const navItemsLeft = [{ href: "/", displayText: "Todos" }];
    const navItemsRight = [];
    if (localStorage.getItem("todoApiToken")) {
        navItemsLeft.push({href: "/newtodo", displayText: "New Todo"});
        navItemsRight.push({href: "/logout", displayText: "Logout"});
    } else {
        navItemsRight.push({href: "/register", displayText: "Register"});
        navItemsRight.push({href: "/login", displayText: "Login"});
    }


    return (
        <>
            <Nav navItemsLeft={navItemsLeft} navItemsRight={navItemsRight} />
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
