export type Extractor = (event: any) => object; // @TODO

export type Size = {
  readonly width: number;
  readonly height: number;
};

export type Position = {
  readonly x: number;
  readonly y: number;
};

export type DeviceOrientation = {
  readonly absolute: boolean;
  readonly alpha: number | null;
  readonly beta: number | null;
  readonly gamma: number | null;
};

const getWindowSize = (): Size => ({
  height: window.document.body.clientHeight,
  width: window.document.body.clientWidth,
});

const getScrollPosition = (): Position => ({
  x: window.scrollX,
  y: window.scrollY,
});

export const extractWindowSize: Extractor = () => getWindowSize();
export const extractWindowScroll: Extractor = () => getScrollPosition();

export const extractMousePosition: Extractor = (event: MouseEvent) => {
  const { clientX: x, clientY: y } = event;
  const size = getWindowSize();
  const scroll = getScrollPosition();

  const outside =
    x < scroll.x ||
    x > scroll.x + size.width ||
    y < scroll.y ||
    y > scroll.y + size.height;

  return { x, y /*, outside */ };
};

export const extractDeviceOrientation: Extractor = (event: DeviceOrientationEvent): DeviceOrientation => {
  return {
    absolute: event.absolute,
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
  };
};
