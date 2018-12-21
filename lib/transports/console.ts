import { PackerConsole } from "@gauf/packer";
import { Metrics, Payload } from "@gauf/tracker";
import { Transport } from "@gauf/transport";

export default class TransportConsole extends Transport {
  protected packer: PackerConsole;

  constructor(url: string, packer: PackerConsole) {
    super(url, packer);
    this.packer = packer;
  }

  public send(metrics: Metrics, payload?: Payload) {
    console.log(this.packer(metrics, payload));  // tslint:disable-line:no-console
  }
}
