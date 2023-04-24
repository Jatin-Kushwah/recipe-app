const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Username and Password are required.");
        }

        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.status(409).send("User already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        res.status(201).json("User registered successfully.");
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Username and Password are required.");
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(409).send("User does not exist.");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(403).send("Username or Password is incorrect");
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

        return res.json({ accessToken });
    } catch (error) {
        console.log(error);
    }
};

const refreshAccessToken = async (req, res) => {
    const cookies = req.cookies.jwt;

    if (!cookies) {
        return res.status(401).send("Refresh token in cookie is required");
    }

    const refreshToken = cookies;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

        const _id = decoded._id;
        const accessToken = generateAccessToken({ _id });

        return res.status(201).json({ accessToken });
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid refresh token");
    }
};

const logoutController = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
        });
        return res.send(success(200, "user logged out"));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

//internal functions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "1d",
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
};
