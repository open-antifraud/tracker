import { Metrics } from "@gauf/tracker";
import * as msgpack from "msgpack-lite";

export default (metrics: Metrics): Uint8Array => msgpack.encode(metrics);
