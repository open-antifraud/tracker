import { Metrics } from '@gauf/tracker';
import { SenderInterface } from '@gauf/sender'
import { Packer } from '@gauf/packer';

export default class SenderHttp implements SenderInterface {
  protected url: string;
  protected packer: Packer;

  constructor(url: string, packer: Packer) {
    this.url = url
    this.packer = packer
  }

  connect(callback: Function) {
    callback()
  }

  send(metrics: Metrics) {
    navigator.sendBeacon(this.url, this.packer(metrics));
  }

  disconnect() : void { }
}
