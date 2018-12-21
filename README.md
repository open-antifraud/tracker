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
