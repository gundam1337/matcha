const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
