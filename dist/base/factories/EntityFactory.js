"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ResourceFactory2 = _interopRequireDefault(require("./ResourceFactory"));

var _EntityProxyHandler = _interopRequireDefault(require("../EntityProxyHandler"));

var _EntityTarget = _interopRequireDefault(require("../EntityTarget"));

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

var EntityFactory = /*#__PURE__*/function (_ResourceFactory) {
  _inherits(EntityFactory, _ResourceFactory);

  var _super = _createSuper(EntityFactory);

  function EntityFactory() {
    _classCallCheck(this, EntityFactory);

    return _super.apply(this, arguments);
  }

  _createClass(EntityFactory, [{
    key: "create",
    value: function create() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$constructor = this.constructor,
          entityClass = _this$constructor.entityClass,
          entityHandlerClass = _this$constructor.entityHandlerClass,
          entityTargetClass = _this$constructor.entityTargetClass;
      var entity = new entityClass(this._resource, attributes);
      var handler = new entityHandlerClass(entity);
      return new Proxy(new entityTargetClass(entityClass.name), handler);
    }
  }, {
    key: "of",
    value: function of() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.create(attributes);
    }
  }, {
    key: "findById",
    value: function findById(id) {
      var _this = this;

      return this._resource.findById(id).then(function (response) {
        var attributes = response.getFirstItem();
        return _this.create(attributes);
      });
    }
  }, {
    key: "find",
    value: function find(query) {
      var _this2 = this;

      return this._resource.find(query).then(function (response) {
        var items = response.getItems();
        return items.map(function (attributes) {
          return _this2.create(attributes);
        });
      });
    }
  }, {
    key: "insert",
    value: function insert(data) {
      return this._resource.insert(data);
    }
  }, {
    key: "update",
    value: function update(data) {
      return this._resource.update(data);
    }
  }, {
    key: "remove",
    value: function remove(data) {
      return this._resource.remove(data);
    }
  }]);

  return EntityFactory;
}(_ResourceFactory2["default"]);

_defineProperty(EntityFactory, "entityHandlerClass", _EntityProxyHandler["default"]);

_defineProperty(EntityFactory, "entityTargetClass", _EntityTarget["default"]);

var _default = EntityFactory;
exports["default"] = _default;