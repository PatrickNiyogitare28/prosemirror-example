import { EditorView as ProseMirrorEditorView } from "prosemirror-view";

export class EditorView extends ProseMirrorEditorView {
  removePluginsDomElements() {
    const viewDomChildren = this.dom.parentNode?.children || [];
    for (let item of Array.from(viewDomChildren)) {
      if (!item.classList.contains("ProseMirror")) {
        item.remove();
      }
    }
  }
}
