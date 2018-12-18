import { Packer } from "@gauf/packer";
import { Callback, SenderInterface } from "@gauf/sender";
import { Metrics } from "@gauf/tracker";

export default class SenderWebsocket implements SenderInterface {
  protected url: string;
  protected packer: Packer;
  protected connection?: WebSocket;

  constructor(url: string, packer: Packer) {
    this.url = url;
    this.packer = packer;
  }

  public connect(callback: Callback) {
    this.connection = new WebSocket(this.url);
    this.connection.onopen = function(event: Event): any { // tslint:disable-line:only-arrow-functions
      callback();
    };
    this.connection.onerror = console.log; // tslint:disable-line:no-console
  }
  public send(metrics: Metrics): void {
    if (this.connection) {
      this.connection.send(this.packer(metrics));
    }
  }
  public disconnect() {
    if (this.connection) {
      this.connection.close();
    }
  }
}
