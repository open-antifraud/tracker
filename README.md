Gauf Tracker
============
[![Build Status](https://travis-ci.com/open-antifraud/tracker.svg?branch=master)](https://travis-ci.com/open-antifraud/tracker)

@TODO

### Settings

* **heartbeat**
  type: `number`
  required: `false`
  default: `5000`

* **transport**
  type: `string`
  required: `false`
  value: `http` | `websocket` | `console`
  default: `console`

* **packer**
  type: `(metrics: Metrics) => any`
  required: `false`
  default: `JSON.stringify` when `websocket` or `http` transport set

### Usage example


1. Minimal

```javascript
import Tracker from '@gauf/tracker';

const tracker = new Tracker('my-secret-token')

tracker.activate({ userId: 1 })
```

2. Custom packer

```javascript
import Tracker from '@gauf/tracker';
import * as msgpack from "msgpack-lite";

const tracker = new Tracker('my-secret-token', {
  transport: 'http',
  packer: msgpack.encode
})

tracker.activate({ userId: 1 })
```

3. Custom metric emitters


Create `MetricCustomEmitter.js`:

```javascript
import Emitter from '@gauf/emitter';

export default class MetricCustomEmitter extends Emitter {
  protected static emitter: string = "custom";
  protected interval?: number;

  public activate() {
    this.interval = window.setInterval(() =>
      this.emit('random', Math.random())
    , 300)
  }

  public deactivate() {
    if (this.interval) {
      window.clearTimeout(this.interval);
    }
  }
}
```

Initialize tracker with custom metric emitter

```javascript
import Tracker from '@gauf/tracker';
import MetricCustomEmitter from './MetricCustomEmitter';

const tracker = new Tracker('my-secret-token', {
  collector: {
    emitters: [
      MetricCustomEmitter
    ]
  }
})

tracker.activate({ userId: 1 })
```
