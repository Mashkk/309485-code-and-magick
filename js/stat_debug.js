'use strict';

var data = JSON.parse('{"names":["Катя","Кекс","Вы","Игорь"],"times":[3752.3678606577996,4128.791736333918,3020,3896.2973807713906]}')

setTimeout(function(){
  var names = data.names;
  var times = data.times;
  var ctx = Game.canvas.getContext("2d");
  window.renderStatistics(ctx, names, times)
}, 100)
