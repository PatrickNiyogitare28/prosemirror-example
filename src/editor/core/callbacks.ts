import { EditorState } from "prosemirror-state";
import { Plugin, PluginKey, Transaction } from "prosemirror-state";

const callbacksKey = new PluginKey("callbacks");

export const callbacks = (data: { [key: string]: (...props: any) => void }) =>
  new Plugin({
    key: callbacksKey,
    state: {
      init: () => data,
      apply: (tr: Transaction, value: any): any => value
    }
  });

export const getCallback = (state: EditorState, name: string) =>
  callbacksKey.getState(state)[name];

export const createPortal = (state: EditorState, portal: any) =>
  getCallback(state, "createPortal")(portal);
