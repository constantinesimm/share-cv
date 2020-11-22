const pug = require('pug');
const nodemailer = require('nodemailer');
const i18n = require('../i18n');
const { HttpError } = require('../../utils');
const { smtp, appBaseUrl } = require('../../config');

const transporter = nodemailer.createTransport(smtp);

module.exports = (recipient, subject, tmpl, action, token) => {
    const endpoints = {
        register: `${ appBaseUrl }/auth/register/confirm`,
        reset: `${ appBaseUrl }/auth/password/renew`
    }

    const emailDetails = {
        from: `noreply@share-cv.com`,
        to: recipient,
        subject: subject,
        html: pug.compileFile(__dirname + `/template/${tmpl}.pug`,{})({
            greetings: i18n.__(`email.${action}.greetings`),
            headerText: i18n.__(`email.${action}.headerText`),
            bodyContent: i18n.__(`email.${action}.bodyContent`),
            bodyWarning: i18n.__(`email.${action}.bodyWarning`),
            bodyLinkExpiresText: i18n.__(`email.${action}.bodyLinkExpiresText`),
            link: `${endpoints[action]}?token=${token}`,
            buttonText: i18n.__(`email.${action}.buttonText`)
        })
    };

    transporter.sendMail(emailDetails, (err, info) => {
        if (err) {
            new HttpError(500, err.message);

            return process.exit(1);
        }

        transporter.close();
    })
}
