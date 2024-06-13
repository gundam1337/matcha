const Conversation = require("../../models/Conversations");
const User = require("../../models/user");
const Message = require("../../models/Messages");

const redis = require("redis");
const client = redis.createClient({
  host: "localhost", // Replace with your Redis host
  port: 6379, // Replace with your Redis port
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (error) => {
  console.error("Redis connection error:", error);
});

//TODO create a function that cach the converstation

async function storeMessage(
  senderUsername,
  recipientUsername,
  messageText,
  timestamp
) {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
    // Create Redis keys for sender and recipient user data
    const senderUserKey = `user:${senderUsername}`;
    const recipientUserKey = `user:${recipientUsername}`;

    // Check if the sender and recipient user data is cached in Redis
    let [senderUser, recipientUser] = await Promise.all([
      client.get(senderUserKey),
      client.get(recipientUserKey),
    ]);

    // If sender user data is not cached, fetch it from the database and cache it
    if (!senderUser) {
      senderUser = await User.findOne({ username: senderUsername });
      if (!senderUser) {
        throw new Error("Sender not found");
      }
      await client.set(senderUserKey, JSON.stringify(senderUser));
    } else {
      senderUser = JSON.parse(senderUser);
    }

    // If recipient user data is not cached, fetch it from the database and cache it
    if (!recipientUser) {
      recipientUser = await User.findOne({ username: recipientUsername });
      if (!recipientUser) {
        throw new Error("Recipient not found");
      }
      await client.set(recipientUserKey, JSON.stringify(recipientUser));
    } else {
      recipientUser = JSON.parse(recipientUser);
    }

    // Create a Redis key for the conversation data
    const conversationKey = `conversation:${senderUser._id}:${recipientUser._id}`;

    // Check if the conversation data is cached in Redis
    let conversation = await client.get(conversationKey);

    // If the conversation data is not cached, fetch it from the database and cache it
    if (!conversation) {
      conversation = await Conversation.findOne({
        participants: { $all: [senderUser._id, recipientUser._id] },
      });

      // If the conversation doesn't exist, create a new one
      if (!conversation) {
        conversation = new Conversation({
          participants: [senderUser._id, recipientUser._id],
        });
        await conversation.save();
      }

      await client.set(conversationKey, JSON.stringify(conversation));
    } else {
      // Parse the conversation object from JSON string
      const parsedConversation = JSON.parse(conversation);

      // Create a new Mongoose document instance from the parsed conversation object
      conversation = new Conversation(parsedConversation);
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

    // Update the cached conversation data in Redis
    await client.set(conversationKey, JSON.stringify(conversation));

    console.log("Message stored successfully");
  } catch (error) {
    console.error("Error storing message:", error);
    throw error;
  }
}

const handleChatMessage = (socket, io) => {
  socket.on("sendMessage", async (messageString, callback) => {
    const messageObject = JSON.parse(messageString);
    const { sender, recipient, message, timestamp } = messageObject;

    console.log("sendMessage ", sender, recipient, message, timestamp);
    try {
      // Save the message in the database
      await storeMessage(sender, recipient, message, timestamp);

      // Check if the recipient is connected by checking if they are in a room
      const isRecipientConnected = io.sockets.adapter.rooms.has(recipient);
      if (isRecipientConnected) {
        console.log(`the user ${recipient} is connected`);
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
              // Invoke the callback to acknowledge the message sending
              //callback({ success: true });
            } else {
              // Message was not acknowledged by the recipient
              // callback({
              //   success: false,
              //   error: "Message not acknowledged by the recipient",
              // });
            }
          }
        );
      } else {
        // If the recipient is not connected, handle the situation accordingly
        console.log(
          `Recipient ${recipient} is not connected. Message saved in the database.`
        );
        //callback({ success: true, message: "Message saved in the database" });
      }
    } catch (error) {
      console.error("Error handling chat message:", error);
      // callback({
      //   success: false,
      //   error: "An error occurred while sending the message",
      // });
    }
  });
};

module.exports = handleChatMessage;
