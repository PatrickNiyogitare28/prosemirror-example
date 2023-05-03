import OrderedMap from "orderedmap";
import React, { useRef, useEffect, useCallback } from "react";

import {
  Schema,
  NodeSpec,
  MarkSpec,
  Node as ProseMirrorNode
} from "prosemirror-model";
import { EditorState, Plugin } from "prosemirror-state";
import { schema as baseSchema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";

import { callbacks } from "./callbacks";
import { useProseMirrorContext } from "./provider";
import { Extension } from "./extension";
import { NodeViewsSpec } from "./types";
import { EditorView } from "./view";

interface ProseMirrorOutput {
  ref: React.RefObject<any>;
}

type ProseMirrorProps = {
  value: object | null;
  extensions: Extension[];
};

export const initialDoc = {
  type: "doc",
  content: [{ type: "paragraph" }]
};

export const useProseMirror = ({
  value,
  extensions
}: ProseMirrorProps): ProseMirrorOutput => {
  const ref = useRef<HTMLDivElement>();
  const viewRef = useRef<EditorView>(null!);
  const { createPortal } = useProseMirrorContext();
  const handleCreatePortal = useCallback(createPortal, []);

  // initiate component
  useEffect(() => {
    const nodes = extensions.reduce<OrderedMap<NodeSpec>>(
      (acc, ext) => ext.addNodes(acc),
      addListNodes(baseSchema.spec.nodes, "paragraph block*", "block")
    );
    const marks = extensions.reduce<OrderedMap<MarkSpec>>(
      (acc, ext) => ext.addMarks(acc),
      baseSchema.spec.marks as OrderedMap<MarkSpec>
    );

    const schema = new Schema({ nodes, marks });

    const plugins: Plugin[] = [
      ...extensions.reduce<Plugin[]>(
        (acc, ext) => ext.addPlugins(schema, acc),
        []
      ),
      ...exampleSetup({ schema }),
      callbacks({ createPortal: handleCreatePortal })
    ];

    const doc = ProseMirrorNode.fromJSON(schema, value || initialDoc);
    const state = EditorState.create({ schema, doc, plugins });

    const nodeViews = extensions.reduce<NodeViewsSpec>(
      (acc, ext) => ext.addNodeViews(schema, acc),
      {}
    );

    viewRef.current = new EditorView(ref.current, { state, nodeViews });

    return () => viewRef.current.destroy();
  }, []);

  return { ref };
};
