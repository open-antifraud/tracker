import { Metric, Payload } from "@gauf/tracker";

export type Listener = (metric: Metric) => void;
export type Settings = object;

export interface InterfaceEmitter {
  activate(payload?: Payload): void;
  deactivate(): void;
}

export interface InterfaceEmitterConstructor {
  new (listener: Listener, settings?: Settings) : InterfaceEmitter;
}

export default abstract class Emitter implements InterfaceEmitter {
  static readonly key: string = "default";

  public readonly settings?: Settings;
  public readonly listener: Listener;

  constructor(listener: Listener, settings?: Settings) {
    this.listener = listener;
    this.settings = settings;
  }

  public abstract activate(payload?: Payload): void;

  public abstract deactivate(): void;

  protected emit(name: string, payload?: Payload): void {
    this.listener({
      emitter: (this.constructor as typeof Emitter).key,
      name,
      payload,
      timestamp: +new Date(),
    });
  }
}
