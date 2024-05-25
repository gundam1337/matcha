const User = require("../../models/user");
const Message = require("../../models/Messages");
const Conversation = require("../../models/Conversations");

//input : currentUser + chatPartner + how many message you want 
// this data is comming from the post request


//output : the messages + thier times 
//the format of the out put should look like something like this 
//  {
//    
//
//  }

//TODO use the pagination to get the messageses 

const chatHistory = async (req, res, next) => {
  try {

    const { currentUser, chatPartner,page  } = req.query; 
    const limit = 10;


    const messages = await Message.find({ conversation: conversationId })
    .sort({ timestamp: -1 }) // Sort messages by timestamp descending
    .skip((page - 1) * limit) // Calculate the number of documents to skip
    .limit(parseInt(limit, 10)); // Limit the number of documents returned
    
    res.status(200).send("I got the message");
  } catch (error) {
    res.status(500).send("Server error");
  }
};



// {
//   "conversationId": "60d0fe4f5311236168a109ca",
//   "participants": [
//     {
//       "userId": "60d0fe4f5311236168a109cb",
//       "username": "JohnDoe"
//     },
//     {
//       "userId": "60d0fe4f5311236168a109cc",
//       "username": "JaneSmith"
//     }
//   ],
//   "messages": [
//     {
//       "messageId": "60d0fe4f5311236168a109cd",
//       "sender": {
//         "userId": "60d0fe4f5311236168a109cb",
//         "username": "JohnDoe"
//       },
//       "text": "Hello, how are you?",
//       "timestamp": "2023-05-25T12:34:56.789Z"
//     },
//     {
//       "messageId": "60d0fe4f5311236168a109ce",
//       "sender": {
//         "userId": "60d0fe4f5311236168a109cc",
//         "username": "JaneSmith"
//       },
//       "text": "I'm good, thank you! How about you?",
//       "timestamp": "2023-05-25T12:35:56.789Z"
//     }
//   ],
//   "lastUpdated": "2023-05-25T12:36:56.789Z"
// }

module.exports = chatHistory;
