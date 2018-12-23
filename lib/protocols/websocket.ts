import { Packed, Packer } from "@gauf/packer";
import TransportNetworkDuplex, { Callback } from "@gauf/transport/network/duplex";

type Data = string | Blob | ArrayBuffer | ArrayBufferView;

export default class TransportWebsocket extends TransportNetworkDuplex {
  public static readonly defaultPacker: Packer<Data> = JSON.stringify;

  protected connection?: WebSocket;

  public connect(callback: Callback) {
    this.connection = new WebSocket(this.url);
    this.connection.onopen = () => {
      callback();
    };
    this.connection.onerror = console.error; // tslint:disable-line:no-console
  }

  public send(data: Packed<Data>): void {
    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      this.connection.send(data);
    }
  }

  public disconnect() {
    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      this.connection.close();
    }
  }
}
