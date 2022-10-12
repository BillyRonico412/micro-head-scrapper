import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { extractMetadata } from "link-meta-extractor";
import morgan from "morgan";
import { yupUrl } from "./utils";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    const query = req.query;
    if (!(await yupUrl.isValid(query))) {
        return res.status(400).end();
    }
    try {
        const url = query.url as string;
        const metaData = await extractMetadata(url);
        return res.status(200).json(metaData);
    } catch (err) {
        return res.status(404).end();
    }
});

app.listen(process.env.PORT, () => {
    console.log("Listen to port " + process.env.PORT);
});
