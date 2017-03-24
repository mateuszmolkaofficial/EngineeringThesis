var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var schema = new Schema({
    projectName: {type: String, required: true},
    projectType: {type: String, required: true}
  });

module.exports = mongoose.model('Project', schema);
