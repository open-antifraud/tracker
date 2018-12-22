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
    const token = "fake-token";
    const tracker = new Tracker(token, {
      transport: "console",
    });

    const event = new Event("beforeunload");

    tracker.activate();

    window.dispatchEvent(event);

    expect(console.log).toBeCalledTimes(1);
  });

  it("try to send metrics after deactivation", () => {
    const token = "fake-token";
    const tracker = new Tracker(token, {
      transport: "console",
    });

    tracker.activate();
    tracker.deactivate();

    expect(console.log).toBeCalledTimes(1);
  });

  it("has different heartbeat parameter values", () => {
    const heartbeats = [1, 2, 3];
    const token = "fake-token";
    const trackers = heartbeats.map((heartbeat) => (
      new Tracker(token, {
        heartbeat,
        transport: "console",
      })
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
