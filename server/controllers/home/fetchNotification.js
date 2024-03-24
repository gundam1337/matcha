
const Notification = require('../../models/notificationSchema'); 

const fetchNotification =  async (req, res) => {
    try {
      const { recipient, message, type } = req.body;
      const notification = new Notification({ recipient, message, type });
      await notification.save();
      res.status(201).json({ message: 'Notification sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending notification' });
    }
  }

  module.exports = fetchNotification