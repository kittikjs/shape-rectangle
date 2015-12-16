import Shape from 'kittik-shape-basic';

/**
 * Implements rectangle shape with text support.
 *
 * @since 1.0.0
 * @version 1.0.0
 */
export default class Rectangle extends Shape {
  render(cursor) {
    let text = this.getText();
    let width = this.getWidth();
    let height = this.getHeight();
    let x1 = this.getX();
    let y1 = this.getY();
    let x2 = x1 + width - 1;
    let y2 = y1 + height - 1;
    let background = this.getBackground();
    let foreground = this.getForeground();
    let filler = ' '.repeat(width);

    if (typeof background !== 'undefined') cursor.background(background);
    if (typeof foreground !== 'undefined') cursor.foreground(foreground);

    cursor.moveTo(x1, y1);

    while (y1 <= y2) {
      cursor.write(filler);
      cursor.moveTo(x1, ++y1);
    }

    cursor.moveTo(x1 + (width / 2 - text.length / 2), this.getY() + (height / 2)).write(text);

    return this;
  }
}
