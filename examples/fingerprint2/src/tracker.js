import Tracker, { MetricEmitter } from '@gauf/tracker';
import Fingerprint from 'fingerprintjs2';

const fingerprint = new Fingerprint()

class MetricCustomEmitter extends MetricEmitter {
  collect(callback) {
    fingerprint.get((hash, metrics) => {
      this.emit('fp2', { hash, metrics })
      callback && callback()
    })
  }
  collectWithInterval() {
    this.timerId = window.setTimeout(() => {
      this.collect(() => this.collectWithInterval())
    }, 1000)
  }
  activate() {
    this.collectWithInterval()
  }
  deactivate() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }
  }
}

MetricCustomEmitter.key = "fingerprintjs2";

const tracker = new Tracker('console://my-receive-service', {
  collector: {
    emitters: [
     MetricCustomEmitter
    ]
  }
})

tracker.activate({ userId: 1 });

setTimeout(() => {
  tracker.deactivate()
}, 5000)
