import { Metric } from '@gauf/tracker'

export type Listener = Function
export type Settings = Object

export interface EmitterInterface {
  activate() : void;
  deactivate() : void;
}

export default abstract class Emitter implements EmitterInterface {
  public readonly settings: Settings;
  public readonly listener: Listener;

  constructor(listener: Listener, settings: Settings) {
    this.listener = listener
    this.settings = settings
  }

  abstract activate() : void
  abstract deactivate() : void

  protected emit(metric : Metric) : void {
    this.listener(metric)
  }
}
