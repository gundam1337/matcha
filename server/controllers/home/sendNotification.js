
const Notification = require('../../models/notificationSchema'); 

const sendNotification = async (req, res) => {
    try {
      const userId = req.params.userId;
      const notifications = await Notification.find({ recipient: userId }).sort({ date: -1 });
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching notifications' });
    }
  }

  module.exports = sendNotification;