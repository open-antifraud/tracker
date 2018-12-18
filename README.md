Gauf Tracker
============
[![Build Status](https://travis-ci.com/open-antifraud/tracker.svg?branch=master)](https://travis-ci.com/open-antifraud/tracker)

@TODO


## Usage

Minimal example
```
import Tracker from '@gauf/tracker';

const token = 'my-secret-token';
const tracker = new Tracker(token)

tracker.activate()
```

Full example
```
import Tracker from '@gauf/tracker';

const token = 'my-secret-token';
const settings = {
  debug: true,
  heartbeat: 10000,
  metrics: {
    navigator: {
      metrics: ['userAgent']
    },
    behavior: {
      metrics: ['click', 'keydown'],
      heartbeat: 10000,
    }
  },
  transport: {
    sender: 'beacon'
  }
}

const = new Tracker(token, settings)

tracker.activate()

setTimeout(() => {
  tracker.deactivate()
}, 10000)
```
