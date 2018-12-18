import { Metrics } from '@gauf/tracker'
import { SenderInterface } from '@gauf/sender'

export default class SenderConsole implements SenderInterface {
  connect(callback: Function) {
    console.log('connected')
    callback()
  }
  send(metrics: Metrics) {
    console.log(metrics)
  }
  disconnect() {
    console.log('disconnect')
  }
}
