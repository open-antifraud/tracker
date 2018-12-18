import { Callback, SenderInterface } from "@gauf/sender";
import { Metrics } from "@gauf/tracker";

import { Packer, packJSON } from "@gauf/packer";
import SenderConsole from "@gauf/senders/console";
import SenderHttp from "@gauf/senders/http";
import SenderWebsocket from "@gauf/senders/websocket";

export type Settings = {
  sender?: string;
};

export type TransportInterface = {
  connect(callback: Callback): void;
  send(metrics: Metrics): void;
  disconnect(): void;
};

export class Transport implements TransportInterface {
  protected sender: SenderInterface;

  constructor(url: string, settings: Settings = {}) {
    this.sender = this.createSender(url, settings);
  }

  public connect(callback: Callback): void {
    this.sender.connect(callback);
  }

  public send(metrics: Metrics): void {
    this.sender.send(metrics);
  }

  public disconnect(): void {
    this.sender.disconnect();
  }

  protected createSender(url: string, settings: Settings): SenderInterface {
    switch (settings.sender) {
      case "websocket":
        return new SenderWebsocket(url, packJSON);

      case "http":
        return new SenderHttp(url, packJSON);

      default:
        return new SenderConsole();
    }
  }
}
