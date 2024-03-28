// socketHandlers.js
const Notification = require("../models/notificationSchema");

const handleSocketConnection = (socket) => {

  socket.on("getNotifications", async (data) => {
    try {
      //how to get the user ID
      const userId = data.userId;
      const notifications = await Notification.find({ recipient: userId }).sort(
        { date: -1 }
      );

      socket.emit("notificationResponse", notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      socket.emit("notificationResponse", {
        error: "An error occurred while fetching notifications.",
      });
    }
  });

  // Add more event handlers as needed
};

module.exports = handleSocketConnection;
