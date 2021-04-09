"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint new-cap: "warn" */
var RemoteResource = /*#__PURE__*/function () {
  /**
   * @param connection {AmoConnection}
   */
  function RemoteResource(connection) {
    _classCallCheck(this, RemoteResource);

    this._connection = connection;
  }

  _createClass(RemoteResource, [{
    key: "request",
    value: function request(method, path, data, options) {
      var responseHandlerClass = this.constructor.responseHandlerClass;
      return this._connection.request(path, data, method, options).then(function (response) {
        if (!responseHandlerClass) {
          return response;
        }

        return new responseHandlerClass(response);
      });
    }
  }]);

  return RemoteResource;
}();

_defineProperty(RemoteResource, "responseHandlerClass", void 0);

var _default = RemoteResource;
exports["default"] = _default;