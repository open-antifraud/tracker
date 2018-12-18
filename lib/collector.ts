import Emitter from '@gauf/emitter'
import MetricBehaviorEmitter, { Settings as MetricBehaviorEmitterSettings } from '@gauf/emitters/behavior'
import MetricNavigatorEmitter, { Settings as MetricNavigatorEmitterSettings }  from '@gauf/emitters/navigator'

export type Settings = {
  behavior?: MetricBehaviorEmitterSettings,
  navigator?: MetricNavigatorEmitterSettings
}

export type Listener = Function

export class Collector {
  emitters : Array<Emitter>;

  constructor(listener: Listener, settings: Settings = {}) {
    this.emitters = [
      new MetricNavigatorEmitter(listener, settings.navigator),
      new MetricBehaviorEmitter(listener, settings.behavior)
    ]
  }

  activate() {
    this.emitters.forEach(emmiter => emmiter.activate())
  }

  deactivate() {
    this.emitters.forEach(emmiter => emmiter.deactivate())
  }
}
