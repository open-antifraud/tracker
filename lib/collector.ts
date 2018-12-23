import { Metric } from "@gauf/tracker";
import Emitter, { InterfaceEmitter, InterfaceEmitterConstructor } from "@gauf/emitter";
import MetricBehaviorEmitter from "@gauf/emitters/behavior";
import MetricNavigatorEmitter from "@gauf/emitters/navigator";

export type Settings = {
  emitters?: InterfaceEmitterConstructor[];
  settings?: {
    [key: string]: object
  };
};

export type Listener = (metric: Metric) => void;

export class Collector {
  public emitters: InterfaceEmitter[];

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

  private createCustomEmitters(listener: Listener, settings: Settings): InterfaceEmitter[] {
    return settings.emitters!.map((EmitterClass: InterfaceEmitterConstructor) => (
      new EmitterClass(listener, settings.settings![MetricNavigatorEmitter.key])
    ));
  }

  private createDefaultEmitters(listener: Listener, settings: Settings): Emitter[] {
    return [
      new MetricNavigatorEmitter(listener, settings.settings![MetricNavigatorEmitter.key]),
      new MetricBehaviorEmitter(listener, settings.settings![MetricBehaviorEmitter.key]),
    ];
  }
}
