import Tracker from "@gauf/tracker";
import { Server, WebSocket } from "mock-socket";

const fakeURL = "ws://fakehost";
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
    const messages: any[] = [];

    mockServer.on("connection", (socket: any) => {
      socket.on("message", (message: any) => {
        messages.push(JSON.parse(message));
      });
    });

    const tracker = new Tracker(fakeURL);

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
