import Emitter, { InterfaceEmitter, InterfaceEmitterConstructor, Listener } from "@gauf/tracker/emitter";
import MetricBehaviorEmitter from "@gauf/tracker/emitters/behavior";
import MetricNavigatorEmitter from "@gauf/tracker/emitters/navigator";

export type Settings = {
  emitters?: InterfaceEmitterConstructor[];
  settings?: {
    [key: string]: object,
  };
};

export default class Collector {
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

  private extractSettings(settings: Settings, EmitterClass: any): object | undefined {
    return settings.settings
      ? settings.settings[(EmitterClass as typeof Emitter).key]
      : undefined;
  }

  private createCustomEmitters(listener: Listener, settings: Settings): InterfaceEmitter[] {
    return settings.emitters!.map((EmitterClass: InterfaceEmitterConstructor) => (
      new EmitterClass(listener, this.extractSettings(settings, EmitterClass))
    ));
  }

  private createDefaultEmitters(listener: Listener, settings: Settings): Emitter[] {
    return [
      new MetricNavigatorEmitter(listener, this.extractSettings(settings, MetricNavigatorEmitter)),
      new MetricBehaviorEmitter(listener, this.extractSettings(settings, MetricBehaviorEmitter)),
    ];
  }
}
