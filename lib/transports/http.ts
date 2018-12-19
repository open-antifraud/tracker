import { Metrics, Packer } from "@gauf/tracker";
import { Transport } from "@gauf/transport";

export type Sender = (data: any) => void;

const DEFAULT_TIMEOUT = 5000;

export default class TransportHttp extends Transport {

  protected sender: Sender;

  constructor(url: string, packer?: Packer) {
    super(url, packer);
    this.sender = this.createSender(url);
  }
  public send(metrics: Metrics) {
    this.sender(this.pack(metrics));
  }

  protected createSender(url: string): Sender {
    if ("sendBeacon" in navigator) {
      return this.createSenderBeacon(url);
    }

    if ("XMLHttpRequest" in window) {
      return this.createSenderAjax(url);
    }

    throw new Error("Sender can't be created");
  }

  protected createSenderBeacon(url: string) {
    return (data: any) => {
      navigator.sendBeacon(url, data);
    };
  }

  protected createSenderAjax(url: string) {
    return (data: any) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = DEFAULT_TIMEOUT;
      xhr.open("POST", url);
      xhr.onerror = (e) => console.log(xhr.statusText); // tslint:disable-line:no-console
      xhr.ontimeout = (e) => console.log(xhr.statusText); // tslint:disable-line:no-console
      // xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(data);
    };
  }
}
