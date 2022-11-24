import fs from "fs/promises";
import path from "path";
import { transformObject } from "./lib/parser";

async function run(): Promise<void> {
    const map = (
        await fs.readFile(
            path.resolve(__dirname, "./data/sample_1/mapping.csv")
        )
    ).toString();
    const src = JSON.parse(
        (
            await fs.readFile(
                path.resolve(__dirname, "./data/sample_1/source.json")
            )
        ).toString()
    );
    const convertedObject = transformObject(src, map);
    console.log(convertedObject);
}

run();
