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
      x2: 25,
      y2: 15,
      background: undefined,
      foreground: undefined
    });
    mock.expects('setPosition').once().withArgs(18, 13).returns(cursor);
    mock.expects('write').once().withArgs('');

    rectangle.render(cursor);

    mock.verify();
  });

  it('Should properly render with custom options', () => {
    let cursor = Cursor.create();
    let mock = sinon.mock(cursor);
    let rectangle = new Rectangle({
      text: 'test',
      width: 10,
      height: 10,
      x: 0,
      y: 0,
      background: COLORS.YELLOW,
      foreground: COLORS.BLACK
    });

    mock.expects('fill').once().withArgs({
      x1: 0,
      y1: 0,
      x2: 10,
      y2: 10,
      background: 'yellow',
      foreground: 'black'
    });
    mock.expects('setPosition').once().withArgs(3, 5).returns(cursor);
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
        foreground: undefined
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
        foreground: undefined
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
  });
});
