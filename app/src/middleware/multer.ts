import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/"));
    },
    filename(req, file, cb) {
        cb(
            null,
            `${Date.now()}${file.originalname.split(".")[0]}${path.extname(
                file.originalname
            )}`
        );
    },
});

function ensureIsSupported(file: any, cb: any) {
    const fileTypes = /csv|json/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
        return cb(null, true);
    } else {
        cb("file not supported");
    }
}

export const upload: any = multer({
    storage,
    fileFilter: function (req, file, cb) {
        ensureIsSupported(file, cb);
    },
    limits: { fileSize: 3 * 1024 * 1024, fieldSize: 3 * 1024 * 1024 },
});
