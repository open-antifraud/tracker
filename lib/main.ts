import { Collector, Settings as CollectorSettings } from "@gauf/collector";
import { Transport } from "@gauf/transport";
import TransportConsole from "@gauf/transports/console";
import TransportHttp from "@gauf/transports/http";
import TransportWebsocket from "@gauf/transports/websocket";

declare var process: {
  env: {
    ENDPOINT_URL: string,
    ENDPOINT_HEARTBEAT: number,
  },
};

export type Metric = {
  name: string;
  source: string;
  timestamp: number;
  payload?: any;
};

export type Metrics = Metric[];

export type Settings = {
  heartbeat?: number;
  metrics?: CollectorSettings;
  transport?: string;
  packer?: Packer;
};

export type Packer = (metrics: Metrics) => any;

export default class Tracker {
  protected metrics: Metrics;
  protected collector: Collector;
  protected transport: Transport;
  protected packer?: Packer;
  protected heartbeat?: number;
  protected interval?: number;

  constructor(token: string, settings: Settings = {}) {
    this.metrics = [];
    this.heartbeat = settings.heartbeat || process.env.ENDPOINT_HEARTBEAT;

    this.collector = this.createCollector(settings!.metrics);
    this.transport = this.createTransport(token, settings!.transport);
    this.packer = settings!.packer;

    window.addEventListener("beforeunload", () => {
      this.deactivate();
    });
  }

  public activate(payload?: any) {
    this.collector.activate();
    this.transport.connect(() => {
      this.interval = window.setInterval(() => {
        this.transport.send(this.metrics);
        this.metrics = [];
      }, this.heartbeat);
    });
  }

  public deactivate() {
    this.collector.deactivate();
    this.transport.send(this.metrics);
    this.transport.disconnect();

    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  protected createCollector(settings?: CollectorSettings) {
    const listener = (metric: Metric) => this.collect(metric);
    return new Collector(listener, settings);
  }

  protected createTransport(token: string, transport?: string) {
    const url = process.env.ENDPOINT_URL.replace("{token}", token);
    switch (transport) {
      case "http":
        return new TransportHttp(url, this.packer);
      case "websocket":
        return new TransportWebsocket(url, this.packer);
      default:
        return new TransportConsole(url, this.packer);
    }
  }

  protected collect(metric: Metric) {
    this.metrics.push(metric);
  }
}
