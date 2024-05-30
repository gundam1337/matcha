



const handleChatMessage = (socket) => {
  socket.on("sendMessage", (messageObject) => {
    console.log("Message received:", messageObject);
  });
};

module.exports = handleChatMessage;
