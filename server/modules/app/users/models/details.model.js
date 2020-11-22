const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetailsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    personal: {
        avatar: {
            format: String,
            base64: String
        },
        firstName: String,
        lastName: String,
        sex: {
            type: String,
            enum: ['male', 'female']
        },
        birthday: Date,
        country: String,
        city: String
    },
    contacts: {
        phone: String,
        skype: String,
        linkedIn: String,
        github: String,
        telegram: String
    },
    education: {
        school: [
            {
                name: String,
                direction: String,
                startDate: Date,
                endDate: Date
            }
        ],
        university: [
            {
                name: String,
                faculty: String,
                specialty: String,
                startDate: Date,
                endDate: Date
            }
        ],
        languages: [
            {
                name: String,
                level: {
                    type: String,
                    enum: ['no', 'beginner', 'pre', 'inter', 'upper', 'fluent']
                }
            }
        ]
    },
    experience: {
        company: [
            {
                name: String,
                position: String,
                level: String,
                duties: String,
                startDate: Date,
                endDate: Date,
                achievements: String
            }
        ],
        skills: [
            {
                name: String,
                level: {
                    type: String,
                    enum: ['basic', 'intermediate', 'advanced']
                }
            }
        ]
    },
    target: {
        position: String,
        salaryCurrency: {
            type: String,
            enum: ['usd', 'uah', 'eur'],
            default: 'usd'
        },
        salaryExpectations: Number,
        positionCategory: String,
        employmentOptions: {
            type: String,
            enum: ['full', 'part', 'freelance', 'remote', 'inner', 'outer']
        }
    }
}, { collection: 'users-detail' });

module.exports = mongoose.model('Details', DetailsSchema);
