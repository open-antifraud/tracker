import { Metrics, Packer } from "@gauf/tracker";

export type Callback = () => void;

export interface ITransport {
  connect(callback: Callback): void;
  send(metrics: Metrics): void;
  disconnect(): void;
}

export abstract class Transport implements ITransport {

  protected url: string;
  private packer?: Packer;

  constructor(url: string, packer?: Packer) {
    this.url = url;
    this.packer = packer;
  }
  public connect(callback: Callback): void {
    callback();
  }

  public abstract send(metrics: Metrics): void;

  public disconnect(): void {
    // tslint:disable-line:no-empty
  }

  protected pack(metrics: Metrics): any {
    return this.packer ? this.packer(metrics) : metrics;
  }
}
