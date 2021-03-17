const ConnectionRequest = function(connection) {
  const handler = (method, url, data, options) => {
    return request({
      url,
      data,
      method,
      options,
      connection,
    })
  }
  const requestWithMethod = method => handler.bind(null, method)
  const get = requestWithMethod('GET')
  const post = requestWithMethod('POST')
  const patch = requestWithMethod('PATCH')

  Object.assign(handler, {
    get,
    post,
    patch,
  })

  return handler
}

const request = params => {
  const {
    connection,
    method,
    url,
    options = {},
    data,
  } = params
  return connection.request(url, data, method, options)
}

export default ConnectionRequest
