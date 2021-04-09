"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _events = require("events");

var _qs = _interopRequireDefault(require("qs"));

var _v = _interopRequireDefault(require("../routes/v4"));

var _PrivateDomainRequest = _interopRequireDefault(require("./requests/domain/PrivateDomainRequest"));

var _AuthServer = _interopRequireDefault(require("./auth/AuthServer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var AmoConnection = /*#__PURE__*/function (_EventEmitter) {
  _inherits(AmoConnection, _EventEmitter);

  var _super = _createSuper(AmoConnection);

  function AmoConnection() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AmoConnection);

    _this = _super.call(this);
    _this._request = new _PrivateDomainRequest["default"](options.domain);
    _this._options = _objectSpread({}, options.auth);
    _this._isConnected = false;
    _this._code = _this._options.code;
    return _this;
  }

  _createClass(AmoConnection, [{
    key: "connected",
    get: function get() {
      return this._isConnected;
    }
  }, {
    key: "connectIfNeeded",
    value: function connectIfNeeded() {
      if (!this._isConnected) {
        return this.connect();
      }

      this.emit(AmoConnection.EVENTS.CHECK_TOKEN, true);

      if (this.isRequestExpired()) {
        return this.refreshToken();
      }

      return Promise.resolve();
    }
  }, {
    key: "isRequestExpired",
    value: function isRequestExpired() {
      if (!this.getToken()) {
        return false;
      }

      var now = new Date();
      return this._request.expires && now > this._request.expires;
    }
  }, {
    key: "request",
    value: function request() {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.connectIfNeeded().then(function () {
        var _this2$_request;

        _this2._lastRequestAt = new Date();
        return (_this2$_request = _this2._request).request.apply(_this2$_request, args);
      });
    }
  }, {
    key: "setToken",
    value: function setToken(token) {
      this._request.setToken(token);

      this._isConnected = !this.isRequestExpired();
      return this;
    }
  }, {
    key: "setCode",
    value: function setCode(code) {
      this._code = code;
      return this.connect();
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this._state = state;
      return this;
    }
  }, {
    key: "getState",
    value: function getState(state) {
      return this._state;
    }
  }, {
    key: "getAuthUrl",
    value: function getAuthUrl() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'popup';
      var baseUrl = 'https://www.amocrm.ru/oauth';
      var client_id = this._options.client_id;
      var params = {
        client_id: client_id,
        mode: mode
      };
      var state = this.getState();

      if (state) {
        params.state = state;
      }

      var paramsStr = _qs["default"].stringify(params);

      var url = "".concat(baseUrl, "?").concat(paramsStr);
      return url;
    }
  }, {
    key: "getToken",
    value: function getToken() {
      return this._request.getToken();
    }
  }, {
    key: "fetchToken",
    value: function fetchToken() {
      var _this3 = this;

      this.emit(AmoConnection.EVENTS.BEFORE_FETCH_TOKEN, this);
      var _this$_options = this._options,
          client_id = _this$_options.client_id,
          client_secret = _this$_options.client_secret,
          redirect_uri = _this$_options.redirect_uri;
      var data = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        code: this._code,
        grant_type: 'authorization_code'
      };
      return this._request.post(_v["default"].auth.token, data).then(function (response) {
        _this3.handleToken(response);

        return response;
      });
    }
  }, {
    key: "refreshToken",
    value: function refreshToken() {
      var _this4 = this;

      this.emit(this.BEFORE_REFRESH_TOKEN, this);
      var _this$_options2 = this._options,
          client_id = _this$_options2.client_id,
          client_secret = _this$_options2.client_secret,
          redirect_uri = _this$_options2.redirect_uri;
      var token = this.getToken();

      if (!token) {
        return Promise.reject(new Error('No token'));
      }

      var refresh_token = token.refresh_token;
      var data = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      };
      return this._request.post(_v["default"].auth.token, data).then(function (response) {
        _this4.handleToken(response);

        return response;
      });
    }
  }, {
    key: "handleToken",
    value: function handleToken(response) {
      var token = response.data;

      if (!token.token_type) {
        return;
      }

      if (!token.expires_at) {
        var headers = response.info.headers;
        var responseAt = new Date(headers.date);
        var responseTimestamp = responseAt.getTime();
        var expiresIn = token.expires_in * 1000;
        token.expires_at = responseTimestamp + expiresIn;
      }

      var event = _objectSpread(_objectSpread({}, response), {}, {
        data: token
      });

      this.emit(AmoConnection.EVENTS.NEW_TOKEN, event);
      this.setToken(token);
    }
  }, {
    key: "waitUserAction",
    value: function waitUserAction() {
      var _this5 = this;

      if (this._server) {
        return Promise.resolve();
      }

      var options = _objectSpread(_objectSpread({}, this._options.server), {}, {
        state: this.getState()
      });

      var server = new _AuthServer["default"](options);
      this._server = server;
      var handleCode = new Promise(function (resolve) {
        server.on('code', function (event) {
          var code = event.code;
          resolve(code);
        });
        server.run();
      });
      return handleCode.then(function (code) {
        server.stop();
        return code;
      }).then(function (code) {
        _this5._server = null;
        return _this5.setCode(code);
      });
    }
  }, {
    key: "connect",
    value: function connect() {
      var _this6 = this;

      if (this._isConnected) {
        return Promise.resolve(true);
      }

      this.emit(AmoConnection.EVENTS.BEFORE_CONNECT, this);
      this._lastConnectionRequestAt = new Date();

      if (!this._code && this._options.server) {
        return this.waitUserAction();
      } else if (this.getToken() && this.isRequestExpired()) {
        return this.refreshToken();
      } else if (!this._code && !this.getToken()) {
        return Promise.resolve(false);
      }

      return this.fetchToken().then(function (response) {
        var _response$data = response.data,
            data = _response$data === void 0 ? {} : _response$data;

        if (data && data.token_type) {
          _this6._lastRequestAt = new Date();

          _this6.emit(AmoConnection.EVENTS.CONNECTED, _this6);

          _this6._isConnected = true;
          return Promise.resolve(true);
        }

        var e = new Error('Auth Error');
        e.data = data;

        _this6.emit(AmoConnection.EVENTS.AUTH_ERROR, e, _this6);

        _this6.emit(AmoConnection.EVENTS.ERROR, e, _this6);

        return Promise.reject(e);
      });
    }
  }]);

  return AmoConnection;
}(_events.EventEmitter);

_defineProperty(AmoConnection, "EVENTS", {
  BEFORE_CONNECT: 'beforeConnect',
  BEFORE_FETCH_TOKEN: 'beforeFetchToken',
  BEFORE_REFRESH_TOKEN: 'beforeRefreshToken',
  NEW_TOKEN: 'newToken',
  CHECK_TOKEN: 'checkToken',
  AUTH_ERROR: 'authError',
  CONNECTED: 'connected',
  ERROR: 'error'
});

module.exports = AmoConnection;