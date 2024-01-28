var mongoose = require("mongoose");
const { string } = require("yup");
var Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
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
  profile: {
    isProfileSetup: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: [String],
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
        type: String,
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
      latitude: {
        type: Number,
        //required: true
      },
      longitude: {
        type: Number,
        //required: true
      },
      city: String,
      country: String,
      
    },
    bio: String, 
    interests: [String], 
  },
  preferences: {
    gender: { type: String,}, 
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
  refreshToken: {
    type: String,
  },
  resetToken: {
    token: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
