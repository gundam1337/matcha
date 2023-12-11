const password = "cucjvikcxdzdkugi"; // FIXME : add this the .env
const nodemailer = require("nodemailer");
const fs = require("fs").promises;

//FIXME : the function is not  perfect
const path = require("path");

async function sendEmail(recipientEmail, purpose, url) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mailserverwebapp1337@gmail.com",
      pass: password,
    },
  });

  let htmlContent;
  let subject;

  //NOTE : this is for login
  // Determine the template and subject based on the purpose
  if (purpose === "login") {
    //FIXME
    const PLACEHOLDER_DATE = "ID1337421337";
    const TEMPLATE_LOGIN_PATH = path.join(__dirname, "/loginNotice.html");
    htmlContent = await fs.readFile(TEMPLATE_LOGIN_PATH, "utf8");
    if (!htmlContent.includes(PLACEHOLDER_DATE)) {
      throw new Error(
        `Placeholder ID '${PLACEHOLDER_DATE}' not found in the template.`
      );
    }
    const date = new Date(); // This will get the current date and time
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    // Locale 'en-US' is used to get the format similar to the one in the screenshot
    const formattedDate = date.toLocaleDateString("en-US", options);

    htmlContent = htmlContent.replace(PLACEHOLDER_DATE, formattedDate);

    subject = "Login Notification";
    //NOTE : this is for verifcation
  } else if (purpose === "verification") {
    try {
      const PLACEHOLDER_ID = "ID133742";
      const TEMPLATE_PATH = path.join(__dirname, "/emailTemplte.html");
      htmlContent = await fs.readFile(TEMPLATE_PATH, "utf8");

      if (!htmlContent.includes(PLACEHOLDER_ID)) {
        throw new Error(
          `Placeholder ID '${PLACEHOLDER_ID}' not found in the template.`
        );
      }
      htmlContent = htmlContent.replace(PLACEHOLDER_ID, url);
      subject = "Verify your email address ✔";
    } catch (error) {
      console.error("Error in prepareEmailContent:", error.message);
      throw error;
    }
     //NOTE : this is for reset password 
  } else if (purpose === "reset") {
    try {
      const PLACEHOLDER_ID = "ID133742";
      const TEMPLATE_PATH = path.join(__dirname, "/resetEmail.html");
      htmlContent = await fs.readFile(TEMPLATE_PATH, "utf8");

      if (!htmlContent.includes(PLACEHOLDER_ID)) {
        throw new Error(
          `Placeholder ID '${PLACEHOLDER_ID}' not found in the template.`
        );
      }
      htmlContent = htmlContent.replace(PLACEHOLDER_ID, url);
      subject = "Verify your email address ✔";
    } catch (error) {
      console.error("Error in prepareEmailContent:", error.message);
      throw error;
    }

  } else {
    throw new Error("Invalid email purpose");
  }

  try {
    let info = await transporter.sendMail({
      from: '"MATCHA" <mailserverwebapp1337@gmail.com>',
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error in sendEmail:", error.message);
    throw error;
  }
}

module.exports = { sendEmail };
