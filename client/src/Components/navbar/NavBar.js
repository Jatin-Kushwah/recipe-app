import React, { useState } from "react";
import "./NavBar.scss";
import { GiCook } from "react-icons/gi";

const NavBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <GiCook />
                <h1>Dish Dash</h1>
            </div>
            <form className="navbar-search" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    );
};

export default NavBar;
