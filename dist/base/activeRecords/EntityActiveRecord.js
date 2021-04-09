"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BaseActiveRecord = _interopRequireDefault(require("./BaseActiveRecord"));

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

var EntityActiveRecord = /*#__PURE__*/function (_ActiveRecord) {
  _inherits(EntityActiveRecord, _ActiveRecord);

  var _super = _createSuper(EntityActiveRecord);

  function EntityActiveRecord() {
    _classCallCheck(this, EntityActiveRecord);

    return _super.apply(this, arguments);
  }

  _createClass(EntityActiveRecord, [{
    key: "save",
    value: function save() {
      return this.isNew() ? this.insert() : this.update();
    }
  }, {
    key: "fetch",
    value: function fetch() {
      var _this = this;

      if (this.isNew()) {
        throw new Error('EntityActiveRecord must exists for using EntityActiveRecord.fetch()!');
      }

      if (this.isRemoved()) {
        throw new Error('You cannot fetch deleted resource!');
      }

      return this._resource.findById(this._attributes.id).then(function (response) {
        _this._attributes = response.getFirstItem();
        return _this;
      });
    }
  }, {
    key: "insert",
    value: function insert() {
      var _this2 = this;

      return this._resource.insert([this._attributes]).then(function (response) {
        var attributes = response.getFirstItem();
        _this2._attributes.id = attributes.id;
        return _this2;
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      return this._resource.update([this._attributes]).then(function () {
        return _this3;
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var _this4 = this;

      return this._resource.remove([this._attributes.id]).then(function () {
        _this4._isRemoved = true;
        return _this4;
      });
    }
  }]);

  return EntityActiveRecord;
}(_BaseActiveRecord["default"]);

var _default = EntityActiveRecord;
exports["default"] = _default;