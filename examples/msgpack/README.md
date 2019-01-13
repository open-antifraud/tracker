Gauf tracker usage example
--------------------------

Use custom transport packer as [msgpack-lite](https://github.com/kawanet/msgpack-lite)

```javascript
import Tracker from '@gauf/tracker';
import * as msgpack from "msgpack-lite";

const tracker = new Tracker('console://my-receive-service', {
  packer: msgpack.encode
})

tracker.activate({ userId: 1 })
```

To play with example run the followings:

```bash
npm install
npm run dev
```
