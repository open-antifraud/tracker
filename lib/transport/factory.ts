import ProtocolConsole from "@gauf/protocols/console";
import ProtocolHttpAjax from "@gauf/protocols/http/ajax";
import ProtocolHttpBeacon from "@gauf/protocols/http/beacon";
import ProtocolWebsocket from "@gauf/protocols/websocket";
import Transport from "@gauf/transport";

type Protocol = string;

export type Settings = Protocol | {
  protocol: Protocol,
};

const extractProtocolFromURL = (url: string): string | undefined => {
  if (/^http[s]?:\/\//.test(url)) {
    if ("sendBeacon" in navigator) {
      return "http:beacon";
    }
    if ("XMLHttpRequest" in window) {
      return "http:xhr";
    }
  }
  if (/^ws[s]?:\/\//.test(url)) {
    return "ws";
  }
  if (/^console:\/\//.test(url)) {
    return "console";
  }
};

const extractProtocolFromSettings = (settings?: Settings): string | undefined => {
  if (typeof settings === "string") {
    return settings;
  }
  if (typeof settings === "object" && typeof settings.protocol === "string") {
    return settings.protocol;
  }
};

export default class TransportFactory {
  public createTransport(url: string, settings?: Settings): Transport {
    const protocol = extractProtocolFromSettings(settings) || extractProtocolFromURL(url);

    if (protocol === "http:beacon") {
      return new ProtocolHttpBeacon(url);
    }
    if (protocol === "http:xhr") {
      return new ProtocolHttpAjax(url);
    }
    if (protocol === "ws") {
      return new ProtocolWebsocket(url);
    }

    return new ProtocolConsole();
  }
}
