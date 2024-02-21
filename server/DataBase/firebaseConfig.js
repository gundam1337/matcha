const admin = require("firebase-admin");
const serviceAccount = require("../storage/matcha-406014-firebase-adminsdk-fnp82-8517b73387.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "matcha-406014.appspot.com",
  });
  
  const bucket = admin.storage().bucket();
  
module.exports = { bucket };
