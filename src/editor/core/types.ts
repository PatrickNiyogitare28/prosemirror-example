import { Node as ProseMirrorNode } from "prosemirror-model";
import { Schema } from "prosemirror-model";
import {
  Decoration,
  EditorView as ProseMirrorEditorView,
  NodeView
} from "prosemirror-view";

export type Nodes =
  | "doc"
  | "heading"
  | "text"
  | "paragraph"
  | "bullet_list"
  | "ordered_list"
  | "list_item"
  | "callout";

export type Marks =
  | "color"
  | "em"
  | "highlight"
  | "link"
  | "strikethrough"
  | "strong"
  | "underline";

/**
 * A copy of ProseMirror's `Schema` type, defined with the correct `Nodes` and `Marks` types.
 * Literally `Schema<Nodes, Marks>`.
 */
export type EditorSchema = Schema<Nodes, Marks>;

/**
 * A copy of ProseMirror's `EditorView` type, defined with the correct Schema type.
 * Literally `EditorView<EditorSchema>`.
 */
export type EditorView = ProseMirrorEditorView<EditorSchema>;

export interface NodeViewsSpec {
  [name: string]: (
    node: ProseMirrorNode,
    view: EditorView,
    getPos: (() => number) | boolean,
    decorations: Decoration[]
  ) => NodeView;
}
