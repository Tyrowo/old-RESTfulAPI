var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LulzSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Lulz', LulzSchema);
