import Tracker from '@gauf/tracker';

class CustomTracker extends Tracker {
  constructor(token, settings) {
    const url = 'console://reciever.service.com/client/{token}'.replace('{token}', token)
    console.log('Custom Tracker with URL', url);
    super(url, settings)
  }
}

const tracker = new CustomTracker('9a08b242bc3d6e056f3b48f9dfe0f65c')

tracker.activate({ userId: 1 })
