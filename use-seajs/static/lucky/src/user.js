define(function(require, exports, module) {

  var $ = require('jquery');

  var CANVAS_HEIGHT = 500;
  var CANVAS_WIDTH = 900;

  var BALL_WIDTH = 40;
  var BALL_HEIGHT = 40;
  var LUCKY_BALL_WIDTH = 120;
  var LUCKY_BALL_HEIGHT = 120;
  var MAX_ZINDEX = 100;

  var DURATION_MIN = 100;
  var DURATION_MAX = 500;
  var ZOOM_DURATION = 500;


  function User(name, options) {
    this.name = name;
    this.options = options || {};

    this.el = null;
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.x = 0;
    this.y = 0;

    this.moving = false;
    this.lucky = false;

    this.createEl();
    this.move();
  }

  module.exports = User;

  User.prototype.createEl = function() {
    this.el = $('<li>' + this.name + '</li>').appendTo('#balls');
    this.width = this.el.width();
    this.height = this.el.height();
  }

  User.prototype.move = function(callback) {
    this.left = r(0, CANVAS_WIDTH - this.width);
    this.top = r(0, CANVAS_HEIGHT - this.height);
    this.zIndex = r(0, MAX_ZINDEX);

    this.reflow(callback);
  }

  User.prototype.reflow = function(callback, direct) {
    this.x = this.left + this.width / 2;
    this.y = this.top + this.height / 2;
    this.el[0].style.zIndex = this.zIndex;

    if (direct) {
      this.el[0].style.left = this.left;
      this.el[0].style.top = this.top;
    }
    else {
      this.el.animate({
        'left': this.left,
        'top': this.top
      }, r(DURATION_MIN, DURATION_MAX), 'easeOutBack', callback);

    }
  }

  User.prototype.start = function() {
    this.reset();
    this.moving = true;
    this.autoMove();
  }

  User.prototype.reset = function() {
    this.el.stop(true, true);
    this.lucky = false;

    this.el[0].className = '';
    this.el[0].style.width = BALL_WIDTH + 'px';
    this.el[0].style.height = BALL_HEIGHT + 'px';
    this.width = this.el.width();
    this.height = this.el.height();

    this._maxTop = CANVAS_HEIGHT - this.height;
    this._maxLeft = CANVAS_WIDTH - this.width;
  }

  User.prototype.autoMove = function() {
    var that = this;

    if (this.moving) {
      this.move(function() {
        that.autoMove();
      });
    }
  }

  User.prototype.stop = function() {
    this.el.stop(true, true);
    this.moving = false;
  }

  User.prototype.bang = function() {
    this.lucky = true;
    this.el[0].className = 'selected';
    this.width = LUCKY_BALL_WIDTH;
    this.height = LUCKY_BALL_HEIGHT;
    this.left = (CANVAS_WIDTH - this.width) / 2;
    this.top = (CANVAS_HEIGHT - this.height) / 2;

    this.el.animate({
      'left': this.left,
      'top': this.top,
      'width': this.width,
      'height': this.height
    }, ZOOM_DURATION);
  }

  User.prototype.beginHit = function() {
    this._xMove = 0;
    this._yMove = 0;
  }

  User.prototype.hitMove = function() {
    this.left += this._xMove;
    this.top += this._yMove;

    this.top = this.top < 0 ? 0 : (this.top > this._maxTop ? this._maxTop : this.top);
    this.left = this.left < 0 ? 0 : (this.left > this._maxLeft ? this._maxLeft : this.left);

    this.reflow(null, false);
  }


  // Helpers

  function r(from, to) {
    from = from || 0;
    to = to || 1;
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

});

