const bcrypt = require('bcryptjs');
const { i18n, JWT, emailHandler } = require('../../../../libs');

const UserModel = require('../models/user.model');
const DetailsModel = require('../models/details.model');

class AuthService {
    static login(data) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: data.email }, (err, user) => {
                if (err) return reject({ status: 500, message: err.message });
                if (!user) return reject({ status: 404, message: i18n.__('usersAuth.notFound') });
                if (!user.isVerified) return reject({ status: 400, message: i18n.__('usersAuth.inactiveUser') });

                // checking password and hash
                return bcrypt.compare(data.secret, user.hash, (err, result) => {
                    if (err) return reject({ status: 500, message: err.message });
                    if (!result) return reject({ status: 401, message: i18n.__('usersAuth.unauthenticated') });

                    // generate new access token
                    const newAccessToken = JWT.signToken('access', { id: user._id, email: user.email });

                    // update user and return populated user object with details
                    user
                        .update({}, { $set: { accessToken: newAccessToken }}, { new: true })
                        .populate('details')
                        .exec((err, doc) => {
                            if (err) return reject({ status: 500, message: err.message });

                            return resolve({ ...doc, message: i18n.__('usersAuth.loggedIn', { firstname: doc.details.personal.firstName })})
                        });
                })
            })
        })
    }

    static logout(data) {
        return new Promise((resolve, reject) => {
            UserModel
                .findOneAndUpdate(
                    { email: data.email },
                    { $set: { accessToken: null }}, {},
                    (err, user) => {
                        if (err) return reject({ status: 500, message: err.message });

                        return resolve({ message: i18n.__('usersAuth.loggedOut', { firstname: user.details.personal.firstName })})
                    })
        })
    }

    static registerInit(data) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: data.email }, (err, user) => {
                if (err) return reject({ status: 500, message: err.message });
                if (user) return reject({ status: 400, message: i18n.__('usersAuth.userExist') });

                // create new user
                UserModel
                    .create(
                        {
                            email: data.email,
                            serviceToken: JWT.signToken('service', { email: data.email })
                        },
                        (err, doc) => {
                            if (err) return reject({ status: 500, message: err.message });

                            // create user details
                            DetailsModel
                                .create({ user: doc._id }, (err, doc) => {
                                    if (err) return reject({ status: 500, message: err.message });

                                // update user object with details ref
                                    UserModel
                                        .findOneAndUpdate(
                                            { _id: doc.user },
                                            { $set: { details: doc._id }},
                                            { new: true },
                                            (err, user) => {
                                                if (err) return reject({ status: 500, message: err.message });

                                                // send email
                                                emailHandler(user.email, i18n.__('email.register.subject'), 'users-auth', 'register', user.serviceToken)

                                                return resolve({ message: i18n.__('usersAuth.sendRegisterEmail')});
                                            });
                                })
                        })
                })
        })
    }

    static registerConfirm(data) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email: data.email }, (err, user) => {
                if (err) return reject({status: 500, message: err.message});
                if (!user) return reject({ status: 404, message: i18n.__('usersAuth.notFound') });
                if (user.serviceToken !== data.serviceToken) return reject({ status: 400, message: i18n.__('usersAuth.invalidRegisterToken') });

                // creating salt and hash from user password
                return bcrypt.genSalt(10, (err, salt) => {
                    if (err) return reject({status: 500, message: err.message});

                    return bcrypt.hash(data.secret, salt, (err, hash) => {
                        if (err) return reject({status: 500, message: err.message});

                        user
                            .update({}, { $set: { hash: hash, isVerified: true, serviceToken: null }}, { new: true })
                            .populate('details')
                            .exec(err => {
                                if (err) return reject({ status: 500, message: err.message });

                                return resolve({ message: i18n.__('usersAuth.registered') });
                            });
                    })
                })
            })
        })
    }

    static secretResetInit(data) {
        return new Promise((resolve, reject) => {
            UserModel
                .findOneAndUpdate(
                    { email: data.email },
                    { $set: {
                            hash: null,
                            isVerified: false,
                            serviceToken: JWT.signToken('service', { email: data.email })
                        }},
                    { new: true },
                    (err, user) => {
                        if (err) return reject({ status: 500, message: err.message });
                        if (!user) return reject({ status: 404, message: i18n.__('usersAuth.notFound') });

                        // send email
                        emailHandler(user.email, i18n.__('email.reset.subject'), 'users-auth', 'reset', user.serviceToken)

                        return resolve({ message: i18n.__('usersAuth.sendResetEmail') });
                    }
                )
        })
    }

    static secretResetConfirm(data) {
        return new Promise((resolve, reject) => {
            UserModel
                .findOne({ email: data.email }, (err, user) => {
                    if (err) return reject({ status: 500, message: err.message });
                    if (!user) return reject({ status: 404, message: i18n.__('usersAuth.notFound') });
                    if (user.serviceToken !== data.serviceToken) return reject({ status: 400, message: i18n.__('usersAuth.invalidResetToken') });

                    // create salt and hash for user password
                    return bcrypt.genSalt(10, (err, salt) => {
                        if (err) return reject({status: 500, message: err.message});

                        return bcrypt.hash(data.secret, salt, (err, hash) => {
                            if (err) return reject({status: 500, message: err.message});

                            // update user document
                            user.update({}, {
                                $set: {
                                    hash: hash,
                                    isVerified: true,
                                    serviceToken: null
                                }
                            }, {}, (err) => {
                                if (err) return reject({ status: 500, message: err.message });

                                return resolve({ message: i18n.__('usersAuth.recovered') });
                            })
                        })
                    })
                })
        })
    }

    static jwtVerification(data) {
        return new Promise((resolve, reject) => {
            if (!JWT.verifyToken(data.token).email) return reject( { result: 'failed', message: JWT.verifyToken(data.token).message });
            else return resolve({ email: JWT.verifyToken(data.token).email })
        })
    }
}

module.exports = AuthService;
