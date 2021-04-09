"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: использовать axios
var PrivateRequest = /*#__PURE__*/function () {
  function PrivateRequest(options) {
    _classCallCheck(this, PrivateRequest);

    this._options = options;
  }

  _createClass(PrivateRequest, [{
    key: "send",
    value: function send() {
      var _this = this;

      var _this$_options = this._options,
          hostname = _this$_options.hostname,
          path = _this$_options.path,
          _this$_options$method = _this$_options.method,
          method = _this$_options$method === void 0 ? 'GET' : _this$_options$method,
          _this$_options$header = _this$_options.headers,
          headers = _this$_options$header === void 0 ? {} : _this$_options$header,
          _this$_options$data = _this$_options.data,
          data = _this$_options$data === void 0 ? '' : _this$_options$data,
          form = _this$_options.form,
          _this$_options$secure = _this$_options.secure,
          secure = _this$_options$secure === void 0 ? false : _this$_options$secure;
      var driver = secure ? _https["default"] : _http["default"];
      return new Promise(function (resolve, reject) {
        var request = driver.request({
          hostname: hostname,
          path: path,
          method: method,
          headers: headers
        }, _this.onResponse(resolve, reject));

        if (form) {
          form.pipe(request);
        } else if (method !== 'GET') {
          request.write(data);
        }

        request.on('error', _this.onError(reject));
        request.end();
      });
    }
  }, {
    key: "onError",
    value: function onError(callback) {
      return function (_ref) {
        var error = _ref.error;
        return callback(error);
      };
    }
  }, {
    key: "onResponse",
    value: function onResponse(callback) {
      var rawData = '';

      var onResponseData = function onResponseData(chunk) {
        rawData += chunk;
        console.log(chunk);
      }; // TODO: ESLint: Unexpected literal in error position of callback  node/no-callback-literal


      var onRequestEnd = function onRequestEnd(response) {
        return function () {
          return callback({
            response: response,
            rawData: rawData
          });
        };
      };

      return function (response) {
        response.on('data', onResponseData);
        response.on('end', onRequestEnd(response));
      };
    }
  }]);

  return PrivateRequest;
}();

var _default = PrivateRequest;
exports["default"] = _default;