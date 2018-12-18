import Emitter, { Listener } from '@gauf/emitter'
import * as Extractor from '@gauf/extractors/behavior'

export type Settings = {
  metrics?: Array<string>
}

export type MetricSourceListener = {
  name: string,
  listener: {
    handler: (event : Event) => void,
    useCapture?: boolean
  }
}

export type MetricSourceListeners = Array <MetricSourceListener>

export type MetricSource = {
  event: string,
  extractor?: Function,
  useCapture?: boolean
}

export type MetricSources = Array <MetricSource>

export const metricSources : MetricSources = [
  { event: 'keydown', useCapture: true },
  { event: 'click', extractor: Extractor.extractMousePosition, useCapture: true },
  { event: 'mousemove', extractor: Extractor.extractMousePosition, useCapture: true },
  { event: 'dblclick', extractor: Extractor.extractMousePosition, useCapture: true },
  { event: 'deviceorientation', extractor: Extractor.extractDeviceOrientation },
  { event: 'scroll', extractor: Extractor.extractWindowScroll },
  { event: 'rezie', extractor: Extractor.extractWindowSize }
]

export default class MetricBehaviorEmitter extends Emitter {
  protected metricSourceListeners: MetricSourceListeners;

  constructor(listener: Listener, settings: Settings = {}) {
    super(listener, settings)

    this.metricSourceListeners = settings.metrics && settings.metrics.length
      ? metricSources
          .filter(metricSource => -1 !== settings.metrics!.indexOf(metricSource.event))
          .map(source => this.createMetricSourceListener(source))
      : metricSources.map(source => this.createMetricSourceListener(source))
  }

  protected createMetricSourceListener(metricSource: MetricSource) : MetricSourceListener {
    const { event: name, useCapture, extractor } = metricSource

    return {
      name: metricSource.event,
      listener: {
        useCapture,
        handler: this.createHandler(name, extractor)
      }
    }
  }

  protected createHandler (name: string, extractor?: Function)  {
    return (event : Event) : void =>
      this.emit({
        name,
        timestamp: +new Date(),
        payload: typeof extractor === "function" ? extractor(event) : undefined
      })
  }

  public activate() : void {
    this.metricSourceListeners.forEach(sourceListener => {
      window.addEventListener(
        sourceListener.name,
        sourceListener.listener.handler,
        sourceListener.listener.useCapture
      )
    })
  }

  public deactivate() : void {
    this.metricSourceListeners.forEach(sourceListener => {
      window.removeEventListener(
        sourceListener.name,
        sourceListener.listener.handler,
        sourceListener.listener.useCapture
      )
    })
  }
}
