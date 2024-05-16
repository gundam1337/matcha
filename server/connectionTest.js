const mongoose = require("mongoose");
const User = require("./models/user");
const Conversation = require("./models/Conversations");
const Message = require("./models/Messages");
const config = require("./config/database");
const { faker } = require("@faker-js/faker");

const NUM_CONVERSATIONS = 3;
const NUM_MESSAGES_PER_CONVERSATION = 10;
const CONSTANT_USERNAME = "omar";
const exampleUserIds = [
  "660de43a45098eaa0f86f707",
  "660de42545098eaa0f86f6eb",
  "660de42445098eaa0f86f6e9",
];

mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fetchUsersByIds = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } }).exec();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const fetchUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username }).exec();
    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw error;
  }
};

const createRandomMessage = async (conversationId, senderId) => {
  const message = new Message({
    conversation: conversationId,
    sender: senderId,
    text: faker.lorem.sentence(),
  });

  await message.save();
  return message;
};

const createRandomConversation = async (participantIds) => {
  const conversation = new Conversation({
    participants: participantIds,
  });

  await conversation.save();
  return conversation;
};

const seedDatabase = async () => {
  try {
    // Fetch users
    const users = await fetchUsersByIds(exampleUserIds);
    const specifiedUser = await fetchUserByUsername(CONSTANT_USERNAME);

    if (!specifiedUser) {
      throw new Error(`User with username ${CONSTANT_USERNAME} not found`);
    }

    for (const user of users) {
      if (user._id.toString() === specifiedUser._id.toString()) continue;

      const participants = [specifiedUser._id, user._id];

      // Create conversation
      const conversation = await createRandomConversation(participants);

      let lastMessage = null;
      for (let j = 0; j < NUM_MESSAGES_PER_CONVERSATION; j++) {
        const senderId =
          participants[Math.floor(Math.random() * participants.length)];
        lastMessage = await createRandomMessage(conversation._id, senderId);
      }

      conversation.lastMessage = lastMessage._id;
      conversation.lastUpdated = lastMessage.timestamp;
      await conversation.save();
    }

    // console.log(users);
    // Create conversations and messages

    console.log("Database seeded successfully");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
};

seedDatabase();
