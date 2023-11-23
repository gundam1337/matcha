var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
//TODO add a field that I will use to see is this user complet his profile registration
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  //DONE add the profile picture
  profile: {
    profilePicture: {
      type: String,
      required: false, // Set to true if you want the image to be mandatory
    },
    firstName: {
      type: String,
      //required: true
    },
    lastName: {
      type: String,
      //required: true
    },
    birthdate: {
      type: Date,
      //required: true
    },
    phoneNumber: {
      type: String,
      //required: true
    },
    gender: {
      type: String,
      //required: true
    },
    location: {
      city: String,
      state: String,
      country: String,
    },
    bio: String,
    interests: [String],
    photos: [String],
  },
  preferences: {
    gender: String,
    ageRange: {
      min: Number,
      max: Number,
    },
    distance: Number,
  },
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastLogin: Date,
  accountStatus: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
