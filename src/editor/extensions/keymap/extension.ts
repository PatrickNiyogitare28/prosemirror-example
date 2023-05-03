import { Schema } from "prosemirror-model"
import { Plugin } from "prosemirror-state"
import { keymap } from "prosemirror-keymap"
import { history } from "prosemirror-history"
import { dropCursor } from "prosemirror-dropcursor"
import { gapCursor } from "prosemirror-gapcursor"
import { baseKeymap } from "prosemirror-commands"

import { buildKeyMap } from "./keymap"
import { buildInputRules } from "./inputrules"

import { Extension } from "../../core/extension"

export class KeyMapExtension extends Extension {
  addPlugins = (schema: Schema, plugins: Plugin[]): Plugin[] => [
    ...plugins,
    buildInputRules(schema),
    keymap(buildKeyMap(schema)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    history()
  ]
}
