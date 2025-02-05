const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "Upload-" + file.originalname);
  },
});

exports.upload = multer({storage: storage}).array("files", 10); // อัปโหลดได้สูงสุด 10 ไฟล์
