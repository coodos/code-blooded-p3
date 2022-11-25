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
