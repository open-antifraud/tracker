import { Packed, Packer, Unpacked } from "@gauf/tracker/packer";

export type Callback = () => void;

export abstract class Transport {
  public static readonly defaultPacker: Packer<any> = (data: Unpacked) => data;
  public abstract send(data: Packed<any>): void;
}

export abstract class TransportNetwork extends Transport {
  protected url: string;
  constructor(url: string) {
    super();
    this.url = url;
  }
}

export abstract class TransportNetworkDuplex extends TransportNetwork {
  public connect(callback: Callback): void {
    callback();
  }
  public abstract  disconnect(): void;
}
