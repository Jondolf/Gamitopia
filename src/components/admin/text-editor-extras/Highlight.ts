//@ts-nocheck
import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

export default class Highlight extends Mark {
  constructor(private color: string) {
    super();
  }

  get name() {
    return 'highlight';
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: 'rgba(255, 255, 0, 1)'
        }
      },
      parseDOM: [
        {
          tag: 'mark'
        }
      ],
      toDOM: mark => [
        'mark',
        {
          style: `background: ${this.color ? this.color : mark.attrs.color}`
        },
        0
      ]
    };
  }

  set highlightColor(colorRgba: string) {
    this.color = colorRgba;
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs);
  }
}
