"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LeadFactory = _interopRequireDefault(require("./factories/LeadFactory"));

var _ContactFactory = _interopRequireDefault(require("./factories/ContactFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* TODO:
import CustomerFactory from './factories/CustomerFactory'
import FieldFactory from './factories/FieldFactory'
import NoteFactory from './factories/NoteFactory'
import PipelineFactory from './factories/PipelineFactory'
import TaskFactory from './factories/TaskFactory'
*/
var _default = {
  Lead: _LeadFactory["default"],
  Contact: _ContactFactory["default"]
  /* TODO
  Customer: CustomerFactory,
  Field: FieldFactory,
  Note: NoteFactory,
  Pipeline: PipelineFactory,
  Task: TaskFactory
  */

};
exports["default"] = _default;