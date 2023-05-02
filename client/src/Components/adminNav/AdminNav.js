import React from "react";
import "./AdminNav.scss";
import { FaWalking } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { axiosClient } from "../../Utils/axiosClient";

function AdminNav() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosClient.post("/auth/logout");
            removeItem(KEY_ACCESS_TOKEN);
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    };

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
                <button onClick={() => handleLogout()} className="btn-logout">
                    <FaWalking />
                </button>
            </div>
        </nav>
    );
}

export default AdminNav;
