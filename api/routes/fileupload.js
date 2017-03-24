var express = require('express');
var multer = require('multer');
var router = express.Router();
var fs = require('fs');
var FileModel = require('../models/file');
var DIR = "./files/";


router.post('/create', function(req, res, next){
  var file = new FileModel({
    fullFileName: req.body.fullFileName,
    fileExtension: req.body.fileExtension,
    fileProject: req.body.fileProject,
    fileUser: req.body.fileUser,
    size: req.body.size,
    fileDate: req.body.fileDate
  })
  file.save(function(err, result){
    if(err){
      return res.status(404).json({
        title: 'An error occured',
        error: err
      })
    }
    res.status(200).json({
      message: 'success',
      obj: result
    })
  })
});

  router.get('/getfiles/:fileProject', function (req, res, next) {
    var fileProject= req.params.fileProject;

    FileModel.find({fileProject: fileProject},function (err,files) {
      if(err){
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message:'Success',
        obj: files
      })
    })

  });

router.get('/getfilesuser/:userName', function (req, res, next) {
  var userName= req.params.userName;

  FileModel.find({fileUser: userName},function (err,files) {
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(200).json({
      message:'Success',
      obj: files
    })
  })

});

  router.get('/download/:fullFileName/:fileProject', function (req, res, next) {
    var fileProject= req.params.fileProject;
    var fullFileName= req.params.fullFileName;
    var file= DIR+fileProject+ '/'+fullFileName;
    console.log(file);
    res.download(file);


  });



router.delete('/delete/:fullFileName/:fileUser/:fileDate/:fileProject', function (req, res, next) {
  var fullFileName=  req.params.fullFileName;
  var fileUser=  req.params.fileUser;
  var fileDate=  req.params.fileDate;
  var fileProject= req.params.fileProject;
  var fileDIR= DIR+fileProject+'/'+fullFileName;

  FileModel.find({fullFileName: fullFileName,fileUser:fileUser,fileDate:fileDate}, function (err,file) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    file[0].remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      fs.unlinkSync(fileDIR);
      res.status(200).json({
        message: 'Deleted file',
        obj: result
      });
    });
  })

});

module.exports = router;
