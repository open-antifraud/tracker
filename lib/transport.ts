import { Packed, Packer, Unpacked } from "@gauf/packer";

export default abstract class Transport {
  public static readonly defaultPacker: Packer<any> = (data: Unpacked) => data;
  public abstract send(data: Packed<any>): void;
}
