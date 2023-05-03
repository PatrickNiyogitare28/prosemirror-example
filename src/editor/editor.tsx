import "./editor.css";

import React from "react";

import { useProseMirror } from "./core/hooks";
import { Extension } from "./core/extension";
import { CalloutExtension } from "./extensions/callout/extension";
import { editorValue } from "./constants";

interface ProseMirrorEditorProps {
  value: object | null;
  extensions: Extension[];
}

interface SandboxEditorProps {
  extensions?: Extension[];
}

const allExtensions: Extension[] = [new CalloutExtension()];

export const Editor = ({
  value,
  extensions,
  ...otherProps
}: ProseMirrorEditorProps) => {
  const { ...editorProps } = useProseMirror({ extensions, value });

  return (
    <div className="editor-sandbox">
      <div {...editorProps} {...otherProps} />
    </div>
  );
};

export const SandboxEditor: React.FC<SandboxEditorProps> = () => {
  return <Editor value={editorValue} extensions={allExtensions} />;
};
