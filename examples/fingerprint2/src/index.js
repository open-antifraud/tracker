import Tracker from '@gauf/tracker';
import Emitter from '@gauf/emitter';

class MetricCustomEmitter extends Emitter {
  static emitter = "fingerprint2";

  collect(callback) {
    Fingerprint2.get((metrics) => {
      this.emit('fp2', metrics)
      callback && callback()
    })
  }

  activate() {
    this.timerId = window.setTimeout(() =>
      this.
    , 300)
  }

  deactivate() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }
  }
}

const tracker = new Tracker('http://my-receive-service', {
  collector: {
    emitters: [
      MetricCustomEmitter
    ]
  }
})

tracker.activate({ userId: 1 })
