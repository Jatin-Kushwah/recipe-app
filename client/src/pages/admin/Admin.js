import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../../Components/adminNav/AdminNav";

function Admin() {
    return (
        <div>
            <AdminNav />
            <Outlet />
        </div>
    );
}

export default Admin;
