import { Transport } from "@gauf/tracker/transport";
import TransportConsole from "@gauf/tracker/transport/console";
import TransportHttpAjax, { Settings as SettingsAjax } from "@gauf/tracker/transport/http/ajax";
import TransportHttpBeacon from "@gauf/tracker/transport/http/beacon";
import TransportWebsocket from "@gauf/tracker/transport/websocket";

const extractProtocolFromURL = (url: string): string | undefined => {
  if (/^http[s]?:\/\//.test(url)) {
    return "http";
  }
  if (/^ws[s]?:\/\//.test(url)) {
    return "ws";
  }
  if (/^console:\/\//.test(url)) {
    return "console";
  }
};

export default class TransportFactory {
  public createTransport(url: string, settings?: object): Transport {
    const protocol = extractProtocolFromURL(url);
    if (protocol === "http") {
      if ("sendBeacon" in navigator) {
        return new TransportHttpBeacon(url);
      }
      if ("XMLHttpRequest" in window) {
        return new TransportHttpAjax(url, settings as SettingsAjax);
      }
    }
    if (protocol === "ws") {
      return new TransportWebsocket(url);
    }
    return new TransportConsole();
  }
}
