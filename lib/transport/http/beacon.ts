import { Packed, Packer } from "@gauf/packer";
import { TransportNetwork } from "@gauf/transport";

type Data =
  string | Blob | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array |
  Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | FormData | null | undefined;

export default class TransportHttpBeacon extends TransportNetwork {
  public static readonly defaultPacker: Packer<Data> = JSON.stringify;

  public send(data: Packed<Data>) {
    navigator.sendBeacon(this.url, data);
  }
}
