

      var mongoose = require('mongoose');
      var Schema = mongoose.Schema;
      var mongooseUniqueValidator = require('mongoose-unique-validator');
      var fs = require('fs');

      var schema = new Schema({
          userName: {type: String, required: true,unique: true},
          password: {type: String, required: true},
          firstName: {type: String, required: true},
          lastName: {type: String, required: true},
          email: {type: String, required: true, unique: true},
          type: {type: String, required: true},
          imagename: {type: String},
          imageext: {type: String},

      });

      schema.plugin(mongooseUniqueValidator);

      module.exports = mongoose.model('User', schema);




