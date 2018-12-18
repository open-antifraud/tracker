import { Metrics } from "@gauf/tracker";

export interface SenderInterface {
  connect(callback: Function) : void;
  send(metrics: Metrics) : void;
  disconnect() : void;
}
