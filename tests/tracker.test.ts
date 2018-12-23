/* tslint:disable:no-console */

import Tracker from "@gauf/tracker";

describe("Tracker", () => {
  beforeEach(() => {
    console.log = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("deactiavte on window unload", () => {
    const tracker = new Tracker("console://non-exists-url");

    const event = new Event("beforeunload");

    tracker.activate();

    window.dispatchEvent(event);

    expect(console.log).toBeCalledTimes(1);
  });

  it("try to send metrics after deactivation", () => {
    const tracker = new Tracker("console://non-exists-url");

    tracker.activate();
    tracker.deactivate();

    expect(console.log).toBeCalledTimes(1);
  });

  it("has different heartbeat parameter values", () => {
    const heartbeats = [1, 2, 3];
    const url = "console://non-exists-url";
    const trackers = heartbeats.map((heartbeat) => (
      new Tracker(url, { heartbeat })
    ));

    trackers.forEach((tracker, userId) => tracker.activate({ userId }));

    jest.runOnlyPendingTimers();

    expect(console.log).toBeCalledTimes(trackers.length);

    trackers.forEach((tracker, userId) =>
      expect(console.log).toHaveBeenNthCalledWith(userId + 1, expect.objectContaining({
        metrics: expect.any(Array),
        payload: expect.objectContaining({ userId }),
      })),
    );
  });
});
