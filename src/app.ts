import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).end("Hello world ma guelle");
});

app.listen(process.env.PORT, () => {
    console.log("Listen to port " + process.env.PORT);
});
