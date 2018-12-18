import { Metrics } from '@gauf/tracker'
import { SenderInterface } from '@gauf/sender'

import { packJSON, Packer } from '@gauf/packer';
import SenderHttp from '@gauf/senders/http'
import SenderWebsocket from '@gauf/senders/websocket'
import SenderConsole from '@gauf/senders/console'

export type Settings = {
  url?: string,
  sender?: string
}

export type Callback = Function

export interface TransportInterface {
  connect(callback: Function) : void;
  send(metrics: Metrics) : void;
  disconnect() : void;
}

export class Transport implements TransportInterface {
  protected sender: SenderInterface;

  constructor(url : string, settings: Settings = {}) {
    this.sender = this.createSender(url, settings)
  }

  protected createSender(url: string, settings: Settings) : SenderInterface {
    switch(settings.sender) {
      case 'websocket':
        return new SenderWebsocket(url, packJSON)

      case 'http':
        return new SenderHttp(url, packJSON)

      default:
        return new SenderConsole();
    }
  }

  public connect(callback: Callback) : void {
    this.sender.connect(callback)
  }

  public send(metrics: Metrics) : void {
    this.sender.send(metrics)
  }

  public disconnect() : void {
    this.sender.disconnect()
  }
}
