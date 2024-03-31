//FIXME : this code is not tested
//the logic is look good

//NOTE : messages 
//Match : New Match Alert!
//likes : [Username] has liked your profile! See who's interested in you."
//visitors "Someone's checking you out! [Username] recently visited your profile."

//TODO : 

const Notification = require("../models/notificationSchema");

const handleSocketConnection = (socket) => {

  //TODO use the token to for getting the data from the database
  const fetchAndEmitNotifications = async (userId) => {
    try {
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
  };

  socket.on("getNotifications", async (data) => {
    // Reuse the refactored function
    await fetchAndEmitNotifications(data.userId);
  });

  // Change stream setup
  const changeStream = Notification.watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const newNotification = change.fullDocument;
      const userId = socket.userId; // Assuming the user's ID is stored in the socket

      if (newNotification.recipient === userId) {
        // Reuse the refactored function instead of emitting directly
        await fetchAndEmitNotifications(userId);
      }
    }
  });

  // Add more event handlers as needed
};

module.exports = handleSocketConnection;
