const path = require("path");
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { cloudinary } = require("../controllers/cloudinary");

const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    //adding the destination of the uploaded image
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  //checking file type if it's an image or not
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  //routes to upload the image
  try {
    console.log(req.file);
    // var myImg = fs.readFileSync();
    const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "ja7hcpyw",
    });
    fs.unlink(req.file.path, () => console.log("File removed"));

    const splitted = uploadedResponse.url.split("upload");
    const myUrl = splitted[0] + "upload/q_60" + splitted[1];
    res.send(`${myUrl}`);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});
module.exports = router;
