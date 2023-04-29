const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const cookieParser = require("cookie-parser");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const recipeRouter = require("./routers/recipeRouter");
const morgan = require("morgan");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const {
    PORT,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECTRET_KEY,
} = process.env;

// Configuration
cloudinary.config({
    cloud_name: `${CLOUDINARY_CLOUD_NAME}`,
    api_key: `${CLOUDINARY_API_KEY}`,
    api_secret: `${CLOUDINARY_SECTRET_KEY}`,
});

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

let origin = "http://localhost:3000";

app.use(
    cors({
        credentials: true,
        origin,
    })
);

app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);

app.get("/", (req, res) => {
    res.status(200).send("Ok from server");
});

dbConnect();
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
