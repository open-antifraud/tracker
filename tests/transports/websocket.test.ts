/* tslint:disable:no-console */

const fakeURL = "ws://fakehost";

process.env.ENDPOINT_URL = fakeURL;

import Tracker from "@gauf/tracker";
import { Server, WebSocket } from "mock-socket";

const mockServer = new Server(fakeURL);

describe("Transport `websocket`", () => {
  beforeEach(() => {
    (window as any).WebSocket = WebSocket;
    mockServer.start();
    jest.useFakeTimers();
  });

  afterEach(() => {
    mockServer.stop();
    jest.clearAllTimers();
  });

  it("correct working", () => {
    const payload = { userId: 1 };
    const token = "fake-token";
    const messages: any[] = [];

    mockServer.on("connection", (socket: any) => {
      socket.on("message", (message: any) => {
        messages.push(JSON.parse(message));
      });
    });

    const tracker = new Tracker(token, {
      transport: "websocket",
    });

    tracker.activate(payload);

    jest.runOnlyPendingTimers();

    tracker.deactivate();

    jest.runOnlyPendingTimers();

    expect(messages).toHaveLength(1);
    expect(messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          metrics: expect.any(Array),
          payload,
        }),
      ]),
    );
  });
});
