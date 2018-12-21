import { Metrics, Payload } from "@gauf/tracker";

export type DataHttpBeacon =
  string | Blob | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array |
  Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | FormData | null | undefined;

export type DataHttpXHR =
  string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams |
  ReadableStream<Uint8Array> | null | undefined;

export type DataConsole = any;
export type DataHttp = DataHttpBeacon | DataHttpXHR;
export type DataWebsocket = string | ArrayBuffer | Blob | ArrayBufferView;

export type PackerHttpBeacon = (metrics: Metrics, payload?: Payload) => DataHttpBeacon;
export type PackerHttpXHR = (metrics: Metrics, payload?: Payload) => DataHttpXHR;

export type PackerConsole = (metrics: Metrics, payload?: Payload) => DataConsole;
export type PackerHttp = PackerHttpBeacon | PackerHttpXHR;
export type PackerWebsocket = (metrics: Metrics, payload?: Payload) => DataWebsocket;

export type Data = DataConsole | DataHttp | DataWebsocket;
export type Packer =  PackerConsole | PackerHttp | PackerWebsocket;

export const PackerHttpDefault = (metrics: Metrics, payload?: Payload) => JSON.stringify({ metrics, payload });
export const PackerConsoleDefault = (metrics: Metrics, payload?: Payload) => ({ metrics, payload });
export const PackerWebsocketDefault = (metrics: Metrics, payload?: Payload) => JSON.stringify({ metrics, payload });
