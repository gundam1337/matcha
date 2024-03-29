//TODO if the notification DOC is empty send an empty obj
const Notification = require("../models/notificationSchema");
const User = require("../models/user")

const handleSocketConnection = (socket) => {

  /* -------------------- Notifications -------------------*/
  socket.on("getNotifications", async (data) => {
    try {
      //how to get the user ID
      const current_user = socket.decoded;

      const user = await User.findOne({ username: current_user.username, email: current_user.email }).exec();;
      if (!user) {
        console.log("User not found");
        return;
      }
  
      const notifications = await Notification.find({ recipient: user._id }).exec();
      
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
