const Conversation = require ("../../models/Conversations")
const Message = require ("../../models/Messages")


const handleChatMessage = (socket, io) => {
  // Join rooms upon connection based on user's active conversations
  socket.on("joinChatRooms", (userConversations) => {
    userConversations.forEach(conversation => {
      socket.join(conversation.roomId);
    });
  });

  socket.on("sendMessage", async (messageObject) => {
    const { senderId, recipientId, message } = messageObject;

    // Generate a consistent roomId
    let roomId = [senderId, recipientId].sort().join("_");

    // Emit the message to the room without waiting for DB operations
    io.to(roomId).emit("newMessage", {
      sender: senderId,
      text: message,
      timestamp: new Date().toISOString()
    });

    try {
      // Update or create conversation in a non-blocking way
      let conversation = await Conversation.findOneAndUpdate(
        { participants: { $all: [senderId, recipientId] } },
        { lastUpdated: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      // Save the new message
      const newMessage = new Message({
        conversation: conversation._id,
        //sender: mongoose.Types.ObjectId(senderId),
        text: message,
        timestamp: new Date(),
      });
      await newMessage.save();

      // Optionally update the conversation with the last message
      await Conversation.findByIdAndUpdate(conversation._id, { lastMessage: newMessage._id });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });
};

module.exports = handleChatMessage;
