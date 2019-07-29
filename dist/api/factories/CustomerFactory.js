'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Customer = require('../activeRecords/Customer');

var _Customer2 = _interopRequireDefault(_Customer);

var _CustomerResource = require('../resources/CustomerResource');

var _CustomerResource2 = _interopRequireDefault(_CustomerResource);

var _HasFields = require('../../base/factories/behaviors/HasFields');

var _HasFields2 = _interopRequireDefault(_HasFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerFactory = function (_EntityFactory) {
  _inherits(CustomerFactory, _EntityFactory);

  function CustomerFactory() {
    _classCallCheck(this, CustomerFactory);

    return _possibleConstructorReturn(this, (CustomerFactory.__proto__ || Object.getPrototypeOf(CustomerFactory)).apply(this, arguments));
  }

  return CustomerFactory;
}(_EntityFactory3.default);

CustomerFactory.activeRecordClass = _Customer2.default;
CustomerFactory.resourceClass = _CustomerResource2.default;
CustomerFactory.behaviors = [].concat(_toConsumableArray(_EntityFactory3.default.behaviors), [new _HasFields2.default()]);
exports.default = CustomerFactory;