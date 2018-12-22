import { PackerWebsocket } from "@gauf/packer";
import { Metrics, Payload } from "@gauf/tracker";
import { Callback, Transport } from "@gauf/transport";

export default class TransportWebsocket extends Transport {
  protected connection?: WebSocket;

  constructor(url: string, packer: PackerWebsocket) {
    super(url, packer);
    this.packer = packer;
  }

  public connect(callback: Callback) {
    this.connection = new WebSocket(this.url);
    this.connection.onopen = () => {
      callback();
    };
    this.connection.onerror = console.error;  // tslint:disable-line:no-console
  }
  public send(metrics: Metrics, payload?: Payload): void {
    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      this.connection.send(this.packer(metrics, payload));
    }
  }
  public disconnect() {
    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      this.connection.close();
    }
  }
}
