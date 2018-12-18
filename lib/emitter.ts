import { Metric } from "@gauf/tracker";

export type Listener = (metric: Metric) => void;
export type Settings = object;

export interface IEmitter {
  activate(): void;
  deactivate(): void;
}

export default abstract class Emitter implements IEmitter {
  public readonly settings: Settings;
  public readonly listener: Listener;

  constructor(listener: Listener, settings: Settings) {
    this.listener = listener;
    this.settings = settings;
  }

  public abstract activate(): void;
  public abstract deactivate(): void;

  protected emit(metric: Metric): void {
    this.listener(metric);
  }
}
