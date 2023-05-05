import React from "react";
import "./AdminNav.scss";
import { FaWalking } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
import { axiosClient } from "../../Utils/axiosClient";
import { GiCook } from "react-icons/gi";
import { IoCreateSharp } from "react-icons/io5";

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
            <div className="logo">
                <span onClick={() => navigate("/")}>
                    <GiCook />
                </span>
                <h2 className="heading" onClick={() => navigate("/admin")}>
                    Recipes
                </h2>
            </div>
            <div className="navbar-buttons">
                <button
                    className="btn-create"
                    onClick={() => navigate("/admin/create")}
                >
                    <span>Create</span> <IoCreateSharp />
                </button>
                <button onClick={() => handleLogout()} className="btn-logout">
                    <FaWalking />
                </button>
            </div>
        </nav>
    );
}

export default AdminNav;
