export type Handlers = {
  onTap?: (button: number, x: number, y: number) => void;
  onMouseEvent?: (
    event: number,
    button: number,
    x: number,
    y: number
  ) => boolean;
  onScroll?: () => boolean;
  onRender?: () => boolean;
  resetCamera?: () => boolean;
};
