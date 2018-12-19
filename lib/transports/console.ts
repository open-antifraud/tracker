/* tslint:disable:no-console */

import { Metrics } from "@gauf/tracker";
import { Callback, Transport } from "@gauf/transport";

export default class TransportConsole extends Transport {
  public connect(callback: Callback) {
    super.connect(callback);
    console.log("connected");
  }
  public send(metrics: Metrics) {
    console.log(this.pack(metrics));
  }
  public disconnect() {
    console.log("disconnect");
  }
}
