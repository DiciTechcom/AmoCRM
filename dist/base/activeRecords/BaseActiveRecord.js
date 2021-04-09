"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseActiveRecord = /*#__PURE__*/function () {
  /**
   * @param resource {RemovableEntityResource}
   * @param attributes {object}
   */
  function BaseActiveRecord(resource) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BaseActiveRecord);

    this._resource = resource;
    this._attributes = Object.assign({}, attributes);
    this._isRemoved = false;
  }

  _createClass(BaseActiveRecord, [{
    key: "attributes",
    get: function get() {
      return this._attributes;
    },
    set: function set(attributes) {
      this._attributes = attributes;
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(attribute) {
      delete this._attributes[attribute];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(attribute, value) {
      this._attributes[attribute] = value;
      return this;
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(attribute) {
      return Object.prototype.hasOwnProperty.call(this._attributes, attribute);
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(attribute) {
      return this._attributes[attribute];
    }
  }, {
    key: "isNew",
    value: function isNew() {
      return this._attributes.id === undefined;
    }
  }, {
    key: "isRemoved",
    value: function isRemoved() {
      return this._isRemoved;
    }
  }]);

  return BaseActiveRecord;
}();

var _default = BaseActiveRecord;
exports["default"] = _default;