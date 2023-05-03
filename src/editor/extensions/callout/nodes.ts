import { NodeSpec } from 'prosemirror-model';

import { calloutTypes } from './constants';
import { CalloutNodeAttrs, CalloutType } from './types';

export const calloutNodes: Record<string, NodeSpec> = {
  callout: {
    group: 'block',
    content: 'block+',
    defining: true,
    selectable: false,
    isolating: true,
    attrs: {
      type: { default: CalloutType.info },
    },
    parseDOM: [
      {
        tag: 'div[data-callout]',
        getAttrs: (dom: HTMLElement) => {
          const type = dom.getAttribute('data-callout') as CalloutType;
          return calloutTypes.includes(type) ? { type } : false;
        },
      },
    ],
    toDOM: (node) => {
      const attrs = node.attrs as CalloutNodeAttrs;
      return [
        'div',
        { class: `callout callout--${attrs.type}`, 'data-callout': attrs.type },
        ['div', { class: 'callout__content' }, 0],
      ];
    },
  },
};
