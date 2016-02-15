"use strict";

const Rectangle = require('../lib/Rectangle');
const cursor = require('kittik-cursor').create().resetTTY();

Rectangle.create({
  text: 'Text here!',
  x: 'center',
  y: 2,
  width: 40,
  background: 'green',
  foreground: 'black'
}).render(cursor);

Rectangle.create({
  text: 'Text here',
  x: 'center',
  y: 'middle',
  width: '50%',
  height: '20%',
  background: 'dark_blue'
}).render(cursor);

cursor.moveTo(1, process.stdout.rows).flush();
