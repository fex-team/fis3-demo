define(function(require){

  var Backbone = require('backbone');
  var app = require('./views/app');
  var Workspace = require('./routers/router');

  new Workspace();
	Backbone.history.start();

	new app();
});