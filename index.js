const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 5001;

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./image");
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
   },
});

const upload = multer({
   storage,
});

app.use(express.static("image"));
app.use(cors(false));

app.get("/", (req, res) => {
   res.send("Hello World!");
});
app.post("/upload", upload.single("photo"), (req, res) => {
   const hostName = req.protocol + "://" + req.headers.host;
   const tempPath = req.file.filename;
   console.log(` req.file`, req.file)
   res.json({ url: hostName + "/" + tempPath });
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`);
});
