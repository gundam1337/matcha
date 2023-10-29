const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
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
        gender: [String],
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