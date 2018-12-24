/* tslint:disable:no-console */

import Tracker from "@gauf/tracker";

class CustomTokenTracker extends Tracker {
  public url: string;
  constructor(token: string) {
    const url = "console://my-private-tracker/{token}".replace("{token}", token);
    super(url);
    this.url = url;
  }
}

describe("Custom tracker", () => {
  it("with predefined and tokenized url", () => {
    const tracker = new CustomTokenTracker("fake-client-token");
    expect(tracker.url).toEqual("console://my-private-tracker/fake-client-token");
  });
});
