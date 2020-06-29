const STORAGE_NAME = "shose_mall";

class SessionStorage {
  static getItem(name, module = null) {
    const storage = SessionStorage.getStorage();
    if (module != null) {
      if (Reflect.has(storage, module)) {
        return storage[module][name];
      } else {
        return "";
      }
    } else {
      return storage[name] || "";
    }
  }
  static setItem(name, value) {
    const storage = SessionStorage.getStorage();
    storage[name] = value;
    SessionStorage.setStorage(storage);
  }
  static getStorage() {
    return JSON.parse(sessionStorage.getItem(STORAGE_NAME) || "{}");
  }
  static setStorage(value) {
    sessionStorage.setItem(STORAGE_NAME, JSON.stringify(value));
  }
  static deleteItem(name, module = null) {
    const storage = SessionStorage.getStorage();
    if (module != null) {
      if (Reflect.has(storage, module)) {
        Reflect.deleteProperty(storage[module], name);
      }
    } else {
      Reflect.deleteProperty(storage, name);
    }
    SessionStorage.setStorage(storage);
  }
  static clear() {
    sessionStorage.removeItem(STORAGE_NAME);
  }
}

class LocalStorage {
  static getItem(name, module = null) {
    const storage = LocalStorage.getStorage();
    if (module != null) {
      if (Reflect.has(storage, module)) {
        return storage[module][name];
      } else {
        return "";
      }
    } else {
      return storage[name] || "";
    }
  }
  static setItem(name, value, module = null) {
    const storage = LocalStorage.getStorage();
    if (module != null) {
      storage[module][name] = value;
    } else {
      storage[name] = value;
    }
    LocalStorage.setStorage(storage);
  }
  static getStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_NAME) || "{}");
  }
  static setStorage(value) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(value));
  }
  static deleteItem(name, module = null) {
    const storage = LocalStorage.getStorage();
    if (module != null) {
      if (Reflect.has(storage, module)) {
        Reflect.deleteProperty(storage[module], name);
      }
    } else {
      Reflect.deleteProperty(storage, name);
    }
    LocalStorage.setStorage(storage);
  }
  static clear() {
    localStorage.removeItem(STORAGE_NAME);
  }
}

export { SessionStorage, LocalStorage };
