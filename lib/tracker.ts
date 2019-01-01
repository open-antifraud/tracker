import Collector, { Settings as CollectorSettings } from "@gauf/tracker/collector";
import { Packed, Packer } from "@gauf/tracker/packer";
import { Transport, TransportNetworkDuplex } from "@gauf/tracker/transport";
import TransportFactory from "@gauf/tracker/transport/factory";
export { default as MetricEmitter } from "@gauf/tracker/emitter";

export type Metric = {
  name: string;
  emitter: string;
  timestamp: number;
  payload?: any;
};

export type Metrics = Metric[];

export type Payload = any;

export type Settings = {
  heartbeat?: number;
  collector?: CollectorSettings;
  transport?: object;
  packer?: Packer<any>;
};

const defaultSettings = {
  heartbeat: 2000,
};

export default class Tracker {
  protected interval?: number;
  protected heartbeat: number;

  protected metrics: Metric[];

  protected collector: Collector;
  protected transport: Transport;
  protected packer: Packer<any>;
  protected payload?: Payload;

  constructor(url: string, trackerSettings?: Settings) {
    const settings = (Object as any).assign({}, defaultSettings, trackerSettings);

    this.metrics = [];

    this.collector = this.createCollector(settings.collector);
    this.transport = this.createTransport(url, settings.transport);
    this.packer = this.createPacker(this.transport, settings.packer);
    this.heartbeat = settings.heartbeat;

    window.addEventListener("beforeunload", () => {
      this.deactivate();
    });
  }

  public activate(payload?: Payload) {
    this.payload = payload;
    this.collector.activate();

    if (this.transport instanceof TransportNetworkDuplex) {
      this.transport.connect(() => {
        this.createSendInterval();
      });
    } else {
      this.createSendInterval();
    }
  }

  public deactivate() {
    this.collector.deactivate();
    this.transport.send(this.packData());
    if (this.transport instanceof TransportNetworkDuplex) {
      this.transport.disconnect();
    }
    if (this.interval) {
      window.clearInterval(this.interval);
    }
    this.payload = undefined;
  }

  protected packData(): Packed<any> {
    return this.packer({
      metrics: this.metrics,
      payload: this.payload,
    });
  }

  protected createSendInterval() {
    this.interval = window.setInterval(() => {
      this.transport.send(this.packData());
      this.metrics = [];
    }, this.heartbeat);
  }

  protected createCollector(settings?: CollectorSettings) {
    const listener = (metric: Metric) => this.collect(metric);
    return new Collector(listener, settings);
  }

  protected createTransport(url: string, settings?: object) {
    const factory = new TransportFactory();
    return factory.createTransport(url, settings);
  }

  protected createPacker(transport: Transport, settings?: Packer<any>) {
    return settings || (transport.constructor as typeof Transport).defaultPacker;
  }

  protected collect(metric: Metric) {
    this.metrics.push(metric);
  }
}
