Gauf Tracker
============
[![npm version](https://badge.fury.io/js/%40gauf%2Ftracker.svg)](https://badge.fury.io/js/%40gauf%2Ftracker)
[![Build Status](https://travis-ci.com/open-antifraud/tracker.svg?branch=master)](https://travis-ci.com/open-antifraud/tracker) [![Coverage Status](https://coveralls.io/repos/github/open-antifraud/tracker/badge.svg?branch=master)](https://coveralls.io/github/open-antifraud/tracker?branch=master)

Browser tracker with perfect customization

## Installation

```bash
npm install @gauf/tracker --save
```

## Usage

There's a minimal example of tracker usage:

```javascript
import Tracker from '@gauf/tracker';

const tracker = new Tracker('http://receive.service');

tracker.activate({ userId: 1 });
```

### URL

Examples:

* `console://debug-receiver`
* `https://receive.service`
* `http://receive.service`
* `wws://receive.service`
* `ws://receive.service`

Tracker detect transport according URL parameter

### Settings

```
heartbeat?: number;
collector?: {
  emitters?: InterfaceEmitterConstructor[];
  settings?: {
    [key: string]: object,
  }
};
transport?: object;
packer?: Packer<any>;
```

* **heartbeat** - how often to send metrics, default: `5000` microseconds
* **collector** - class array of metric emitters, with settings of each
* **transport** - transport settings for detected transport
* **packer** - packer function, default: `JSON.stringify`

## Examples

* [Use `fingeprint2` as custom metric emitter](./examples/fingerprint2/)
* [Use `msgpack` as custom packer](./examples/msgpack/)
* [Custom tracker with tokens support](./examples/tokens/)

