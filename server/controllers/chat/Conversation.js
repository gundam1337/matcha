const User = require("../../models/user");
const Message = require("../../models/Messages");
const Conversation = require("../../models/Conversations");

// Find the user by their username.
//Retrieve all conversations that include the user as a participant.
//Retrieve the necessary information about each user in the converation
// For each conversation, fetch the last 10 messages

//
const conversationHistory = async (req, res, next) => {
  try {
    const { username } = req.user;
    // Step 1: Find the user by username
    const user = await User.findOne({ username }).select("_id");
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Step 2: Find all conversations that the user is a participant in
    const conversations = await Conversation.find({ participants: user._id })
      .populate("participants", "username profile")
      .populate({
        path: "lastMessage",
        select: "text timestamp",
        populate: {
          path: "sender",
          select: "username profile",
        },
      })
      .exec();

    const formattedConversations = conversations.map((conversation) => {
      const participants = conversation.participants
        .filter((participant) => !participant._id.equals(user._id))
        .map((participant) => ({
          userID: participant._id,
          username: participant.username,
          profile: participant.profile,
        }));

      return {
        participants,
        lastMessage: {
          text: conversation.lastMessage?.text || "",
          timestamp: conversation.lastMessage?.timestamp || "",
          sender: {
            username: conversation.lastMessage?.sender?.username || "",
            profile: conversation.lastMessage?.sender?.profile || {},
          },
        },
        lastUpdated: conversation.lastUpdated,
      };
    });

    //console.log("formattedConversations", formattedConversations);

    res.send(formattedConversations);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = conversationHistory;

