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
  default: `undefined`

### Usage example

```javascript
import Tracker from '@gauf/tracker';

const tracker = new Tracker('my-secret-token', {
  heartbeat: 7500,
  transport: 'http',
  packer: JSON.stringify
})

tracker.activate({ userId: 1 })
```
