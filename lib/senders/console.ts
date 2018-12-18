/* tslint:disable:no-console */

import { Callback, SenderInterface } from "@gauf/sender";
import { Metrics } from "@gauf/tracker";

export default class SenderConsole implements SenderInterface {
  public connect(callback: Callback) {
    console.log("connected");
    callback();
  }
  public send(metrics: Metrics) {
    console.log(metrics);
  }
  public disconnect() {
    console.log("disconnect");
  }
}
