can you please correct this code for me:  
const sendVerificationEmail = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    //TODO : add the error handle
    const newUser = new User({ username: name, email: email });
    const savedUser = await newUser.save();

    const token = generateVerificationToken();

    // Create a verification token for this user
    //DONE:  the verificationToken is not in the database
    const verificationToken = new VerificationToken({
      user: savedUser._id, // try to convert the name to the userID
      token: token, // Generate a random token
    });

    // Save the verification token
    await verificationToken.save();

    // Email message and send message
    const createVerificationLink = (token) => {
      const baseUrl = "http://localhost:3001/register";
      return `${baseUrl}?token=${encodeURIComponent(token)}`;
    };

    const verificationLink = createVerificationLink(verificationToken.token);

    prepareEmailContent(verificationLink)
      .then((emailContent) => sendEmail(email, emailContent))
      .then(() => {
        //console.log("the email has been sent");
        res.status(200).send("please check ur email box");
      })
      // .catch(() => {
      //   res.status(400).send("somethis is wrong with our services");
      // });
  } catch (error) {
    console.error("sendVerificationEmail error:", error);
  }
  next();
};
because he give this error:  
Message sent: <b366b1d0-df0b-0c38-dd99-2a3cc4b98d04@gmail.com>
the email has been sent
node:internal/errors:496
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:405:5)
    at ServerResponse.setHeader (node:_http_outgoing:648:11)
    at ServerResponse.header (/home/gundam/Desktop/matcha/server/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/gundam/Desktop/matcha/server/node_modules/express/lib/response.js:174:12)
    at /home/gundam/Desktop/matcha/server/controllers/auth.controller.js:91:25
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

Node.js v18.17.0
