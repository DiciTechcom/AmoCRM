import { EventEmitter } from 'events'
import AmoConnection from './base/AmoConnection'
import ResourceFactoryBuilder from './base/ResourceFactoryBuilder'
import ConnectionRequest from './base/requests/ConnectionRequest'

class AmoCRM extends EventEmitter {
  constructor(options) {
    super()
    if (!options) {
      throw new Error('Wrong configuration')
    }

    options = Object.assign({
      auth: {},
    }, options)

    this._options = options
    this._connection = new AmoConnection(options)

    this.request = new ConnectionRequest(this._connection)
    this._registerEvents()
    this.assignFactories()
  }

  _registerEvents() {
    const self = this
    for (const key in AmoConnection.EVENTS) {
      const event = AmoConnection.EVENTS[key]
      this._connection.on(event, (...args) => {
        self.emit(`connection:${event}`, ...args)
      })
    }
    this._connection.on('error', (...args) => self.emit('error', ...args))
  }

  /**
   * Удаление обработчиков (слушателей) событий
   *
   * @param {...(string|string[])} args Название одного или нескольких событий, через запятую или массивом строк
   * @returns {AmoCRM} Возвращает экземпляр класса AmoCRM, наследующий EventEmitter
   * @example
   * off('error')
   * off('error', 'connection:newToken')
   * off(['error', 'connection:newToken'])
   */
  off(...args) {
    // если не предоставлены аргументы: отключаем всех слушатаелей для всех событий
    if (arguments.length === 0) {
      this.removeAllListeners()
    }
    // проходим по каждому элементу массива, проверяя тип на строку и отключаем всех слушателей для заданного события
    args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments
    for (const event of args) {
      if (typeof event !== 'string') continue
      this.removeAllListeners(event)
    }
    return this
  }

  assignFactories() {
    const builder = new ResourceFactoryBuilder(this._connection)
    const factories = builder.getResourceFactories()
    Object.assign(this, factories)
  }

  get connection() {
    return this._connection
  }

  connect() {
    return this._connection.connect()
  }

  disconnect() {
    return this._connection.disconnect()
  }
}

module.exports = AmoCRM
