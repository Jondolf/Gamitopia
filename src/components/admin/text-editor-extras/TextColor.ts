//@ts-nocheck
import { Mark } from 'tiptap';
import { toggleMark } from 'tiptap-commands';

export default class TextColor extends Mark {
  constructor(private color: string) {
    super();
  }

  get name() {
    return 'textColor';
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: 'inherit'
        }
      },
      parseDOM: [
        {
          tag: 'span'
        }
      ],
      toDOM: mark => [
        'span',
        {
          style: `color: ${this.colors}`
        },
        0
      ]
    };
  }

  set textColor(colorRgba: string) {
    this.color = colorRgba;
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs);
  }
}
