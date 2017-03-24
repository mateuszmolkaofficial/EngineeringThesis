
var express = require('express');
var router = express.Router();
var Project = require('../models/project');
var rmdir = require('rmdir');
var DIR = "./files/";

router.post('/create', function(req, res, next){
  var project = new Project({
    projectName: req.body.projectName,
    projectType: req.body.projectType
  });

  project.save(function(err, result){
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

router.get('/getprojects', function (req, res, next) {
  Project.find()
    .exec(function (err, users) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: users
      });
    });
});

router.delete('/delete/:projectName', function (req, res, next) {
  var projectName=  req.params.projectName;
  var projectDir= DIR+projectName;
  Project.find({projectName: projectName}, function (err,project) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    project[0].remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      rmdir(projectDir, function (err, dirs, files) {
        console.log(projectDir);
      });
      res.status(200).json({
        message: 'Deleted project',
        obj: result
      });
    });
  })

});

module.exports = router;

