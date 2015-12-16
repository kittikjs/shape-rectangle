"use strict";

const Rectangle = require('../lib/Rectangle').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

Rectangle.create({
  text: 'Rectangle',
  x: 20,
  y: 2,
  width: 15,
  height: 5,
  background: cursor.COLORS.GREEN,
  foreground: cursor.COLORS.BLACK
}).render(cursor);

Rectangle.create({
  text: 'Banana, Banana!!!',
  x: 40,
  y: 10,
  width: 30,
  height: 3,
  background: cursor.COLORS.DARK_BLUE,
  foreground: cursor.COLORS.WHITE
}).render(cursor);

cursor.flush();
