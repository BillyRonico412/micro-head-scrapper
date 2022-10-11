import bodyParser from "body-parser";
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
    const body = req.body as { url: string };
    if (!(await yupUrl.isValid(body))) {
        return res.status(400).end();
    }
    const url = req.body.url as string;
    try {
        const metaData = await extractMetadata(url);
        return res.status(200).json(metaData);
    } catch (err) {
        return res.status(404).end();
    }
});

app.listen(process.env.PORT, () => {
    console.log("Listen to port " + process.env.PORT);
});
