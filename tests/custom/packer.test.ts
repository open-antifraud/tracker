/* tslint:disable:no-console */

import Tracker from "@gauf/tracker";

describe("Custom packer", () => {
  beforeEach(() => {
    console.log = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("correct works with custom packer", () => {
    const url = "console://non-exists-url";
    const payload = { userId: 1 };
    const tracker = new Tracker(url, {
      packer: ({ metrics, payload }) => [metrics, payload], // tslint:disable-line:no-shadowed-variable
    });

    tracker.activate(payload);

    jest.runOnlyPendingTimers();

    expect(console.log).toHaveBeenCalledWith(
      expect.objectContaining([
        expect.any(Array),
        payload,
      ]),
    );
  });
});
