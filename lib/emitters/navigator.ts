import MetricEmitter, { Listener } from "@gauf/emitter";

const metrics = [
  "userAgent",
  "appVersion",
  "appName",
  "appCodeName",
  "product",
  "productSub",
  "vendor",
  "vendorSub",
  "platform",
  "hardwareConcurrency",
  "language",
  "languages",
  "onLine",
  "doNotTrack",
  "cookieEnabled",
  "maxTouchPoints",
];

const DEFAULT_HEARTBEAT = 10000;

export type Settings = {
  heartbeat?: number;
  metrics?: string[];
};

export default class MetricNavigatorEmitter extends MetricEmitter {
  protected headerbeat: number;
  protected metrics: string[];
  protected timeout?: number;
  protected static emitter: string = "navigator";

  constructor(listener: Listener, settings: Settings = {}) {
    super(listener, settings);

    this.headerbeat = settings.heartbeat || DEFAULT_HEARTBEAT;
    this.metrics = settings.metrics && settings.metrics.length
      ? metrics.filter((metric) => -1 !== settings.metrics!.indexOf(metric))
      : metrics;
  }

  public activate(): void {
    this.waitAndEmit();
  }

  public deactivate(): void {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  private waitAndEmit() {
    this.timeout = window.setTimeout(() => {
      metrics.map((property) => this.emit(property, (navigator as any)[property]));
      this.waitAndEmit();
    }, this.headerbeat);
  }
}
