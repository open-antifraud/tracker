import Transport from "@gauf/transport";

export default abstract class TransportNetwork extends Transport {
  protected url: string;
  constructor(url: string) {
    super();
    this.url = url;
  }
}
