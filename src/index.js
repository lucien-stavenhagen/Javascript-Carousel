const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const imgpath = path.join(__dirname, "..", "images");
console.log(imgpath);
const PORT = process.env.PORT || 2001;
const HOST = process.env.HOST || "http://localhost";
app.use(cors());
app.use(express.json());
if(!fs.existsSync(imgpath)){
  fs.mkdirSync(imgpath)
}
app.use("/images", express.static(imgpath));

app.use("/getimgs", (request, response, next) => {
  fs.readdir(imgpath, (err, files) => {
    files = files.filter(item => item.split(".")[1] === "jpg");
    files = files.map(item => {
      return { path: `${HOST}:${PORT}/images/${item}`, name: item };
    });
    response.json({ imglist: files });
  });
});

app.listen(PORT, () => console.log(`image server listening on port ${PORT}`));
