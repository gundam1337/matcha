const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const FetchConversation =  require ("../controllers/chat/Conversation")
const FetchChatHistory = require("../controllers/chat/ChatHistory")

router.use(verifyTokens);


router.get('/conversation', verifyTokens,FetchConversation);

router.get('/chat-history',verifyTokens,FetchChatHistory)




module.exports = router;