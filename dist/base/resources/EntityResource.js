"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RemoteResource2 = _interopRequireDefault(require("./RemoteResource"));

var _EntityResponseHandler = _interopRequireDefault(require("../responseHandlers/EntityResponseHandler"));

var _v = _interopRequireDefault(require("../../routes/v2"));

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

var EntityResource = /*#__PURE__*/function (_RemoteResource) {
  _inherits(EntityResource, _RemoteResource);

  var _super = _createSuper(EntityResource);

  function EntityResource() {
    _classCallCheck(this, EntityResource);

    return _super.apply(this, arguments);
  }

  _createClass(EntityResource, [{
    key: "findById",
    value: function findById(id) {
      return this.find({
        id: id
      });
    }
  }, {
    key: "find",
    value: function find() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$constructor = this.constructor,
          path = _this$constructor.path,
          getPath = _this$constructor.getPath;
      return this.request('GET', getPath || path, query);
    }
  }, {
    key: "insert",
    value: function insert() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _this$constructor2 = this.constructor,
          insertPath = _this$constructor2.insertPath,
          path = _this$constructor2.path;
      return this.request('POST', insertPath || path, {
        add: data
      });
    }
  }, {
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _this$constructor3 = this.constructor,
          path = _this$constructor3.path,
          updatePath = _this$constructor3.updatePath;
      return this.request('POST', updatePath || path, {
        update: data
      });
    }
  }, {
    key: "multiactions",
    value: function multiactions(ids) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var multiaction_type = arguments.length > 2 ? arguments[2] : undefined;
      var _this$constructor4 = this.constructor,
          multiactionsPath = _this$constructor4.multiactionsPath,
          ENTITY_TYPE = _this$constructor4.ENTITY_TYPE;
      return this.request('POST', multiactionsPath, {
        request: {
          multiactions: {
            add: [{
              entity_type: ENTITY_TYPE,
              multiaction_type: multiaction_type,
              data: data,
              ids: ids
            }]
          }
        }
      }, {
        formData: true
      });
    }
  }]);

  return EntityResource;
}(_RemoteResource2["default"]);

_defineProperty(EntityResource, "path", void 0);

_defineProperty(EntityResource, "getPath", void 0);

_defineProperty(EntityResource, "insertPath", void 0);

_defineProperty(EntityResource, "updatePath", void 0);

_defineProperty(EntityResource, "multiactionsPath", _v["default"].multiactions);

_defineProperty(EntityResource, "responseHandlerClass", _EntityResponseHandler["default"]);

_defineProperty(EntityResource, "ENTITY_TYPE", void 0);

_defineProperty(EntityResource, "DELETE_MULTIACTION_TYPE", 4);

var _default = EntityResource;
exports["default"] = _default;