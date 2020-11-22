const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Details = require('./details.model');

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        set: v => v.toLowerCase()
    },
    hash: {
        type: String,
        default: null
    },
    accessToken: {
        type: String,
        default: null
    },
    serviceToken: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isFirstLoginComplete: {
        type: Boolean,
        default: false
    },
    locale: {
        type: String,
        enum: ['en', 'uk', 'ru'],
        default: 'en'
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'super'],
        default: 'customer'
    },
    details: {
        type: Schema.Types.ObjectId,
        ref: 'Details'
    },
}, { collection: 'users' });

module.exports = mongoose.model('User', UserSchema);
