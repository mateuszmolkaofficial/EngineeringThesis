var express = require('express');
var multer = require('multer');
var DIRusers = "./images/";
var router = express.Router();
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var FINAL_DIR = DIRusers + req.query.userName;
    fs.mkdir(FINAL_DIR, function(){
      console.log(FINAL_DIR);
      }
    );
    cb(null, FINAL_DIR); // Absolute path. Folder must exist, will not be created for you.
  },
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
});
var upload = multer({ storage: storage });

router.post('/',upload.single('file'), function (req, res) {
  res.end('uploaded file');
});

module.exports = router;
