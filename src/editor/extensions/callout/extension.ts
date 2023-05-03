import OrderedMap from "orderedmap";
import { NodeSpec, Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";

import { Extension } from "../../core/extension";
import { PluginView } from "../../core/plugin-view";
import { NodeViewsSpec } from "../../core/types";

import { EditorCalloutMenuPluginView } from "./components/EditorCalloutMenuPluginView/EditorCalloutMenuPluginView";
import { calloutNodes } from "./nodes";
import { CalloutNodeView } from "./nodeviews";

export class CalloutExtension extends Extension {
  addNodes = (nodes: OrderedMap<NodeSpec>): OrderedMap<NodeSpec> => {
    return nodes.append(calloutNodes);
  };

  addNodeViews = (schema: Schema, nodeViews: NodeViewsSpec): NodeViewsSpec => {
    return {
      ...nodeViews,
      callout: (node, view, getPos) => new CalloutNodeView(node, view, getPos)
    };
  };

  addPlugins(schema: Schema, plugins: Plugin[]): Plugin[] {
    return plugins.concat([
      new Plugin({
        view: (view) => new PluginView(view, EditorCalloutMenuPluginView)
      })
    ]);
  }
}
