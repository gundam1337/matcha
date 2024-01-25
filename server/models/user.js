var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userSchema = new Schema({
  username: {
    //DONE
    type: String,
    required: true,
    unique: true,
  },
  email: {
    //DONE
    type: String,
    required: true,
    validate: [validateEmail, "Please fill a valid email address"],
    unique: true,
  },
  passwordHash: {
    //DONE
    type: String,
    required: true,
  },
  emailVerified: {
    //DONE
    type: Boolean,
    default: false,
  },
  profile: {
    isProfileSetup: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      //DONE
      type: String,
      required: false, // Set to true if you want the image to be mandatory
    },
    firstName: {
      //DONE
      type: String,
      //required: true
    },
    lastName: {
      //DONE
      type: String,
      //required: true
    },
    birthdate: {
      //DONE
      type: Date,
      //required: true
    },
    phoneNumber: {
      //DONE
      type: String,
      //required: true
    },
    gender: {
      //DONE
      type: String,
      //required: true
    },
    location: {
      //DONE
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
      city: String,
      country: String,
      
    },
    bio: String, //DONE
    interests: [String], //NOTE hobies
  },
  preferences: {
    gender: { type: Boolean }, // DONE in the server
    ageRange: {
      //DONE
      min: Number,
      max: Number,
    },
    distance: Number, //DONE
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
    required: false,
  },
  resetToken: {
    token: {
      type: String,
      // required: true,
    },
    expiresAt: {
      type: Date,
      // required: true,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
