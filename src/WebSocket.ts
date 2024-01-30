/**
 * WebsocketHeartBeat
 * @author cc
 * @description 支持心跳和重连功能的websocket
 */
import { createworker, stopWorker } from './.internal/worker'
import { throttle } from './throttle'

export class WebsocketHeartBeat { // 心跳重连Websocket
  instance: WebSocket | null // websocket实例

  heartBeat: Worker // 心跳实例
  heartBeatFn: Function // 心跳方法
  heartBeatContent = 'ping' // 心跳内容
  heartBeatInterval = 10000 // 10s一次心跳

  pongTimeout = 8000 // 发送ping之后，未收到消息超时时间，默认 8000 毫秒
  pongTimeoutId: NodeJS.Timeout

  reconnectTimeout = 10000 // 10s一次重连
  reconnectTimeoutId: NodeJS.Timeout

  reconnectLimit = 10 // 最大重连次数
  reconnectCount = 0 // 重连次数

  dontReconnect = false // 用户下班下线/组件销毁beforeDestroy，设为true

  networkError = false // 网络连接断开
  openError = false // 新建连接失败

  url = ''
  config: { open?, message?, error?, close?, beforeunload?, heartBeat?, reconnect?, key? } = {}
  protocols = []

  logkey: any
  onbeforeunload: any

  constructor(url, config = {}, protocols = []) {
    this.url = url
    this.config = config
    this.protocols = protocols
    try {
      this.init(url, config, protocols)
    } catch (err) {
      this.openError = true
    }
  }

  init(url = this.url, config = this.config, protocols = this.protocols) {
    const {
      open, message, error, close, beforeunload,
      heartBeat = {}, reconnect = {}, key = ''
    } = config;
    this.instance = new WebSocket(url, protocols)
    this.logkey = key
    this.print(`new`, url, heartBeat, reconnect)
    /* 心跳配置 */
    if (heartBeat?.interval) this.heartBeatInterval = heartBeat.interval
    if (heartBeat?.content) this.heartBeatContent = heartBeat.interval
    if (heartBeat?.fn) this.heartBeatFn = heartBeat.fn
    /* 原生事件 */
    this.instance.onopen = (e) => {
      this.dontReconnect = false
      this.print(`open`)
      this.stopHeartBeat()
      this.startHeartBeat()
      open && open(e)
    }
    this.instance.onmessage = (e) => {
      if(this.logkey) console.log(`[output:ws]${this.logkey} message %c ${e.data}`, 'color:#0f0;')
      let { data } = e
      let whiteList = ['pong', 'logout', 'kickedOut'] // 非事件对象
      if (typeof data === 'string' && !whiteList.includes(data)) {
        try {
          data = JSON.parse(data)
        } catch (err) {
          console.warn(err)
        }
      }
      message && message(data)
      // 如果获取到消息，说明连接是正常的，重置心跳检测
      this.stopHeartBeat()
      this.startHeartBeat()
    }
    this.instance.onclose = (e) => {
      this.print(`close`)
      close && close(e)
      this.tReconnect()
      // 当websocket断开的时候检查是否有网络问题
      if (!window.navigator.onLine) {
        this.networkError = true
      }
    }
    this.instance.onerror = (e) => {
      this.print(`error`)
      error && error(e)
      this.tReconnect()
    }
    if(beforeunload) this.onbeforeunload = beforeunload
  }

  startHeartBeat() { // 开始心跳
    this.checkNetwork() // 检测网络状况
    let heartBeatFn = () => { // 默认
      if (this.dontReconnect) return // 重连关闭 则心跳暂停
      if (this.instance?.readyState == 1) {
        if (this.logkey) console.log(`[output:ws]${this.logkey} heartbeat %c ${this.heartBeatContent}`, 'color:#0ff;')
        // 收发消息
        if (this.heartBeatFn) { // 自定义心跳方法
          this.heartBeatFn()
        } else { // 默认方法
          this.instance.send(this.heartBeatContent)
        }
        // 连接未断开，但后端不返回pong的情况
        this.pongTimeoutId = setTimeout(() => {
          this.print('pongTimeout')
          this.instance?.close() // 手动断开，触发断线重连
        }, this.pongTimeout)
      } else {
        this.print('error', '断开状态，尝试重连', this.instance)
        this.tReconnect()
      }
    }
    this.heartBeat = createworker(heartBeatFn.bind(this), this.heartBeatInterval)
  }

  stopHeartBeat() { // 停止心跳
    clearTimeout(this.pongTimeoutId)
    stopWorker(this.heartBeat)
  }

  reconnect() { // 重连
    if (this.dontReconnect) return
    if (this.instance?.readyState == 1) return // 连接正常则无需重连
    this.checkNetwork() // 检测网络状况
    this.stopHeartBeat()
    clearTimeout(this.reconnectTimeoutId)
    this.reconnectCount++
    if (this.reconnectCount < this.reconnectLimit) {
      this.reconnectTimeoutId = setTimeout(() => {
        clearTimeout(this.reconnectTimeoutId)
        this.reInit()
      }, this.reconnectTimeout)
    } else if (this.reconnectCount >= this.reconnectLimit) {
      this.stopReconnect()
      // ELEMENT.MessageBox('服务异常，请联系管理员', '温馨提示')
      console.error('服务异常，请联系管理员!!!')
    }
  }

  tReconnect = throttle(this.reconnect, 1000, { leading: true, trailing: false })

  stopReconnect() { // 停止重连
    this.dontReconnect = true
    clearTimeout(this.reconnectTimeoutId)
  }

  kill() { // 停止所有行为并清空websocket实例
    this.print('kill')
    this.stopReconnect()
    this.stopHeartBeat()
    this.instance?.close()
    this.instance = null
  }

  reInit(url?) {
    this.kill()
    this.init(url)
  }

  checkNetwork() { // 检查网络连接
    if (this.networkError == true) {
      if (window.navigator.onLine == true) {
        this.networkError = false
      }
    }
  }

  print(...args) {
    if (this.logkey) console.log(`[output:ws]${this.logkey}`, ...args)
  }

}
