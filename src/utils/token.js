import { LocalStorage } from "./storage.js";

class Token {
  static setToken(token, time = 2) {
    const tokenData = {
      value: token,
      expire: Date.now() + time * 3600 * 1000
    };
    LocalStorage.setItem("token", tokenData);
  }

  static getToken() {
    const token = LocalStorage.getItem("token") || [];
    if (token.length === 0) {
      return "";
    }
    if (token.expire < Date.now()) {
      return "";
    }
    return token.value;
  }

  static deleteToken() {
    LocalStorage.deleteItem("token");
  }
}

export { Token };
