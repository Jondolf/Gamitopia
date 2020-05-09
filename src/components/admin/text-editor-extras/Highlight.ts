//@ts-nocheck
import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

export default class Highlight extends Mark {
  get name() {
    return 'highlight';
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: 'rgba(255, 255, 0, 0.75)'
        }
      },
      parseDOM: [
        {
          tag: 'mark'
        }
      ],
      toDOM: (mark) => [
        'mark',
        {
          style: `background:${mark.attrs.color}`
        },
        0
      ]
    };
  }

  commands({ type }) {
    return (attrs) => toggleMark(type, attrs);
  }
}
