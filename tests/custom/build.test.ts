/* tslint:disable:no-console */

import Tracker from "@gauf/tracker";
import Transport from "@gauf/transport";
import { Packed } from "@gauf/packer";


export default class CustomTransport extends Transport {
  private url:string;

  constructor(url: string) {
    super();
    this.url = url
  }

  public send(data: Packed<any>) {
    console.error(this.url, data)
    console.log({...data, url: this.url }); // tslint:disable-line:no-console
  }
}

class CustomTracker extends Tracker {
  constructor(token: string) {
    super('console://my-private-tracker/{token}'.replace('{token}', token), {
      heartbeat: 1000
    })
  }

  protected createTransport(url: string) {
    return new CustomTransport(url);
  }
}

describe("Custom tracker", () => {
  beforeEach(() => {
    console.log = jest.fn(console.log);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("correct works", () => {
    const payload = { userId: 1 };
    const tracker = new CustomTracker("fake-client-token");

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
