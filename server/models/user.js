var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    emailVerificationToken: {
        type: String,
        unique: true,
        sparse: true // This makes sure that this field is not considered in uniqueness checks if it's not set
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    profile: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        birthdate: {
            type: Date,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        location: {
            city: String,
            state: String,
            country: String
        },
        bio: String,
        interests: [String],
        photos: [String]
    },
    preferences: {
        gender: String,
        ageRange: {
            min: Number,
            max: Number
        },
        distance: Number
    },
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    lastLogin: Date,
    accountStatus: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'active'
    }
});

const User = mongoose.model('User',userSchema);
module.exports = mongoose.model('USER', User);
