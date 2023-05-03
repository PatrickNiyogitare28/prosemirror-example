import { EditorView } from "prosemirror-view";

export const isMac =
  typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;

export const getPositionOffset = (view: EditorView, from: number) => {
  const $from = view.state.doc.resolve(from);
  const parentElement = view.nodeDOM($from.before()) as HTMLElement;
  const parentRect = parentElement.getBoundingClientRect();
  const coords = view.coordsAtPos(from);

  return {
    targetElement: parentElement,
    offset: {
      top: coords.top - parentRect.top,
      left: coords.left - parentRect.left,
      right: coords.right - parentRect.right,
      bottom: coords.bottom - parentRect.bottom
    }
  };
};
