"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ConnectionRequest = function ConnectionRequest(connection) {
  var handler = function handler(method, url, data, options) {
    return request({
      url: url,
      data: data,
      method: method,
      options: options,
      connection: connection
    });
  };

  var requestWithMethod = function requestWithMethod(method) {
    return handler.bind(null, method);
  };

  var get = requestWithMethod('GET');
  var post = requestWithMethod('POST');
  var patch = requestWithMethod('PATCH');
  Object.assign(handler, {
    get: get,
    post: post,
    patch: patch
  });
  return handler;
};

var request = function request(params) {
  var connection = params.connection,
      method = params.method,
      url = params.url,
      _params$options = params.options,
      options = _params$options === void 0 ? {} : _params$options,
      data = params.data;
  return connection.request(url, data, method, options);
};

var _default = ConnectionRequest;
exports["default"] = _default;