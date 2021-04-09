"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint new-cap: "warn" */
var ResourceFactory = /*#__PURE__*/function () {
  /**
   * @param resourceClass {RemoteResource}
   */

  /**
   * @param connection {AmoConnection}
   */
  function ResourceFactory(connection) {
    _classCallCheck(this, ResourceFactory);

    var resourceClass = this.constructor.resourceClass;
    /**
     * @param _resource {RemoteResource}
     */

    this._resource = new resourceClass(connection);
  }

  _createClass(ResourceFactory, [{
    key: "create",
    value: function create() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new this.constructor.entityClass(this._resource, attributes);
    }
  }]);

  return ResourceFactory;
}();

_defineProperty(ResourceFactory, "entityClass", void 0);

_defineProperty(ResourceFactory, "resourceClass", void 0);

var _default = ResourceFactory;
exports["default"] = _default;