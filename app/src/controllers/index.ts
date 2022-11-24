import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.file);
    res.json(req.file);
});

export const transformJson = asyncHandler(
    async (req: Request, res: Response) => {
        console.log("HERRRREEEEEEEEEEEEEEEEEEEEEEE");
    }
);
