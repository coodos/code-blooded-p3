import express from "express";
import cors from "cors";
import { router } from "./routers";
import fs from "fs/promises";
import { transformObject } from "./utils";

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.use("/api", router);

app.listen(3000, () => {
    console.log("server listening on port 3000");
});

async function run() {
    const map = (
        await fs.readFile(
            "/Users/merul/Desktop/Projects/code-blooded-p3/app/src/data/sample_3/mapping.csv"
        )
    ).toString();
    const src = JSON.parse(
        (
            await fs.readFile(
                "/Users/merul/Desktop/Projects/code-blooded-p3/app/src/data/sample_3/source.json"
            )
        ).toString()
    );
    console.log(src, map);
    console.log(transformObject(src, map));
}

run();
