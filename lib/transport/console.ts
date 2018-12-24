import { Packed } from "@gauf/tracker/packer";
import { Transport } from "@gauf/tracker/transport";

export default class TransportConsole extends Transport {
  public send(data: Packed<any>) {
    console.log(data);  // tslint:disable-line:no-console
  }
}
