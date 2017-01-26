'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = filterFunctionProps;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function filterFunctionProps(props) {
  return Object.keys(props).filter(function (key) {
    return typeof props[key] !== 'function';
  }).reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, key, props[key]));
  }, {});
}