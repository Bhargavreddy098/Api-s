const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['main-admin', 'sub-admin', 'chef', 'user'] },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
});

module.exports = mongoose.model('userlogins', userSchema);