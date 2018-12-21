import { Metric } from "@gauf/tracker";

export type Listener = (metric: Metric) => void;
export type Settings = object;

export interface IEmitter {
  activate(payload?: object): void;
  deactivate(): void;
}

export default abstract class Emitter implements IEmitter {
  public readonly settings: Settings;
  public readonly listener: Listener;
  protected name: string;

  constructor(listener: Listener, settings: Settings) {
    this.name = "default";
    this.listener = listener;
    this.settings = settings;
  }

  public abstract activate(): void;

  public abstract deactivate(): void;

  protected emit(name: string, payload?: any): void {
    this.listener({
      emitter: this.name,
      name,
      payload,
      timestamp: +new Date(),
    });
  }
}
