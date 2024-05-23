const User = require("../../models/user");
const Message = require("../../models/Messages");
const Conversation = require("../../models/Conversations");

const chatHistory = async (req, res, next) => {
  try {
    console.log("formattedConversations");

    res.send("I got the message");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = chatHistory;
