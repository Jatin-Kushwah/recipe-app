const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const morgan = require("morgan");

const app = express();

const { PORT } = process.env;

// Middlewares
app.use(express.json());
app.use(morgan("common"));

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.status(200).send("Ok from server");
});

dbConnect();
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
