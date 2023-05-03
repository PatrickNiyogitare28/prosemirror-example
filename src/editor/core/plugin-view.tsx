import React from "react";
import { render } from "react-dom";
import { EditorState, PluginKey } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

export interface PluginViewComponentProps {
  view: EditorView;
  prevState?: EditorState | null;
  pluginKey?: PluginKey | null;
}

/**
 * A generic plugin view that mounts the given react component.
 * The react component must define a prop called `view`, which is the prosemirror's EditorView instance.
 */
export class PluginView {
  private root = document.createElement("div");

  constructor(
    view: EditorView,
    private Component: React.FunctionComponent<PluginViewComponentProps>,
    private pluginKey: PluginKey | null = null,
    private props: { [Key: string]: any } = {}
  ) {
    view.dom.parentNode?.appendChild(this.root);
    this.render(view);
  }

  update(view: EditorView, prevState: EditorState): void {
    this.render(view, prevState);
  }

  private render(view: EditorView, prevState?: EditorState): void {
    render(
      <this.Component
        view={view}
        prevState={prevState}
        pluginKey={this.pluginKey}
        {...this.props}
      />,
      this.root
    );
  }
}
