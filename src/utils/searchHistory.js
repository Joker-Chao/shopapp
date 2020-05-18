const { LocalStorage } = require("./storage.js");
const HISTORY_NAME = "search_history";
const MAX_HISTORY_LENGTH = 10;

const setHistory = function(keyword) {
  const history = getHistory();
  if (history.length === 0) {
    history.unshift(keyword);
  } else {
    const index = history.findIndex(item => item === keyword);
    if (index > 0) {
      history.splice(index, 1);
    }
    history.unshift(keyword);
  }
  if (history.length > MAX_HISTORY_LENGTH) {
    history.pop();
  }
  LocalStorage.setItem(HISTORY_NAME, history);
};

const getHistory = function() {
  return LocalStorage.getItem(HISTORY_NAME) || [];
};

const clearHistory = function() {
  LocalStorage.deleteItem(HISTORY_NAME);
};

export default {
  setHistory,
  getHistory,
  clearHistory
};
