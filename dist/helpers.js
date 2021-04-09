"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = void 0;

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};

exports.delay = delay;