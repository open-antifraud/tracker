import Emitter from "@gauf/emitter";
import MetricBehaviorEmitter, { Settings as MetricBehaviorEmitterSettings } from "@gauf/emitters/behavior";
import MetricNavigatorEmitter, { Settings as MetricNavigatorEmitterSettings } from "@gauf/emitters/navigator";
import { Metric } from "@gauf/tracker";

export type Settings = {
  behavior?: MetricBehaviorEmitterSettings;
  navigator?: MetricNavigatorEmitterSettings;
  emitters?: Emitter[];
};

export type Listener = (metric: Metric) => void;

export class Collector {
  public emitters: Emitter[];

  constructor(listener: Listener, settings: Settings = {}) {
    this.emitters = settings.emitters
      ? this.createCustomEmitters(listener, settings)
      : this.createDefaultEmitters(listener, settings);
  }

  public activate() {
    this.emitters.forEach((emmiter) => emmiter.activate());
  }

  public deactivate() {
    this.emitters.forEach((emmiter) => emmiter.deactivate());
  }

  private createCustomEmitters(listener: Listener, settings: Settings): Emitter[] {
    return settings.emitters!.map((EmitterClass: any) => {
      switch (EmitterClass) {
        case MetricBehaviorEmitter:
          return new EmitterClass(listener, settings.behavior);
        case MetricNavigatorEmitter:
          return new EmitterClass(listener, settings.navigator);
        default:
          return new EmitterClass(listener);
      }
    });
  }

  private createDefaultEmitters(listener: Listener, settings: Settings): Emitter[] {
    return [
      new MetricNavigatorEmitter(listener, settings.navigator),
      new MetricBehaviorEmitter(listener, settings.behavior),
    ];
  }
}
