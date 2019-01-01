import { Packed, Packer } from "@gauf/tracker/packer";
import { TransportNetwork } from "@gauf/tracker/transport";

type Data =
  string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams |
  ReadableStream<Uint8Array> | null | undefined;

type Header = {
  header: string,
  value: string,
};

export type Settings = {
  headers: Header[],
  timeout: number,
};

const defaultSettings = {
  headers: [],
  timeout: 7500,
};

export default class TransportHttpAjax extends TransportNetwork {
  public static readonly defaultPacker: Packer<Data> = JSON.stringify;

  protected settings: Settings;

  constructor(url: string, settings?: Settings) {
    super(url);
    this.settings = (Object as any).assign({}, defaultSettings, settings);
  }

  public send(data: Packed<Data>) {
    const { headers, timeout } = this.settings;
    const xhr = new XMLHttpRequest();

    xhr.timeout = timeout;
    xhr.open("POST", this.url);
    xhr.onerror = () => console.log(xhr.statusText); // tslint:disable-line:no-console
    xhr.ontimeout = () => console.log(xhr.statusText); // tslint:disable-line:no-console

    headers.forEach(({ header, value }) => (
      xhr.setRequestHeader(header, value)
    ));

    xhr.send(data);
  }
}
