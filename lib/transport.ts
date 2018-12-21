import { Data, Packer } from "@gauf/packer";
import { Metrics, Payload } from "@gauf/tracker";

export type Callback = () => void;

export interface ITransport {
  send(metrics: Metrics, payload?: Payload): void;
}

export abstract class Transport implements ITransport {
  protected url: string;
  protected packer: Packer;

  constructor(url: string, packer: Packer) {
    this.url = url;
    this.packer = packer;
  }

  public connect(callback: Callback): void {
    callback();
  }

  public abstract send(metrics: Metrics, payload?: any): void;

  public disconnect(): void {
    // tslint:disable-line:no-empty
  }
}
