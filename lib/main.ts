import { Collector, Settings as CollectorSettings } from "@gauf/collector";
import { Settings as TransportSettings, Transport } from "@gauf/transport";

declare var process: {
  env: {
    ENDPOINT_URL: string,
    ENDPOINT_HEARTBEAT: number,
  },
};

export type Metric = {
  name: string;
  timestamp: number;
  payload?: any;
};

export type Metrics = Metric[];

export type Settings = {
  debug?: boolean;
  heartbeat?: number;
  metrics?: CollectorSettings;
  transport?: TransportSettings;
};

export default class Tracker {
  public metrics: Metrics;
  public collector: Collector;
  public transport: Transport;
  public heartbeat?: number;
  public interval?: number;

  constructor(token: string, settings: Settings = {}) {
    const url = process.env.ENDPOINT_URL.replace("{token}", token);
    const listener = (metric: Metric) => this.collect(metric);

    this.metrics = [];
    this.heartbeat = settings!.heartbeat || process.env.ENDPOINT_HEARTBEAT;
    this.collector = new Collector(listener, settings.metrics);
    this.transport = new Transport(url, settings.transport);

    window.addEventListener("beforeunload", (event: Event) => {
      this.deactivate();
    });
  }

  public activate() {
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

  protected collect(metric: Metric) {
    this.metrics.push(metric);
  }
}
