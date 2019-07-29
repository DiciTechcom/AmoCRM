'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Lead = require('../activeRecords/Lead');

var _Lead2 = _interopRequireDefault(_Lead);

var _LeadResource = require('../resources/LeadResource');

var _LeadResource2 = _interopRequireDefault(_LeadResource);

var _EntityFactory2 = require('../../base/factories/EntityFactory');

var _EntityFactory3 = _interopRequireDefault(_EntityFactory2);

var _Removable = require('../../base/factories/behaviors/Removable');

var _Removable2 = _interopRequireDefault(_Removable);

var _RemovableById = require('../../base/factories/behaviors/RemovableById');

var _RemovableById2 = _interopRequireDefault(_RemovableById);

var _HasFields = require('../../base/factories/behaviors/HasFields');

var _HasFields2 = _interopRequireDefault(_HasFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeadFactory = function (_EntityFactory) {
  _inherits(LeadFactory, _EntityFactory);

  function LeadFactory() {
    _classCallCheck(this, LeadFactory);

    return _possibleConstructorReturn(this, (LeadFactory.__proto__ || Object.getPrototypeOf(LeadFactory)).apply(this, arguments));
  }

  return LeadFactory;
}(_EntityFactory3.default);

LeadFactory.activeRecordClass = _Lead2.default;
LeadFactory.resourceClass = _LeadResource2.default;
LeadFactory.behaviors = [].concat(_toConsumableArray(_EntityFactory3.default.behaviors), [new _Removable2.default(), new _RemovableById2.default(), new _HasFields2.default()]);
exports.default = LeadFactory;