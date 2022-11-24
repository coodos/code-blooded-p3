import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import asyncHandler from "express-async-handler";
import { transformObject } from "../utils";

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    res.json({ filename: req.file.filename });
});

export const transformJson = asyncHandler(
    async (req: Request, res: Response) => {
        const map = (
            await fs.readFile(
                path.resolve(__dirname, "../uploads", req.body.map)
            )
        ).toString();
        const src = JSON.parse(
            (
                await fs.readFile(
                    path.resolve(__dirname, "../uploads", req.body.src)
                )
            ).toString()
        );
        console.log(src, map);
        res.json(transformObject(src, map));
    }
);
