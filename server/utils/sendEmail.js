const password = "cucjvikcxdzdkugi";
const nodemailer = require('nodemailer');
const fs = require('fs').promises;

const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, "/emailTemplte.html");


//const TEMPLATE_PATH = "./emailTemplte.html";
const PLACEHOLDER_ID = "ID133742";

async function prepareEmailContent(url) {
  try {
    let htmlContent = await fs.readFile(TEMPLATE_PATH, "utf8");

    if (!htmlContent.includes(PLACEHOLDER_ID)) {
      throw new Error(`Placeholder ID '${PLACEHOLDER_ID}' not found in the template.`);
    }

    return htmlContent.replace(PLACEHOLDER_ID, url);
  } catch (error) {
    console.error("Error in prepareEmailContent:", error.message);
    throw error;
  }
}

async function sendEmail(recipientEmail, htmlContent) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mailserverwebapp1337@gmail.com",
      pass: password,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"MATCHA" <mailserverwebapp1337@gmail.com>',
      to: recipientEmail,
      subject: "Verify your email address ✔",
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error in sendEmail:", error.message);
    throw error;
  }
}

// const URL = "https://cdn.vectorstock.com/i/1000x1000/78/13/red-heart-logo-template-love-icon-design-vector-30597813.webp";
// const recipientEmail = "jonewa4200@zamaneta.com";

// prepareEmailContent(URL)
//   .then(emailContent => sendEmail(recipientEmail, emailContent))
//   .catch(console.error);

module.exports = { prepareEmailContent, sendEmail };