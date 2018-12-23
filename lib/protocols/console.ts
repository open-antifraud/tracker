import { Packed } from "@gauf/packer";
import Transport from "@gauf/transport";

export default class TransportConsole extends Transport {
  public send(data: Packed<any>) {
    console.log(data);  // tslint:disable-line:no-console
  }
}
