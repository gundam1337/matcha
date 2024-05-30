const User = require("../../models/user");
const Message = require("../../models/Messages");
const Conversation = require("../../models/Conversations");

//input : currentUser + chatPartner + how many message you want 
// this data is comming from the post request


//output : the messages + thier times 
//the format of the out put should look like something like this 



//TODO use the pagination to get the messageses 

const chatHistory = async (req, res, next) => {
  try {
    const { currentUser, chatPartner,page  } = req.body; 
    const limit = 10;
    const pageNumber = parseInt(page) || 1;

    //Fetch User IDs
    const currentUserDoc = await User.findOne({ username: currentUser });
    const chatPartnerDoc = await User.findOne({ username: chatPartner });

    if (!currentUserDoc || !chatPartnerDoc) {
      return res.status(404).send('User not found');
    }

    const currentUserId = currentUserDoc._id;
    const chatPartnerId = chatPartnerDoc._id;

    // Find the conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, chatPartnerId] }
    });

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    const messages = await Message.find({ conversation: conversation._id })
    .sort({ timestamp: -1 })
    .skip((pageNumber - 1) * limit)
    .limit(limit)
    .populate('sender', 'username'); // Populate sender with username

    // Format the output
    const formattedMessages = messages.map(msg => ({
      sender: { username: msg.sender.username },
      text: msg.text,
      timestamp: msg.timestamp,
    }));

    const response = {
      participants: [
        { username: currentUser },
        { username: chatPartner },
      ],
      messages: formattedMessages,
      lastUpdated: conversation.lastUpdated,
    };

    //console.log(JSON.stringify(response, null, 4));
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send("Server error");
  }
};





module.exports = chatHistory;
