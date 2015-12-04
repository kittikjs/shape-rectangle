import { assert } from 'chai';
import sinon from 'sinon';
import Rectangle from '../../src/Rectangle';
import { Cursor, COLORS } from 'kittik-cursor';

describe('Shape::Rectangle', () => {
  it('Should properly render with default options', () => {
    let cursor = Cursor.create();
    let rectangle = new Rectangle();
    let mock = sinon.mock(cursor);

    mock.expects('fill').once().withArgs({
      x1: 10,
      y1: 10,
      x2: 24,
      y2: 14,
      background: undefined,
      foreground: undefined
    });
    mock.expects('setPosition').once().withArgs(17.5, 12.5).returns(cursor);
    mock.expects('write').once().withArgs('');

    rectangle.render(cursor);

    mock.verify();
  });

  it('Should properly render with custom options', () => {
    let cursor = Cursor.create();
    let mock = sinon.mock(cursor);
    let rectangle = new Rectangle({
      text: 'test',
      width: 11,
      height: 11,
      x: 1,
      y: 1,
      background: COLORS.YELLOW,
      foreground: COLORS.BLACK
    });

    mock.expects('fill').once().withArgs({
      x1: 1,
      y1: 1,
      x2: 11,
      y2: 11,
      background: 'yellow',
      foreground: 'black'
    });
    mock.expects('setPosition').once().withArgs(4.5, 6.5).returns(cursor);
    mock.expects('write').once().withArgs('test');

    rectangle.render(cursor);

    mock.verify();
  });

  it('Should properly serialize shape to Object representation', () => {
    let rectangle = new Rectangle();
    let obj = rectangle.toObject();

    assert.deepEqual(obj, {
      name: 'Rectangle',
      options: {
        text: '',
        width: 15,
        height: 5,
        x: 10,
        y: 10,
        background: undefined,
        foreground: undefined,
        animation: undefined
      }
    });
  });

  it('Should properly create rectangle from Object representation', () => {
    let obj = {
      name: 'Rectangle',
      options: {
        text: 'test',
        width: 30,
        height: 50,
        x: 0,
        y: 0,
        background: undefined,
        foreground: undefined,
        animation: {
          name: 'print',
          interval: 100
        }
      }
    };

    let rectangle = Rectangle.fromObject(obj);
    assert.instanceOf(rectangle, Rectangle);
    assert.equal(rectangle.getText(), 'test');
    assert.equal(rectangle.getWidth(), 30);
    assert.equal(rectangle.getHeight(), 50);
    assert.deepEqual(rectangle.getPosition(), {x: 0, y: 0});
    assert.isUndefined(rectangle.getBackground());
    assert.isUndefined(rectangle.getForeground());
    assert.deepEqual(rectangle.getAnimation(), {name: 'print', interval: 100});
    assert.ok(rectangle.isAnimated());
  });
});
