var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  fullFileName: {type: String, required: true},
  fileExtension: {type: String, required: true},
  fileProject: {type: String, required: true},
  fileUser: {type: String, required: true},
  size: {type: Number, required: true},
  fileDate: {type: String, required: true}

});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('FileModel', schema);
