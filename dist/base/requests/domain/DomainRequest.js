"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = require("events");

var _promiseQueue = _interopRequireDefault(require("promise-queue"));

var _qs = _interopRequireDefault(require("qs"));

var _HTTPRequest = _interopRequireDefault(require("../common/HTTPRequest"));

var _DomainResponseHandler = _interopRequireDefault(require("../../responseHandlers/DomainResponseHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: использовать axios
var DomainRequest = /*#__PURE__*/function (_EventEmitter) {
  _inherits(DomainRequest, _EventEmitter);

  var _super = _createSuper(DomainRequest);

  function DomainRequest(domain) {
    var _this;

    _classCallCheck(this, DomainRequest);

    if (!domain) {
      throw new Error('Portal domain must be set!');
    }

    _this = _super.call(this);
    _this._queue = new _promiseQueue["default"](1);
    _this._cookies = [];
    _this._hostname = domain.includes('.') ? domain : "".concat(domain, ".amocrm.ru");
    return _this;
  }

  _createClass(DomainRequest, [{
    key: "clear",
    value: function clear() {
      this._cookies = [];
    }
  }, {
    key: "post",
    value: function post(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(url, data, 'POST', options);
    }
  }, {
    key: "get",
    value: function get(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request(url, data, 'GET', options);
    }
  }, {
    key: "expires",
    get: function get() {
      return this._expires;
    }
  }, {
    key: "request",
    value: function request(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var encodedData = this.encodeData(url, data, method, options);
      var headers = this.getRequestHeaders(url, encodedData, method, options);
      var request = this.createRequest(url, encodedData, method, headers);
      return this.addRequestToQueue(request, options.response);
    }
  }, {
    key: "addRequestToQueue",
    value: function addRequestToQueue(request, options) {
      var _this2 = this;

      return this._queue.add(function () {
        return request.send().then(function (response) {
          return _this2.handleResponse(response, options);
        });
      });
    }
  }, {
    key: "encodeData",
    value: function encodeData(url) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var isGET = method === 'GET';
      return isGET ? _qs["default"].stringify(data) : JSON.stringify(data);
    }
  }, {
    key: "getDefaultHeaders",
    value: function getDefaultHeaders(options) {
      var withToken = options.withToken !== false;
      var isJSON = options.json !== false;
      var headers = {};

      if (withToken && this._token) {
        headers.Authorization = "Bearer ".concat(this._token.access_token);
      } else if (!withToken) {
        headers.Cookie = this._cookies.join();
      }

      if (isJSON && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
      }

      return Object.assign({}, options.headers, headers);
    }
  }, {
    key: "getRequestHeaders",
    value: function getRequestHeaders(url) {
      var encodedData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var isGET = method === 'GET';
      var headers = this.getDefaultHeaders(options);

      if (!isGET && encodedData) {
        headers['Content-Length'] = Buffer.byteLength(encodedData);
      }

      return headers;
    }
    /**
     * @param {Object} token
     */

  }, {
    key: "setToken",
    value: function setToken(token) {
      this._token = token;

      if (!token) {
        delete this._expires;
        return;
      }

      if (!token.expires_at) {
        var now = new Date();
        this._expires = now;
        return;
      }

      this._expires = new Date(token.expires_at);
    }
  }, {
    key: "getToken",
    value: function getToken() {
      return this._token;
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(_ref) {
      var rawData = _ref.rawData,
          response = _ref.response;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var responseHandlerClass = this.constructor.responseHandlerClass;
      var handler = new responseHandlerClass(rawData, response);
      return handler.toJSON(options);
    }
  }, {
    key: "createRequest",
    value: function createRequest(url) {
      var encodedData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
      var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var isGET = method === 'GET';
      var path = isGET ? "".concat(url, "?").concat(encodedData) : url;
      return new _HTTPRequest["default"]({
        path: path,
        hostname: this._hostname,
        headers: headers,
        method: method,
        data: encodedData,
        secure: true
      });
    }
  }]);

  return DomainRequest;
}(_events.EventEmitter);

_defineProperty(DomainRequest, "responseHandlerClass", _DomainResponseHandler["default"]);

_defineProperty(DomainRequest, "DEFAULT_USER_AGENT", 'amoCRM-API-client/1.0');

var _default = DomainRequest;
exports["default"] = _default;