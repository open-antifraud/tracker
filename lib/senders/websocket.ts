import { Metrics } from '@gauf/tracker'
import { Packer } from '@gauf/packer';
import { SenderInterface } from '@gauf/sender';

export default class SenderWebsocket implements SenderInterface {
  protected url: string;
  protected packer: Packer;
  protected connection?: WebSocket;

  constructor(url: string, packer: Packer) {
    this.url = url
    this.packer = packer
  }

  connect(callback: Function) {
    this.connection = new WebSocket(this.url)
    this.connection.onopen = function(event: Event) : any {
      callback()
    }
    this.connection.onerror = console.log
  }
  send(metrics: Metrics) : void {
    if (this.connection) {
      this.connection.send(this.packer(metrics))
    }
  }
  disconnect() {
    if (this.connection) {
      this.connection.close();
    }
  }
}
