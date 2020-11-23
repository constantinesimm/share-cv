import i18n from '@/libs/i18n';


const passwordValid = (rule, value, callback) => {
  const reDigit = /(?=.*[\d])/g;
  const reLowerLetter = /(?=.*[a-z])/g;
  const reUpperLetter = /(?=.*[A-Z])/g;
  const reAllFormat = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[\w])[\w]{6,14}$/;

  if (!reLowerLetter.test(value)) return callback(i18n.t('validate.pass.lowercase'));
  if (!reUpperLetter.test(value)) return callback(i18n.t('validate.pass.uppercase'));
  if (!reDigit.test(value)) return callback(i18n.t('validate.pass.digit'));
  if (!reAllFormat.test(value)) return callback(i18n.t('validate.pass.length'));

  else return callback();
};

const nameValid = (rule, value, callback) => {
  const reLetters = /^[(\w)+ \s-]{4,15}$/;

  return reLetters.test(value) ? callback() : callback(i18n.t('validate.name'))
};

const phoneValid = (rule, value, callback) => {
  //regExp for mask +99 (999) 999 99 99
  const rePhoneNumber = /(?=\+\d{2}\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2})/g;

  if (['viber'].includes(rule.field) && (value === null || value === undefined)) return callback();
  else return rePhoneNumber.test(value) ? callback() : callback(i18n.t('validate.phoneExample'))
};

const usernameValid = (rule, value, callback) => {
  const reUsername = /^@[a-zA-Z0-9\-_]+$/;

  console.log(rule, value)
  if (['telegram', 'slack'].includes(rule.field) && (value === null || value === undefined)) return callback();
  else return reUsername.test(value) ? callback() : callback(i18n.t('validate.username'))
};

export default {
  email: [
    { required: true, message: i18n.t('validate.inputRequired', { field: 'Email' }) },
    { type: 'email', message: i18n.t('validate.format') }
  ],
  secret: [
    { required: true, message: i18n.t('validate.inputRequired') },
    { min: 6, max: 14, message: i18n.t('validate.pass.length') },
    { validator: passwordValid }
  ],
  name: [
    { required: true, message: i18n.t('validate.inputRequired') },
    { min: 4, max: 15, message: i18n.t('validate.name') },
    { validator: nameValid }
  ],
  phone: [
    { required: true, message: i18n.t('validate.inputRequired') },
    { validator: phoneValid }
  ],
  viber: [
    { validator: phoneValid }
  ],
  skype: [
    { type: 'string', message: i18n.t('validate.format') }
  ],
  username: [
    { validator: usernameValid }
  ],
  link: [
    { type: 'url', message: i18n.t('validate.format') }
  ]
}
