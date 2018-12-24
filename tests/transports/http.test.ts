import Tracker from "@gauf/tracker";

describe("Transport `http`", () => {
  beforeEach(() => {
    navigator.sendBeacon = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("use beacon sender", () => {
    const payload = { userId: 1 };
    const tracker = new Tracker("http://non-exists-url");

    tracker.activate(payload);

    jest.runOnlyPendingTimers();

    tracker.deactivate();

    const secondArgument = (navigator.sendBeacon as any).mock.calls[1][1];
    const unpackedArgument = JSON.parse(secondArgument);

    expect(navigator.sendBeacon).toHaveBeenLastCalledWith(
      expect.any(String), expect.any(String),
    );

    expect(unpackedArgument).toEqual(
      expect.objectContaining({
        metrics: expect.any(Array),
        payload,
      }),
    );
  });
});
