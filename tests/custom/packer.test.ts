/* tslint:disable:no-console */

import Tracker, { Metrics, Payload } from "@gauf/tracker";

describe.only("Custom packer", () => {
  beforeEach(() => {
    console.log = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("correct works with custom packer", () => {
    // tslint:disable-next-line:no-shadowed-variable
    const packer = (metrics: Metrics, payload: Payload) => [metrics, payload];
    const payload = { userId: 1 };
    const tracker = new Tracker("my-secret-token", {
      packer,
      transport: "console",
    });

    tracker.activate(payload);

    jest.runOnlyPendingTimers();

    expect(console.log).toHaveBeenCalledWith(
      expect.objectContaining([
        expect.any(Array),
        expect.objectContaining(payload),
      ]),
    );
  });
});
