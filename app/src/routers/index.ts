import { transformJson, uploadFile } from "../controllers";
import { upload } from "../middleware/multer";
import { Router } from "express";

const router = Router();

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/transform-json").post(transformJson);

export { router };
