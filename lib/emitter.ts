import { Metric } from "@gauf/tracker";

export type Listener = (metric: Metric) => void;
export type Settings = object;

export interface IEmitter {
  activate(payload?: object): void;
  deactivate(): void;
}

export default abstract class Emitter implements IEmitter {
  protected static emitter: string = "default";
  public readonly settings: Settings;
  public readonly listener: Listener;

  constructor(listener: Listener, settings: Settings) {
    this.listener = listener;
    this.settings = settings;
  }

  public abstract activate(): void;

  public abstract deactivate(): void;

  protected emit(name: string, payload?: any): void {
    this.listener({
      emitter: (this.constructor as typeof Emitter).emitter,
      name,
      payload,
      timestamp: +new Date(),
    });
  }
}
