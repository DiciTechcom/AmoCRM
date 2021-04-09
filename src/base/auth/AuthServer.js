import { EventEmitter } from 'events'
import http from 'http'
import url from 'url'

class AuthServer extends EventEmitter {
  constructor(options) {
    super()
    this._options = options
  }

  run() {
    const { port } = this._options
    const handler = this.handle.bind(this)
    const onListenStart = this.onListenStart.bind(this)
    this._server = http
      .createServer(handler)
      .listen(port, onListenStart)
  }

  onListenStart() {
    // const { port } = this._options;
    // console.log( `listening on port ${port}` );
  }

  stop() {
    return new Promise((resolve, reject) => this._server.close()
      .on('close', resolve)
      .on('error', reject),
    )
  }

  handle(request, response) {
    const _url = new url.URL(request.url)
    const currentState = this._options.state
    const { code, state } = _url.searchParams
    response.end()
    if (!code) {
      return
    }
    if (currentState && state !== currentState) {
      return
    }
    this.emit('code', {
      code,
      state,
    })
  }
}

export default AuthServer
