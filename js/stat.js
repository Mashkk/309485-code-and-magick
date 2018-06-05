'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;

var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;

var Y_GAP = 25;
var BAR_GAP = 50;
var yBarStart = CLOUD_HEIGHT - (Y_GAP * 1.5 + BAR_HEIGHT);




var GAP = 10;
var FONT_GAP = 15;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function(ctx) {
  ctx.fillStyle = "#000";
  ctx.font = "16px PT Mono";
  ctx.textBaseline = "hanging";
  //TODO: massiv cikl
  ctx.fillText("Ура вы победили!", CLOUD_X + Y_GAP, Y_GAP);
  ctx.fillText("Список результатов:", CLOUD_X + Y_GAP, Y_GAP * 2);
}

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.7)");
  renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");
  renderText(ctx);

  ctx.fillStyle = "#000";
  var maxTime = getMaxElement(times);

  // ctx.fillText("Вы", CLOUD_X + BAR_GAP, CLOUD_HEIGHT - Y_GAP);
  // ctx.fillRect(CLOUD_X + BAR_GAP, yBarStart, BAR_WIDTH, BAR_HEIGHT);

  // ctx.fillText("Кекс", CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP), CLOUD_HEIGHT - Y_GAP);
  // ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, yBarStart, BAR_WIDTH, BAR_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    // TODO: SWAP X - Y
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - Y_GAP);
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, yBarStart, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    // ctx.fillRect(CLOUD_X + GAP + TEXT_WIDTH, CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
  }
};
