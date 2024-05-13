const express = require("express");
const verifyTokens = require("../controllers/auth/verifyTokens")
const router = express.Router();
const FetchChatHistory =  require ("../controllers/chat/chatHistory")


router.use(verifyTokens);


router.get('/chat_history', verifyTokens,FetchChatHistory);




module.exports = router;