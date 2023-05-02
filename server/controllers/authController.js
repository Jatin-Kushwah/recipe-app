const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../Utils/responseWrap");

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send(error(400, "Username and Password are required."));
        }

        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.send(error(409, "User already exists."));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        return res.send(success(201, "User registered successfully."));
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.send(error(400, "Username and Password are required."));
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.send(error(409, "User does not exist."));
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.send(error(403, "Username or Password is incorrect"));
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });
        const refreshToken = generateRefreshToken({
            _id: user._id,
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
        });

        return res.send(success(200, { accessToken }));
    } catch (err) {
        console.log(err);
        return res.send(error(500, err.message));
    }
};

const refreshAccessToken = async (req, res) => {
    const cookies = req.cookies.jwt;

    if (!cookies) {
        return res.send(error(401, "Refresh token in cookie is required"));
    }

    const refreshToken = cookies;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

        const _id = decoded._id;
        const accessToken = generateAccessToken({ _id });

        return res.status(201).json({ accessToken });
    } catch (err) {
        console.log(err);
        return res.send(error(401, "Invalid refresh token"));
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
        });
        return res.send(success(200, "user logged out"));
    } catch (e) {
        console.log(e);
        return res.send(error(500, e.message));
    }
};

//internal functions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "30d",
        });
        return token;
    } catch (err) {
        console.log(error);
    }
};

const generateRefreshToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: "1y",
        });
        return token;
    } catch (err) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
    refreshAccessToken,
    logout,
};
