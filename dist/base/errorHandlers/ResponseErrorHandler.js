"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ResponseErrorHandler = /*#__PURE__*/function () {
  function ResponseErrorHandler(response, responseInfo) {
    _classCallCheck(this, ResponseErrorHandler);

    this._response = response;
    this._responseInfo = responseInfo;
  }

  _createClass(ResponseErrorHandler, [{
    key: "handleErrors",
    value: function handleErrors() {
      if (!this.hasErrors()) {
        return;
      }

      throw this.getFirstError();
    }
  }, {
    key: "getErrorsData",
    value: function getErrorsData() {
      return true;
    }
  }, {
    key: "hasErrors",
    value: function hasErrors() {
      return false;
    }
  }, {
    key: "getFirstError",
    value: function getFirstError() {
      return new Error('Parse response error');
    }
  }]);

  return ResponseErrorHandler;
}();

var _default = ResponseErrorHandler;
exports["default"] = _default;