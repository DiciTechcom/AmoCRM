"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _events = require("events");

var _AmoConnection = _interopRequireDefault(require("./base/AmoConnection"));

var _ResourceFactoryBuilder = _interopRequireDefault(require("./base/ResourceFactoryBuilder"));

var _ConnectionRequest = _interopRequireDefault(require("./base/requests/ConnectionRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var AmoCRM = /*#__PURE__*/function (_EventEmitter) {
  _inherits(AmoCRM, _EventEmitter);

  var _super = _createSuper(AmoCRM);

  function AmoCRM(options) {
    var _this;

    _classCallCheck(this, AmoCRM);

    _this = _super.call(this);

    if (!options) {
      throw new Error('Wrong configuration');
    }

    options = Object.assign({
      auth: {}
    }, options);
    _this._options = options;
    _this._connection = new _AmoConnection["default"](options);
    _this.request = new _ConnectionRequest["default"](_this._connection);

    _this._registerEvents();

    _this.assignFactories();

    return _this;
  }

  _createClass(AmoCRM, [{
    key: "_registerEvents",
    value: function _registerEvents() {
      var _this2 = this;

      var self = this;

      var _loop = function _loop(key) {
        var event = _AmoConnection["default"].EVENTS[key];

        _this2._connection.on(event, function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          self.emit.apply(self, ["connection:".concat(event)].concat(args));
        });
      };

      for (var key in _AmoConnection["default"].EVENTS) {
        _loop(key);
      }

      this._connection.on('error', function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return self.emit.apply(self, ['error'].concat(args));
      });
    }
    /**
     * Удаление обработчиков (слушателей) событий
     *
     * @param {...(string|string[])} args Название одного или нескольких событий, через запятую или массивом строк
     * @returns {AmoCRM} Возвращает экземпляр класса AmoCRM, наследующий EventEmitter
     * @example
     * off('error')
     * off('error', 'connection:newToken')
     * off(['error', 'connection:newToken'])
     */

  }, {
    key: "off",
    value: function off() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      // если не предоставлены аргументы: отключаем всех слушатаелей для всех событий
      if (arguments.length === 0) {
        this.removeAllListeners();
      } // проходим по каждому элементу массива, проверяя тип на строку и отключаем всех слушателей для заданного события


      args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments;

      var _iterator = _createForOfIteratorHelper(args),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var event = _step.value;
          if (typeof event !== 'string') continue;
          this.removeAllListeners(event);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this;
    }
  }, {
    key: "assignFactories",
    value: function assignFactories() {
      var builder = new _ResourceFactoryBuilder["default"](this._connection);
      var factories = builder.getResourceFactories();
      Object.assign(this, factories);
    }
  }, {
    key: "connection",
    get: function get() {
      return this._connection;
    }
  }, {
    key: "connect",
    value: function connect() {
      return this._connection.connect();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      return this._connection.disconnect();
    }
  }]);

  return AmoCRM;
}(_events.EventEmitter);

module.exports = AmoCRM;