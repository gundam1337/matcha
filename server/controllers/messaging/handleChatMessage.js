const Conversation = require("../../models/Conversations");
const User = require ("../../models/user")
const Message = require("../../models/Messages");

async function storeMessage(senderUsername, recipientUsername, messageText, timestamp) {
  try {
    //USE THE redis to store the these two users for a 1 houre 
    // Find the sender and recipient users by their usernames
    const [senderUser, recipientUser] = await Promise.all([
      User.findOne({ username: senderUsername }),
      User.findOne({ username: recipientUsername }),
    ]);

    if (!senderUser || !recipientUser) {
      throw new Error('Sender or recipient not found');
    }

    // Check if a conversation between the sender and recipient already exists
    //NOTE : this not important 
    let conversation = await Conversation.findOne({
      participants: { $all: [senderUser._id, recipientUser._id] },
    });

    // If the conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderUser._id, recipientUser._id],
      });
      await conversation.save();
    }

    // Create a new message
    const message = new Message({
      conversation: conversation._id,
      sender: senderUser._id,
      text: messageText,
      timestamp: timestamp,
    });

    // Save the message to the database
    await message.save();

    // Update the conversation's lastMessage and lastUpdated fields
    conversation.lastMessage = message._id;
    conversation.lastUpdated = timestamp;
    await conversation.save();

    console.log('Message stored successfully');
  } catch (error) {
    console.error('Error storing message:', error);
    throw error;
  }
}

const handleChatMessage = (socket, io) => {
  socket.on("sendMessage", async (messageObject, callback) => {
    const { sender, recipient, message, timestamp } = messageObject;

    try {
      // Check if the recipient is connected by checking if they are in a room
      const isRecipientConnected = io.sockets.adapter.rooms.has(recipient);

      if (isRecipientConnected) {
        // If the recipient is connected, emit the message to their room with an acknowledgement
        io.to(recipient).emit(
          "newMessage",
          {
            sender,
            message,
            timestamp,
          },
          (acknowledgement) => {
            if (acknowledgement) {
              // Message was successfully received by the recipient
              // Save the message in the database using a promise
              storeMessage(sender, recipient, message, timestamp)
                .then(() => {
                  // Message stored successfully
                  // Invoke the callback to acknowledge the message sending
                  callback({ success: true });
                })
                .catch((error) => {
                  // Error occurred while storing the message
                  console.error("Error storing message:", error);
                  callback({ success: false, error: "Error storing message" });
                });
            } else {
              // Message was not acknowledged by the recipient
              callback({
                success: false,
                error: "Message not acknowledged by the recipient",
              });
            }
          }
        );
      } else {
        // If the recipient is not connected, handle the situation accordingly
        console.log(
          `Recipient ${recipient} is not connected. Message not sent.`
        );
        callback({ success: false, error: "Recipient not connected" });
      }
    } catch (error) {
      console.error("Error handling chat message:", error);
      callback({
        success: false,
        error: "An error occurred while sending the message",
      });
    }
  });
};

module.exports = handleChatMessage;
