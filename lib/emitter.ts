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
  public payload?: object;

  constructor(listener: Listener, settings: Settings) {
    this.listener = listener;
    this.settings = settings;
  }

  public activate(payload?: object): void {
    this.payload = payload;
  }
  public deactivate(): void {
    this.payload = undefined;
  }

  protected emit(metric: Metric): void {
    this.listener(metric);
  }
}
