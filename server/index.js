const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const cookieParser = require("cookie-parser");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const { PORT } = process.env;

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

app.get("/", (req, res) => {
    res.status(200).send("Ok from server");
});

dbConnect();
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
