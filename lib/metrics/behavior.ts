import Emitter, { Listener } from "@gauf/tracker/emitter";

export type Settings = {
  metrics?: string[];
};

type MetricSourceListener = {
  listener: {
    handler: (event: Event) => void,
    useCapture?: boolean,
  };
  name: string;
};

type MetricSourceListeners = MetricSourceListener[];

type MetricSource = {
  event: string;
  extractor?: Extractor;
  useCapture?: boolean;
};

type MetricSources = MetricSource[];

type Extractor = (event: any) => object;

type Size = {
  readonly width: number;
  readonly height: number;
};

type Position = {
  readonly x: number;
  readonly y: number;
};

type DeviceOrientation = {
  readonly absolute: boolean;
  readonly alpha: number | null;
  readonly beta: number | null;
  readonly gamma: number | null;
};

const getWindowSize = (): Size => ({
  height: window.document.body.clientHeight,
  width: window.document.body.clientWidth,
});

const getScrollPosition = (): Position => ({
  x: window.scrollX,
  y: window.scrollY,
});

const extractWindowSize: Extractor = () => getWindowSize();
const extractWindowScroll: Extractor = () => getScrollPosition();

const extractMousePosition: Extractor = (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event;
  const size = getWindowSize();
  const scroll = getScrollPosition();

  const outside =
    x < scroll.x ||
    x > scroll.x + size.width ||
    y < scroll.y ||
    y > scroll.y + size.height;

  return { x, y, outside };
};

const extractDeviceOrientation: Extractor = (event: DeviceOrientationEvent): DeviceOrientation => {
  return {
    absolute: event.absolute,
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
  };
};

const metricSources: MetricSources = [
  { event: "keydown", useCapture: true },
  { event: "click", extractor: extractMousePosition, useCapture: true },
  { event: "mousemove", extractor: extractMousePosition, useCapture: true },
  { event: "dblclick", extractor: extractMousePosition, useCapture: true },
  { event: "deviceorientation", extractor: extractDeviceOrientation },
  { event: "scroll", extractor: extractWindowScroll },
  { event: "resize", extractor: extractWindowSize },
];

export default class MetricBehaviorEmitter extends Emitter {
  public static readonly key: string = "behavior";

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
      this.emit(name, typeof extractor === "function" ? extractor(event) : undefined);
  }
}
