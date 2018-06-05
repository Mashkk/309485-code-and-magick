'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var GAP = 10;
var Y_GAP = 25;
var BAR_GAP = 50;
var yBarStart = CLOUD_HEIGHT - (Y_GAP * 1.5 + MAX_BAR_HEIGHT);


var renderRect = function (ctx, opts) {
  ctx.fillStyle = opts.color;
  ctx.fillRect(opts.x, opts.y, opts.width, opts.heigth);
};

var renderText = function (ctx, opts) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(opts.text, opts.x, opts.y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

function getRandomNumber(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

var getColor = function (name) {
  return name.toLowerCase() === 'вы' ? 'rgb(255, 0, 0, 1)' : 'rgb(0, 0,' + getRandomNumber(100, 255) + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, {
    x: CLOUD_X + GAP,
    y: CLOUD_Y + GAP,
    color: 'rgba(0, 0, 0, 0.7)',
    width: CLOUD_WIDTH,
    heigth: CLOUD_HEIGHT
  });

  renderRect(ctx, {
    x: CLOUD_X,
    y: CLOUD_Y,
    color: 'rgba(255, 255, 255, 1)',
    width: CLOUD_WIDTH,
    heigth: CLOUD_HEIGHT
  });

  renderText(ctx, {
    text: 'Ура вы победили!',
    x: CLOUD_X + Y_GAP,
    y: Y_GAP
  });

  renderText(ctx, {
    text: 'Список результатов:',
    x: CLOUD_X + Y_GAP,
    y: Y_GAP * 1.8
  });

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
    var y = yBarStart + (MAX_BAR_HEIGHT - barHeight);
    var x = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;

    renderText(ctx, {
      text: names[i],
      x: x,
      y: CLOUD_HEIGHT - Y_GAP
    });

    renderText(ctx, {
      text: Math.round(times[i]),
      x: x,
      y: y - GAP * 1.8
    });

    renderRect(ctx, {
      color: getColor(names[i]),
      width: BAR_WIDTH,
      heigth: barHeight,
      x: x,
      y: y
    });
  }
};
