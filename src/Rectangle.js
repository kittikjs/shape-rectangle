import Shape from 'kittik-shape-basic';

/**
 * Implements rectangle shape with text support.
 *
 * @since 1.0.0
 */
export default class Rectangle extends Shape {
  render(cursor) {
    const text = this.getText();
    const width = this.getWidth();
    const height = this.getHeight();
    const x1 = this.getX();
    const y1 = this.getY();
    const x2 = x1 + width;
    const y2 = y1 + height;
    const background = this.getBackground();
    const foreground = this.getForeground();
    const filler = ' '.repeat(width);

    if (typeof background !== 'undefined') cursor.background(background);
    if (typeof foreground !== 'undefined') cursor.foreground(foreground);

    cursor.moveTo(x1, y1);

    for (let y = y1; y <= y2; y++) cursor.write(filler).moveTo(x1, y);

    cursor.moveTo(x1 + (width / 2 - text.length / 2), y1 + (height / 2)).write(text);

    return this;
  }
}
