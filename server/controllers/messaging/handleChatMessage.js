const Conversation = require("../../models/Conversations");
const Message = require("../../models/Messages");

const handleChatMessage = (socket, io) => {
  socket.on("sendMessage", async (messageObject) => {
    const { sender, recipient, message, timestamp } = messageObject;

    try {
      // Check if the recipient is connected by checking if they are in a room
      const isRecipientConnected = io.sockets.adapter.rooms.has(recipient);

      if (isRecipientConnected) {
        // If the recipient is connected, emit the message directly to their room
        io.to(recipient).emit("newMessage", {
          sender,
          message,
          timestamp,
        });
      } else {
        // If the recipient is not connected, store the message in the database
        //await storeMessage(sender, recipient, message, timestamp);
      }

      // Emit the message to the sender's room as well
      io.to(sender).emit("newMessage", {
        sender,
        message,
        timestamp,
      });
    } catch (error) {
      console.error("Error handling chat message:", error);
    }
  });
};

module.exports = handleChatMessage;
