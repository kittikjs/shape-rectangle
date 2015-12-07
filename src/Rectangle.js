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
    let {x: x1, y: y1} = this.getPosition();
    let {x2, y2} = {x2: width + x1 - 1, y2: height + y1 - 1};
    let background = this.getBackground();
    let foreground = this.getForeground();

    cursor.fill({x1, y1, x2, y2, background, foreground});
    cursor.setPosition(x1 + (width / 2 - text.length / 2), y1 + (height / 2)).write(text);

    return this;
  }
}
