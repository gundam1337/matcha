const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  recipient: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: false
  },
  relatedUser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

// Indexes
notificationSchema.index({ recipient: 1});
notificationSchema.index({ date: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
