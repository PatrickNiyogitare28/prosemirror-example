import { EditorView } from "prosemirror-view";
import { NodeType } from "prosemirror-model";
import { NodeWithPos } from "prosemirror-utils";

import { EditorSchema, Nodes } from "./types";

/**
 * Looks for the deepest wrapper node that is inside the current cursor selection and returns it if found.
 *
 * Just a subset of available node types are considered "wrappers": `blockquote`, `callout`, `code_block`.
 *
 * @param view The EditorView
 * @param type The wrapper type we're interested in.
 * If there's a deeper wrapper node not matching this given type, `null` is returned instead.
 */
export const findWrapperNode = (
  view: EditorView,
  type: NodeType<EditorSchema>
): NodeWithPos | null => {
  const wrapperTypes: Nodes[] = ["callout"];
  const { from, to } = view.state.selection;

  let activeNode: NodeWithPos = null;

  view.state.doc.nodesBetween(from, to, (node, pos) => {
    if (wrapperTypes.includes(node.type.name as Nodes)) {
      activeNode = { node, pos };
    }

    return true;
  });

  return activeNode?.node.type === type ? activeNode : null;
};
