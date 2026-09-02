// jsdom does not implement Pointer Events; provide a minimal polyfill so
// React's onPointer* handlers receive events with the fields the component
// reads (pointerId, clientX, buttons, modifier keys).
if (typeof window.PointerEvent === 'undefined') {
  class PointerEvent extends MouseEvent {
    pointerId: number;
    pointerType: string;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 1;
      this.pointerType = params.pointerType ?? 'mouse';
    }
  }

  // @ts-expect-error assigning polyfill onto the jsdom window
  window.PointerEvent = PointerEvent;
}

// jsdom does not implement pointer capture either.
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
  Element.prototype.hasPointerCapture = () => false;
}
