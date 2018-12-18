import { Metrics } from "@gauf/tracker";

export type Packer = (metrics: Metrics) => string | Blob;

export const packJSON = (metrics: Metrics): string => JSON.stringify(metrics) || "";
