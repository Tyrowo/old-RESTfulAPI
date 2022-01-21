const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LulzSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Lulz', LulzSchema);
