const mongoose = require('mongoose');

const verificationTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    //type : String ,
    required: true,
    ref: 'User' // Assuming 'User' is your user model
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // This token document will automatically be removed after 1 hour
  }
});

const VerificationToken = mongoose.model('VerificationToken', verificationTokenSchema);

module.exports = VerificationToken;
