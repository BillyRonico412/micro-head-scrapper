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

app.get("/?url=:url", async (req, res) => {
    const url = req.params.url as string;
    if (!(await yupUrl.isValid(url))) {
        return res.status(400).end();
    }
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
