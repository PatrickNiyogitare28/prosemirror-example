import React from "react";
import { createPortal } from "react-dom";

import { findWrapperNode } from "../../../../core/helpers";
import { EditorView } from "../../../../core/types";
import { CalloutNodeAttrs, CalloutType } from "../../types";
import { EditorCalloutMenu } from "../EditorCalloutMenu/EditorCalloutMenu";

export interface EditorCalloutMenuPluginViewProps {
  view: EditorView;
}

export const EditorCalloutMenuPluginView: React.FC<EditorCalloutMenuPluginViewProps> = ({
  view
}) => {
  const target = findWrapperNode(view, view.state.schema.nodes.callout);

  if (!target) {
    return null;
  }

  const handleCalloutTypeChange = (type: CalloutType): void => {
    const { node, pos } = target;
    const tr = view.state.tr;
    tr.setNodeMarkup(pos, null, { ...node.attrs, type } as CalloutNodeAttrs);
    view.dispatch(tr);
    view.focus();
  };

  const handleRemove = (): void => {
    const { node, pos } = target;
    const state = view.state;
    const tr = state.tr.deleteRange(pos, pos + node.nodeSize);
    view.dispatch(tr);
    view.focus();
  };

  const attrs = target.node.attrs as CalloutNodeAttrs;

  return createPortal(
    <div>
      <EditorCalloutMenu
        type={attrs.type}
        onTypeChange={handleCalloutTypeChange}
        onRemove={handleRemove}
      />
    </div>,
    document.body
  );
};
