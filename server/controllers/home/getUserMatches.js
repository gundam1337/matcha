const User = require("../../models/user");

const getUserMatches = async (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send a simple event every second
  const intervalId = setInterval(() => {
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  }, 1000);

  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = getUserMatches;
