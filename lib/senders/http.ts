import { Packer } from "@gauf/packer";
import { Callback, SenderInterface } from "@gauf/sender";
import { Metrics } from "@gauf/tracker";

export default class SenderHttp implements SenderInterface {
  protected url: string;
  protected packer: Packer;

  constructor(url: string, packer: Packer) {
    this.url = url;
    this.packer = packer;
  }

  public connect(callback: Callback) {
    callback();
  }

  public send(metrics: Metrics) {
    navigator.sendBeacon(this.url, this.packer(metrics));
  }

  public disconnect(): void {
    // tslint:disable-line:no-empty
  }
}
