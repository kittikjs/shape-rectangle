import { assert } from 'chai';
import sinon from 'sinon';
import Rectangle from '../../src/Rectangle';
import { Cursor, COLORS } from 'kittik-cursor';

describe('Shape::Rectangle', () => {
  it('Should properly render with default options', () => {
    let cursor = Cursor.create();
    let rectangle = new Rectangle();
    let mock = sinon.mock(cursor);

    mock.expects('background').never();
    mock.expects('foreground').never();
    mock.expects('moveTo').exactly(7).returns(cursor);
    mock.expects('write').exactly(6).returns(cursor);

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

    mock.expects('background').once().withArgs(11);
    mock.expects('foreground').once().withArgs(0);
    mock.expects('moveTo').exactly(13).returns(cursor);
    mock.expects('write').exactly(12).returns(cursor);

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
        alignX: 'none',
        alignY: 'none',
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
          options: {
            interval: 100
          }
        }
      }
    };

    let rectangle = Rectangle.fromObject(obj);
    assert.instanceOf(rectangle, Rectangle);
    assert.equal(rectangle.getText(), 'test');
    assert.equal(rectangle.getWidth(), 30);
    assert.equal(rectangle.getHeight(), 50);
    assert.equal(rectangle.getX(), 0);
    assert.equal(rectangle.getY(), 0);
    assert.isUndefined(rectangle.getBackground());
    assert.isUndefined(rectangle.getForeground());
    assert.equal(rectangle.getAnimationName(), 'print');
    assert.deepEqual(rectangle.getAnimationOptions(), {interval: 100});
    assert.ok(rectangle.isAnimated());
  });
});
