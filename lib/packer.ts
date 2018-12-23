import { Metrics, Payload } from "@gauf/tracker";

export type Unpacked = {
  metrics: Metrics,
  payload?: Payload,
};

export type Packed<T> = T;
export type Packer<T> = (data: Unpacked) => Packed<T>;
