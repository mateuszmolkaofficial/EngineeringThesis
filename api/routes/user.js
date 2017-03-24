

var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var rmdir = require('rmdir');
var DIR = "./images/";

    router.post('/create', function(req, res, next){
        console.log(req.body);
        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userName: req.body.userName,
            password: passwordHash.generate(req.body.password),
            type: req.body.type,
            imagename: req.body.imagename,
            imageext: req.body.imageext
        });
        user.save(function(err, result){
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

    router.post('/signin', function(req, res, next){
        console.log(req.body);
        User.findOne({email: req.body.email}, function(err, user){
            if(err){
                return res.status(404).json({
                    title: 'An error occured',
                    error: err
                });
            }
            if(!user){
                return res.status(404).json({
                    title: 'no user',
                    error: {message: 'no user'}
                });
            }
            if(!passwordHash.verify(req.body.password, user.password)){
                return res.status(404).json({
                    title: 'invalid pass',
                    error: {message: 'invalid pass'}
                })
            }
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            var decoded= jwt.decode(req.query.token);
            res.status(200).json({
                message: 'success',
                token: token,
                userId: user._id
            })

        })
    });

router.get('/currentuser', function (req,res,next) {
  var decoded= jwt.decode(req.query.token);
  User.findById(decoded.user._id, function (err,user) {
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(200).json({
      message:'Success',
      obj: user
    })
  })
});

router.get('/getusers', function (req, res, next) {
  User.find()
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

router.get('/getuser/:userName', function (req,res,next) {
  var userName=  req.params.userName;
  User.find({userName: userName}, function (err,user) {
    if(err){
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if(user.length<1){
      return res.status(404).json({
        title: 'Not found',
        error: {
          type: 'not found',
          message: 'usser not found'
        }
      });
    }
    console.log(user);
    res.status(200).json({
      message:'Success',
      obj: user
    })
  })
});

router.delete('/delete/:userName', function (req, res, next) {
  var userName=  req.params.userName;
  var finalDir= DIR+userName;

  User.find({userName: userName}, function (err,user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    user[0].remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      rmdir(finalDir, function (err, dirs, files) {
        console.log(finalDir);
      });
      res.status(200).json({
        message: 'Deleted user',
        obj: result
      });
    });
  })
});
/*
fs.unlink('/images/'+userName, function(err,user){
  if (err) {
    return res.status(500).json({
      title: 'An error occurred',
      error: err
    });
  }
});
*/






module.exports = router;
