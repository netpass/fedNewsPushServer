'use strict';

const isString = function(str) {
  return toString.call(str) === '[object String]';
};
const isArray = function(arr) {
  return toString.call(arr) === '[object Array]';
};
const isBoolean = function(bool) {
  return toString.call(bool) === '[object Boolean]';
};
const isUndefined = function(bool) {
  return toString.call(bool) === '[object Undefined]';
};
const isNull = function(bool) {
  return toString.call(bool) === '[object Null]';
};
const isNumber = function(num) {
  return toString.call(num) === '[object Number]';
};
const isObject = function(obj) {
  return toString.call(obj) === '[object Object]';
};
const isEmptyObject = function(obj) {
  if (!isObject(obj)) {
    return false;
  }
  for (const key in obj) {
    if (!isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
};
const isFunction = function(arg) {
  return toString.call(arg) === '[object Function]';
};
const isSymbol = function(sym) {
  return toString.call(sym) === '[object Symbol]';
};

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
  isString,
  isArray,
  isBoolean,
  isUndefined,
  isNull,
  isNumber,
  isObject,
  isEmptyObject,
  isFunction,
  isSymbol,
};
