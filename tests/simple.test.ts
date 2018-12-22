import Tracker from "@gauf/tracker"

process.env.ENDPOINT_HEARTBEAT = '500';
process.env.ENDPOINT_URL = 'http://fakehost/{token}'

describe("Simple test", () => {
  it("Instance without errors", done => {
    const tracker = new Tracker('token');

    tracker.activate()

    setTimeout(() => {
      tracker.deactivate()
      done()
    }, 1000)
  })

})
