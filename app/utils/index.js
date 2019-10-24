'use strict';

const formatQuery = (obj) => {
  const str = [];
  for (const k in obj) {
    if (typeof obj[k] !== 'undefined') {
      str.push(`${k}=${encodeURIComponent(obj[k])}`);
    }
  }
  return str.join('&');
};

const limitText = (text = '', limitCount = 120) => {
  return text.length > limitCount ? `${text.slice(0, limitCount)}...` : text;
};

const deepClone = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const jsonParse = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

module.exports = {
  formatQuery,
  limitText,
  deepClone,
  jsonParse,
};
