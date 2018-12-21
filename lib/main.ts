import { Collector, Settings as CollectorSettings } from "@gauf/collector";
import { Packer, PackerConsoleDefault, PackerHttpDefault, PackerWebsocketDefault } from "@gauf/packer";
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
  emitter: string;
  timestamp: number;
  payload?: any;
};

export type Metrics = Metric[];

export type Payload = any;

export type Settings = {
  heartbeat?: number;
  collector?: CollectorSettings;
  transport?: string;
  packer?: Packer;
};

export default class Tracker {
  protected metrics: Metrics;
  protected collector: Collector;
  protected transport: Transport;
  protected settings: Settings;
  protected interval?: number;
  protected payload?: Payload;

  constructor(token: string, settings: Settings = {}) {
    this.metrics = [];
    this.settings = settings;

    this.collector = this.createCollector(settings);
    this.transport = this.createTransport(token, settings);

    window.addEventListener("beforeunload", () => {
      this.deactivate();
    });
  }

  public activate(payload?: Payload) {
    this.payload = payload;
    this.collector.activate();
    this.transport.connect(() => {
      this.interval = window.setInterval(() => {
        this.transport.send(this.metrics, this.payload);
        this.metrics = [];
      }, this.settings.heartbeat || process.env.ENDPOINT_HEARTBEAT);
    });
  }

  public deactivate() {
    this.collector.deactivate();
    this.transport.send(this.metrics, this.payload);
    this.transport.disconnect();
    this.payload = null;

    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  protected createCollector(settings: Settings) {
    const listener = (metric: Metric) => this.collect(metric);
    return new Collector(listener, settings.collector);
  }

  protected createTransport(token: string, settings: Settings) {
    const url = process.env.ENDPOINT_URL.replace("{token}", token);
    switch (settings.transport) {
      case "http":
        return new TransportHttp(url, settings.packer || PackerHttpDefault);
      case "websocket":
        return new TransportWebsocket(url, settings.packer || PackerWebsocketDefault);
      default:
        return new TransportConsole(url, settings.packer || PackerConsoleDefault);
    }
  }

  protected collect(metric: Metric) {
    this.metrics.push(metric);
  }
}
