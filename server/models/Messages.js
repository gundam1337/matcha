const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
