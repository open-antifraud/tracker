/* tslint:disable:no-console */

import Emitter from "@gauf/emitter";
import Tracker from "@gauf/tracker";

class MetricCustomEmitter extends Emitter {
  protected static emitter: string = "custom";

  protected interval?: number;

  public activate() {
    this.interval = window.setInterval(() =>
      this.emit("random", Math.random())
    , 300);
  }

  public deactivate() {
    if (this.interval) {
      window.clearTimeout(this.interval);
    }
  }
}

describe("Custom emitter", () => {
  beforeEach(() => {
    console.log = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("correct works with `MetricCustomEmitter`", () => {
    const url = "console://non-exists-urls";
    const payload = { userId: 1 };
    const tracker = new Tracker(url, {
      collector: {
        emitters: [
          MetricCustomEmitter,
        ],
      },
    });

    tracker.activate(payload);

    jest.runOnlyPendingTimers();

    expect(console.log).toHaveBeenCalledWith(
      expect.objectContaining({
        metrics: expect.any(Array),
        payload,
      }),
    );
  });
});
