import Emitter from "@gauf/emitter";
import MetricBehaviorEmitter, { Settings as MetricBehaviorEmitterSettings } from "@gauf/emitters/behavior";
import MetricNavigatorEmitter, { Settings as MetricNavigatorEmitterSettings } from "@gauf/emitters/navigator";
import { Metric } from "@gauf/tracker";

export type Settings = {
  behavior?: MetricBehaviorEmitterSettings;
  navigator?: MetricNavigatorEmitterSettings;
};

export type Listener = (metric: Metric) => void;

export class Collector {
  public emitters: Emitter[];

  constructor(listener: Listener, settings: Settings = {}) {
    this.emitters = [
      new MetricNavigatorEmitter(listener, settings.navigator),
      new MetricBehaviorEmitter(listener, settings.behavior),
    ];
  }

  public activate() {
    this.emitters.forEach((emmiter) => emmiter.activate());
  }

  public deactivate() {
    this.emitters.forEach((emmiter) => emmiter.deactivate());
  }
}
