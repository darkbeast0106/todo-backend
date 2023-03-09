import NavItem from "./NavItem";

function Nav(props) {
    const { navItemsLeft = [], navItemsRight = [] } = props;
    const navListLeft = [];
    navItemsLeft.forEach((item) => {
        navListLeft.push(
            <NavItem
                key={item.href}
                href={item.href}
                displayText={item.displayText}
            />
        );
    });

    const navListRight = [];
    navItemsRight.forEach((item) => {
        navListRight.push(
            <NavItem
                key={item.href}
                href={item.href}
                displayText={item.displayText}
            />
        );
    });

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <a className="navbar-brand" href="/">
                    ToDo
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">{navListLeft}</ul>
                    <ul className="navbar-nav">{navListRight}</ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
