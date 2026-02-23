import multer from "multer";

// multer configure using memorystorage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// // configure disk storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "./public/temp"),
//   filename: (req, file, cb) => cb(null, file.originalname),
// });

// const upload =   multer({ storage });
