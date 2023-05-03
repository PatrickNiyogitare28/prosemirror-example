import {
  wrapIn,
  setBlockType,
  chainCommands,
  toggleMark,
  exitCode,
  joinUp,
  joinDown,
  lift,
  selectParentNode
} from "prosemirror-commands";
import { Schema } from "prosemirror-model";
import {
  wrapInList,
  splitListItem,
  sinkListItem
} from "prosemirror-schema-list";
import { undo, redo } from "prosemirror-history";
import { undoInputRule } from "prosemirror-inputrules";
import { EditorState, Transaction } from "prosemirror-state";

import { isMac } from "../../core/utils";

// Inspect the given schema looking for marks and nodes from the
// basic schema, and if found, add key bindings related to them.
// This will add:
//
// * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
// * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
// * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
// * **Ctrl-Shift-0** for making the current textblock a paragraph
// * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
//   textblock a heading of the corresponding level
// * **Ctrl-Shift-Backslash** to make the current textblock a code block
// * **Ctrl-Shift-8** to wrap the selection in an ordered list
// * **Ctrl-Shift-9** to wrap the selection in a bullet list
// * **Ctrl->** to wrap the selection in a block quote
// * **Enter** to split a non-empty textblock in a list item while at
//   the same time splitting the list item
// * **Mod-Enter** to insert a hard break
// * **Mod-_** to insert a horizontal rule
// * **Backspace** to undo an input rule
// * **Alt-ArrowUp** to `joinUp`
// * **Alt-ArrowDown** to `joinDown`
// * **Mod-BracketLeft** to `lift`
// * **Escape** to `selectParentNode`

export const buildKeyMap = (schema: Schema) => {
  let keyMap = {
    "Mod-z": undo,
    "Shift-Mod-z": redo,
    Backspace: undoInputRule
  };
  if (!isMac) keyMap = { ...keyMap, ...{ "Mod-y": redo } };

  keyMap = {
    ...keyMap,
    ...{
      "Alt-ArrowUp": joinUp,
      "Alt-ArrowDown": joinDown,
      "Mod-[": lift,
      Escape: selectParentNode
    }
  };

  if (schema.marks.strong)
    keyMap = {
      ...keyMap,
      ...{
        "Mod-b": toggleMark(schema.marks.strong),
        "Mod-B": toggleMark(schema.marks.strong)
      }
    };
  if (schema.marks.em)
    keyMap = {
      ...keyMap,
      ...{
        "Mod-i": toggleMark(schema.marks.em),
        "Mod-I": toggleMark(schema.marks.em)
      }
    };
  if (schema.marks.code)
    keyMap = {
      ...keyMap,
      ...{ "Mod-`": toggleMark(schema.marks.code) }
    };
  if (schema.nodes.bullet_list)
    keyMap = {
      ...keyMap,
      ...{ "Shift-Ctrl-8": wrapInList(schema.nodes.bullet_list) }
    };
  if (schema.nodes.ordered_list)
    keyMap = {
      ...keyMap,
      ...{ "Shift-Ctrl-9": wrapInList(schema.nodes.ordered_list) }
    };
  if (schema.nodes.blockquote)
    keyMap = {
      ...keyMap,
      ...{ "Ctrl->": wrapIn(schema.nodes.blockquote) }
    };
  if (schema.nodes.hard_break) {
    let cmd = chainCommands(exitCode, (state, dispatch) => {
      if (!dispatch) return false;
      dispatch(
        state.tr
          .replaceSelectionWith(schema.nodes.hard_break.create())
          .scrollIntoView()
      );
      return true;
    });

    keyMap = { ...keyMap, ...{ "Mod-Enter": cmd, "Shift-Enter": cmd } };
    if (isMac) keyMap = { ...keyMap, ...{ "Ctrl-Enter": cmd } };
  }
  if (schema.nodes.list_item)
    keyMap = {
      ...keyMap,
      ...{
        Enter: splitListItem(schema.nodes.list_item),
        // "Mod-[": liftListItem(schema.nodes.list_item),
        "Mod-]": sinkListItem(schema.nodes.list_item)
      }
    };
  if (schema.nodes.paragraph)
    keyMap = {
      ...keyMap,
      ...{ "Shift-Ctrl-0": setBlockType(schema.nodes.paragraph) }
    };
  if (schema.nodes.code_block)
    keyMap = {
      ...keyMap,
      ...{ "Shift-Ctrl-\\": setBlockType(schema.nodes.code_block) }
    };
  if (schema.nodes.heading) {
    const headingLevels = Array.from({ length: 6 }, (_, i) => ++i);
    const headingMap = headingLevels.reduce(
      (acc, level) => ({
        ...acc,
        ...{
          [`Shift-Ctrl-${level}`]: setBlockType(schema.nodes.heading, { level })
        }
      }),
      {}
    );

    keyMap = { ...keyMap, ...headingMap };
  }

  if (schema.nodes.horizontal_rule)
    keyMap = {
      ...keyMap,
      ...{
        "Mod-_": (state: EditorState, dispatch: (tr: Transaction) => void) => {
          dispatch(
            state.tr
              .replaceSelectionWith(schema.nodes.horizontal_rule.create())
              .scrollIntoView()
          );
          return true;
        }
      }
    };

  return keyMap;
};
