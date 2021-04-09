"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EntityHandler = /*#__PURE__*/function () {
  /**
   * @param entity {EntityActiveRecord}
   */
  function EntityHandler(entity) {
    _classCallCheck(this, EntityHandler);

    this._entity = entity;
  }

  _createClass(EntityHandler, [{
    key: "get",
    value: function get(target, name) {
      if (this._entity[name]) {
        return this._entity[name];
      }

      if (this._entity.hasAttribute(name)) {
        return this._entity.getAttribute(name);
      }
    }
  }, {
    key: "set",
    value: function set(target, name, value) {
      if (this._entity[name]) {
        this._entity[name] = value;
        return true;
      }

      var result = this._entity.setAttribute(name, value);

      return Boolean(result);
    }
  }]);

  return EntityHandler;
}();

var _default = EntityHandler;
exports["default"] = _default;