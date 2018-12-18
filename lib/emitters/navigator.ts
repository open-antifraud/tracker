import MetricEmitter, { Listener } from '@gauf/emitter'

const metrics = [
  'userAgent',
  'appVersion',
  'appName',
  'appCodeName',
  'product',
  'productSub',
  'vendor',
  'vendorSub',
  'platform',
  'hardwareConcurrency',
  'language',
  'languages',
  'onLine',
  'doNotTrack',
  'cookieEnabled',
  'maxTouchPoints'
]

const DEFAULT_HEARTBEAT = 10000;

export type Settings = {
  metrics?: Array<string>,
  heartbeat?: number
}

export default class MetricNavigatorEmitter extends MetricEmitter {
  protected headerbeat: number;
  protected metrics: Array<string>;
  protected timeout?: number;

  constructor(listener: Listener, settings: Settings = {}) {
    super(listener, settings)

    this.headerbeat = settings.heartbeat || DEFAULT_HEARTBEAT
    this.metrics = settings.metrics && settings.metrics.length
      ? metrics.filter(metric => -1 !== settings.metrics!.indexOf(metric))
      : metrics
  }

  private waitAndEmit() {
    this.timeout = window.setTimeout(() => {
      metrics.map(property => this.emit({
        name: property,
        timestamp: +new Date(),
        payload: (navigator as any)[property] // @TODO
      }))

      this.waitAndEmit()
    }, this.headerbeat)
  }

  public activate() : void {
    this.waitAndEmit()
  }

  public deactivate() : void {
    if (this.timeout) {
      window.clearTimeout(this.timeout)
    }
  }
}
