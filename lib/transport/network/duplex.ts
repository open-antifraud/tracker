import TransportNetwork from "@gauf/transport/network";

export type Callback = () => void;

export default abstract class TransportNetworkDuplex extends TransportNetwork {
  public connect(callback: Callback): void {
    callback();
  }
  public abstract  disconnect(): void;
}
