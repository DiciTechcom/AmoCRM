"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _factories = _interopRequireDefault(require("../api/factories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResourceFactoryBuilder = /*#__PURE__*/function () {
  function ResourceFactoryBuilder(connection) {
    _classCallCheck(this, ResourceFactoryBuilder);

    this._connection = connection;
  }

  _createClass(ResourceFactoryBuilder, [{
    key: "getResourceFactories",
    value: function getResourceFactories() {
      var _this = this;

      return Object.keys(_factories["default"]).reduce(function (target, factoryName) {
        target[factoryName] = _this.createResourceFactory(factoryName);
        return target;
      }, {});
    }
  }, {
    key: "createResourceFactory",
    value: function createResourceFactory(name) {
      var factory = new this.constructor.factories[name](this._connection);
      var handler = this.createFactoryHandler(factory);

      var constructor = function constructor() {};

      return new Proxy(constructor, handler);
    }
  }, {
    key: "createFactoryHandler",
    value: function createFactoryHandler(factory) {
      return {
        /**
         * @param target {EntityFactory}
         * @param attributes {object}
         */
        construct: function construct(target, attributes) {
          return factory.create.apply(factory, _toConsumableArray(attributes));
        },
        get: function get(target, attribute) {
          return factory[attribute];
        }
      };
    }
  }]);

  return ResourceFactoryBuilder;
}();

_defineProperty(ResourceFactoryBuilder, "factories", _factories["default"]);

var _default = ResourceFactoryBuilder;
exports["default"] = _default;