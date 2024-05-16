const User = require("../../models/user");
const Message = require("../../models/Messages");
const Conversation = require("../../models/Conversations");

// Find the user by their username.
//Retrieve all conversations that include the user as a participant.
//Retrieve the necessary information about each user in the converation
// For each conversation, fetch the last 10 messages

//
const chatHistory = async (req, res, next) => {
  try {
    const { username } = req.user;
    // Step 1: Find the user by username
    const user = await User.findOne({ username }).select("_id");
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Step 2: Find all conversations that the user is a participant in
    const conversations = await Conversation.find()
      .populate('participants', 'username profile')
      .populate({
        path: 'lastMessage',
        select: 'text timestamp',
        populate: {
          path: 'sender',
          select: 'username profile',
        },
      })
      .exec();

    const formattedConversations = conversations.map((conversation) => {
      const participants = conversation.participants.map((participant) => ({
        userID: participant._id,
        username: participant.username,
        profile: participant.profile,
      }));

      return {
        conversationID: conversation._id,
        participants,
        lastMessage: {
          text: conversation.lastMessage?.text || '',
          timestamp: conversation.lastMessage?.timestamp || '',
          sender: {
            username: conversation.lastMessage?.sender?.username || '',
            profile: conversation.lastMessage?.sender?.profile || {},
          },
        },
        lastUpdated: conversation.lastUpdated,
      };
    });


    // Step 3: Retrieve the last 10 messages for each conversation
    // const conversationHistories = await Promise.all(
    //   conversations.map(async (conversation) => {
    //     const messages = await Message.find({ conversation: conversation._id })
    //       .sort({ timestamp: -1 }) // Sort by timestamp in descending order
    //       .limit(10) // Get the last 10 messages
    //       .lean();

    //     return {
    //       conversationId: conversation._id,
    //       messages,
    //     };
    //   })
    // );

    res.send(conversations);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = chatHistory;
