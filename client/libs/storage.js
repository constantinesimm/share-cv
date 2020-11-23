import SecureLS from 'secure-ls';

const config = process.env.NODE_ENV !== 'production' ?
  { encodingType: '', isCompression: false } :
  { encodingType: 'rc4', isCompression: true, encryptionSecret: process.env.LS_CONTROL_STRING };

const ls = new SecureLS(config);

class Storage {
  static setItem(key, data) {
    return ls.set(key, data)
  }
  static getItem(key) {
    return ls.get(key)
  }
  static removeItem(key) {
    return ls.remove(key)
  }
  static removeAll() {
    return ls.removeAll()
  }
}

export default Storage;
