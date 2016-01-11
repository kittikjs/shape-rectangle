"use strict";

const Rectangle = require('../lib/Rectangle').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

Rectangle.create({
  text: 'Rectangle',
  x: 'center',
  y: 2,
  width: 15,
  height: 5,
  background: 'green',
  foreground: 'black'
}).render(cursor);

Rectangle.create({
  text: 'Banana, Banana!!!',
  x: 'center',
  y: 'middle',
  width: '50%',
  height: 5,
  background: 'dark_blue',
  foreground: 'white'
}).render(cursor);

cursor.flush();
