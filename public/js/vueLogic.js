"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ioConnection = undefined;

var _vue = require("vue");

var _vue2 = _interopRequireDefault(_vue);

var _vueSocket = require("vue-socket.io");

var _vueSocket2 = _interopRequireDefault(_vueSocket);

var _App = require("./components/App.vue");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ioConnection = exports.ioConnection = io.connect('localhost:3000');

_vue2.default.use(_vueSocket2.default, ioConnection);

new _vue2.default({
  el: "#main",
  render: function render(h) {
    return h(_App2.default);
  }
});