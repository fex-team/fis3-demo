
if (document.attachEvent) {
  alert("这个例子不支持 Old IE 哦")
}

define(function(require) {

  var data = require('./data');
  var lucky = require('./lucky');

  lucky.init(data);

});

