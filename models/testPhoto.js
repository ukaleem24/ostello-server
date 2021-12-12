const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testPhoto = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  photo: [],
});

module.exports = mongoose.model('TestPhoto', testPhoto);
