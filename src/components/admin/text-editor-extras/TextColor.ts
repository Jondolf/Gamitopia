//@ts-nocheck
import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

export default class TextColor extends Mark {
  get name() {
    return 'textColor';
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: 'rgba(255, 0, 0, 1)'
        }
      },
      parseDOM: [
        {
          tag: 'span'
        }
      ],
      toDOM: (mark) => [
        'span',
        {
          style: `color:${mark.attrs.color}`
        },
        0
      ]
    };
  }

  commands({ type }) {
    return (attrs) => toggleMark(type, attrs);
  }
}
