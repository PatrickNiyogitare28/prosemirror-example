import OrderedMap from "orderedmap";
import { Schema, NodeSpec, MarkSpec } from "prosemirror-model";
import { Plugin } from "prosemirror-state";

import { NodeViewsSpec } from "./types";

export class Extension {
  addNodes(nodes: OrderedMap<NodeSpec>): OrderedMap<NodeSpec> {
    return nodes;
  }

  addMarks(marks: OrderedMap<MarkSpec>): OrderedMap<MarkSpec> {
    return marks;
  }

  addPlugins(schema: Schema, plugins: Plugin[]): Plugin[] {
    return plugins;
  }

  addNodeViews(schema: Schema, nodeViews: NodeViewsSpec): NodeViewsSpec {
    return nodeViews;
  }

  addProviders(providers: { [key: string]: any }): { [key: string]: any } {
    return providers;
  }
}
