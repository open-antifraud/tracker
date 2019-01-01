import Tracker from '@gauf/tracker';
import Emitter from '@gauf/emitter';

class MetricCustomEmitter extends Emitter {
  collect(callback) {
    Fingerprint2.get((metrics) => {
      this.emit('fp2', metrics)
      callback && callback()
    })
  }

  collectWithInterval() {
    this.timerId = window.setTimeout(() =>
      this.collect(() => this.collectWithInterval())
    , 1000)
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

MetricCustomEmitter.key = "fingerprint2"

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
