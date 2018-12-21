import { DataHttp, DataHttpBeacon, DataHttpXHR, PackerHttp, PackerHttpBeacon, PackerHttpXHR } from "@gauf/packer";
import { Metrics, Payload } from "@gauf/tracker";
import { Transport } from "@gauf/transport";

export type Sender = (metrics: Metrics, payload?: Payload) => void;

const DEFAULT_TIMEOUT = 5000;

export default class TransportHttp extends Transport {
  protected sender: Sender;

  constructor(url: string, packer: PackerHttp) {
    super(url, packer);
    this.sender = this.createSender(url, packer);
  }

  public send(metrics: Metrics, payload?: Payload) {
    this.sender(metrics, payload);
  }

  protected createSender(url: string, packer: PackerHttp): Sender {
    if ("sendBeacon" in navigator) {
      return this.createSenderBeacon(url, packer as PackerHttpBeacon);
    }
    if ("XMLHttpRequest" in window) {
      return this.createSenderAjax(url, packer as PackerHttpXHR);
    }
    throw new Error("Sender can't be created");
  }

  protected createSenderBeacon(url: string, packer: PackerHttpBeacon) {
    return (metrics: Metrics, payload?: Payload): void => {
      navigator.sendBeacon(url, packer(metrics, payload));
    };
  }

  protected createSenderAjax(url: string, packer: PackerHttpXHR) {
    return (metrics: Metrics, payload?: Payload): void  => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = DEFAULT_TIMEOUT;
      xhr.open("POST", url);
      xhr.onerror = (e) => console.log(xhr.statusText); // tslint:disable-line:no-console
      xhr.ontimeout = (e) => console.log(xhr.statusText); // tslint:disable-line:no-console
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(packer(metrics, payload));
    };
  }
}
