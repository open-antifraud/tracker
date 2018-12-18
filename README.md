Gauf Tracker
============

@TODO


Minimal example
```
import Tracker from '@gauf/tracker';

const token = 'my-secret-token';
const = new Tracker(token)

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
    navigator: ['userAgent'],
    behavior: ['click', 'keydown'],
  },
  transport: {
    sender: 'beacon'
  }
}

const = new Tracker(token, settings)

tracker.activate()

tracker.deactivate()

```
