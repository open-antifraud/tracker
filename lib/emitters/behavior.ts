import Emitter, { Listener } from "@gauf/emitter";
import {
  extractDeviceOrientation,
  extractMousePosition,
  Extractor,
  extractWindowScroll,
  extractWindowSize,
} from "@gauf/emitters/extractors/behavior";

export type Settings = {
  metrics?: string[];
};

export type MetricSourceListener = {
  listener: {
    handler: (event: Event) => void,
    useCapture?: boolean,
  };
  name: string;
};

export type MetricSourceListeners = MetricSourceListener[];

export type MetricSource = {
  event: string;
  extractor?: Extractor;
  useCapture?: boolean;
};

export type MetricSources = MetricSource[];

export const metricSources: MetricSources = [
  { event: "keydown", useCapture: true },
  { event: "click", extractor: extractMousePosition, useCapture: true },
  { event: "mousemove", extractor: extractMousePosition, useCapture: true },
  { event: "dblclick", extractor: extractMousePosition, useCapture: true },
  { event: "deviceorientation", extractor: extractDeviceOrientation },
  { event: "scroll", extractor: extractWindowScroll },
  { event: "resize", extractor: extractWindowSize },
];

export default class MetricBehaviorEmitter extends Emitter {
  protected metricSourceListeners: MetricSourceListeners;

  constructor(listener: Listener, settings: Settings = {}) {
    super(listener, settings);

    this.metricSourceListeners = settings.metrics && settings.metrics.length
      ? metricSources
          .filter((metricSource) => -1 !== settings.metrics!.indexOf(metricSource.event))
          .map((source) => this.createMetricSourceListener(source))
      : metricSources.map((source) => this.createMetricSourceListener(source));
  }

  public activate(): void {
    this.metricSourceListeners.forEach((sourceListener) => {
      window.addEventListener(
        sourceListener.name,
        sourceListener.listener.handler,
        sourceListener.listener.useCapture,
      );
    });
  }

  public deactivate(): void {
    this.metricSourceListeners.forEach((sourceListener) => {
      window.removeEventListener(
        sourceListener.name,
        sourceListener.listener.handler,
        sourceListener.listener.useCapture,
      );
    });
  }

  protected createMetricSourceListener(metricSource: MetricSource): MetricSourceListener {
    const { event: name, useCapture, extractor } = metricSource;

    return {
      listener: {
        handler: this.createHandler(name, extractor),
        useCapture,
      },
      name: metricSource.event,
    };
  }

  protected createHandler(name: string, extractor?: Extractor)  {
    return (event: Event): void =>
      this.emit({
        emitter: "behavior",
        name,
        payload: typeof extractor === "function" ? extractor(event) : undefined,
        timestamp: +new Date(),
      });
  }
}
