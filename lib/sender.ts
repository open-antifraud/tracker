import { Metrics } from "@gauf/tracker";

export type Callback = () => void;

export type SenderInterface = {
  connect(callback: Callback): void;
  send(metrics: Metrics): void;
  disconnect(): void;
};
