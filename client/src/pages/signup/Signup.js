import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.scss";
import { axiosClient } from "../../Utils/axiosClient";

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosClient.post("/auth/signup", {
                username,
                password,
            });
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="signup">
            <div className="signup-box">
                <h2 className="heading">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="username"
                        id="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" className="submit" value="Sign up" />
                </form>

                <div className="lines-text">
                    <span>OR</span>
                </div>

                <p className="bottom-heading">
                    Already have an account?
                    <span>
                        <Link to="/login">Log In</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
