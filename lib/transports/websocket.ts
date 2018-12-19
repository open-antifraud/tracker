import { Metrics } from "@gauf/tracker";
import { Callback, Transport } from "@gauf/transport";

export default class TransportWebsocket extends Transport {
  protected connection?: WebSocket;

  public connect(callback: Callback) {
    this.connection = new WebSocket(this.url);
    this.connection.onopen = () => {
      callback();
    };
    this.connection.onerror = console.log; // tslint:disable-line:no-console
  }
  public send(metrics: Metrics): void {
    if (this.connection) {
      this.connection.send(this.pack(metrics));
    }
  }
  public disconnect() {
    if (this.connection) {
      this.connection.close();
    }
  }
}
