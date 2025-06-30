import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_HARDIK,
  api_key: process.env.CLOUDINARY_KEY_HARDIK,
  api_secret: process.env.CLOUDINARY_SECRET_HARDIK,
  secure: true,
});

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "hardik",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

const statusStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "hardik",
    resource_type: "auto",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4"],
  }),
});

const upload: multer.Multer = multer({
  storage: profileStorage,
});
const uploadDocument: multer.Multer = multer({ storage: statusStorage });
export { upload, uploadDocument };
