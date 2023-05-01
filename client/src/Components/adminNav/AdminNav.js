import React from "react";
import "./AdminNav.scss";
import { FaWalking } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminNav() {
    const navigate = useNavigate();

    return (
        <nav className="AdminNav">
            <h2 className="heading" onClick={() => navigate("/admin")}>
                Recipes
            </h2>
            <div className="navbar-buttons">
                <button
                    className="btn-create"
                    onClick={() => navigate("/admin/create")}
                >
                    Create
                </button>
                <button className="btn-logout">
                    <FaWalking />
                </button>
            </div>
        </nav>
    );
}

export default AdminNav;
