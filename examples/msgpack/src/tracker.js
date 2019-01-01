import Tracker from '@gauf/tracker';
import * as msgpack from "msgpack-lite";

const tracker = new Tracker('console://my-receive-service', {
  packer: msgpack.encode
})

tracker.activate({ userId: 1 })
