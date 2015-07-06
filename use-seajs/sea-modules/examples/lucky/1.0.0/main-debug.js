if (document.attachEvent) {
    alert("这个例子不支持 Old IE 哦");
}

define("examples/lucky/1.0.0/main-debug", [ "./data-debug", "./lucky-debug", "jquery-debug", "jquery-easing-debug", "./user-debug" ], function(require) {
    var data = require("./data-debug");
    var lucky = require("./lucky-debug");
    lucky.init(data);
});

define("examples/lucky/1.0.0/data-debug", [], [ "梓胥", "李磊", "俊义", "兰玉", "泥巴", "对剑", "希普", "牧木", "夏雩", "衡芜", "钝刀", "苍新", "琳心", "玉鼎", "冯衡", "伍举", "长松", "卫海", "伯川", "道潜", "丁勉", "竹棒", "妙才", "许由", "祢衡", "赵盾", "斗子文", "寇恂", "极天", "秦天", "裴秀", "花朝", "静俭", "墨颜", "王维", "马武", "公孙龙", "甘德", "流珠", "路悠", "樽空", "沐峰", "清筠", "绝伦", "星辰", "羽单", "伯兮", "郝思文", "聂壹", "南岸", "明恽", "君乾", "飞天", "文赢", "义均", "文和", "曹彬", "晁错", "兔葵", "苏星河", "太常", "北湖", "弘殷", "吕蒙", "颜良", "庄辛", "崇幻", "贝儿", "柏平", "小毛", "战尘", "子盛", "问柏", "湛然", "独慕", "浴尘", "公与", "桑美", "晏婴", "严成方", "连挚", "汪信之", "楚天", "良臣", "暮城", "塔石", "薇达", "行洋", "明何", "昔空", "蓝玉", "韩当", "丛英", "吞佛", "真岚", "仲文", "吕方", "郑天寿", "一恒", "誉少", "无竞", "九弦", "玉伯", "冒顿", "啸生", "尹曰", "臻儿", "籽沐", "余化", "玉郎", "右丞", "默哈", "血诺", "桐杰", "镜曦", "沉鱼", "贯高", "陆辉", "浩初", "天材", "偏右", "云谦", "乔花", "展新", "张初尘", "宫煌", "宗玄", "一正", "若夷", "普渡", "晴汐", "徒离", "仲景", "大禹", "徐盛", "木合", "郭淮", "方嘉", "李渔", "长皓", "渔樵", "惜年", "沧溟", "东隅", "海涛", "磻溪" ]);

define("examples/lucky/1.0.0/lucky-debug", [ "jquery-debug", "jquery-easing-debug", "examples/lucky/1.0.0/user-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    require("jquery-easing-debug");
    var User = require("examples/lucky/1.0.0/user-debug");
    var HIT_SPEED = 100;
    var RIGIDITY = 4;
    module.exports = {
        users: [],
        init: function(data) {
            $("#container").css("background", "none");
            this.data = data;
            this.users = data.map(function(name) {
                return new User(name, data[name]);
            });
            this._bindUI();
        },
        _bindUI: function() {
            var that = this;
            // bind button
            var trigger = document.querySelector("#go");
            trigger.innerHTML = trigger.getAttribute("data-text-start");
            trigger.addEventListener("click", go, false);
            function go() {
                if (trigger.getAttribute("data-action") === "start") {
                    trigger.setAttribute("data-action", "stop");
                    trigger.innerHTML = trigger.getAttribute("data-text-stop");
                    that.start();
                } else {
                    trigger.setAttribute("data-action", "start");
                    trigger.innerHTML = trigger.getAttribute("data-text-start");
                    that.stop();
                }
            }
            // bind #lucky-balls
            $("#lucky-balls").on("click", "li", function(e) {
                var el = $(e.target);
                var name = el.text();
                that.addItem(name);
                if (trigger.getAttribute("data-action") === "start") {
                    that.hit();
                }
                el.remove();
            });
            // bind #balls
            $("#balls").on("click", "li", function(e) {
                var el = $(e.target);
                var name = el.text();
                for (var i = 0; i < that.users.length; i++) {
                    var user = that.users[i];
                    if (user.name === name) {
                        if (!that.moveLucky() && that.luckyUser !== user) {
                            trigger.setAttribute("data-action", "start");
                            trigger.innerHTML = trigger.getAttribute("data-text-start");
                            that.setLucky(user);
                        }
                        break;
                    }
                }
            });
            // bind keydown
            document.addEventListener("keydown", function(ev) {
                if (ev.keyCode == "32") {
                    go();
                } else if (ev.keyCode == "27") {
                    that.moveLucky();
                    $("#lucky-balls li").eq(0).click();
                }
            }, false);
        },
        start: function() {
            this.timer && clearTimeout(this.timer);
            this.moveLucky();
            this.users.forEach(function(user) {
                user.start();
            });
        },
        stop: function() {
            var users = this.users;
            var z = 0, lucky = users[0];
            users.forEach(function(user) {
                user.stop();
                if (z < user.zIndex) {
                    lucky = user;
                    z = user.zIndex;
                }
            });
            lucky.bang();
            this.hit();
            this.luckyUser = lucky;
        },
        removeItem: function(item) {
            for (var i = 0; i < this.users.length; i++) {
                var user = this.users[i];
                if (user === item) {
                    this.users.splice(i, 1);
                }
            }
        },
        addItem: function(name) {
            this.users.push(new User(name));
        },
        moveLucky: function() {
            var luckyUser = this.luckyUser;
            if (luckyUser) {
                luckyUser.el[0].style.cssText = "";
                luckyUser.el.prependTo("#lucky-balls");
                this.removeItem(luckyUser);
                this.luckyUser = null;
                return true;
            } else {
                return false;
            }
        },
        setLucky: function(item) {
            this.users.forEach(function(user) {
                user.stop();
            });
            this.luckyUser = item;
            item.bang();
            this.hit();
        },
        hit: function() {
            var that = this;
            var hitCount = 0;
            var users = this.users;
            users.forEach(function(user) {
                user.beginHit();
            });
            for (var i = 0; i < users.length; i++) {
                for (var j = i + 1; j < users.length; j++) {
                    if (isOverlap(users[i], users[j])) {
                        hit(users[i], users[j]);
                        hitCount++;
                    }
                }
            }
            users.forEach(function(user) {
                user.hitMove();
            });
            if (hitCount > 0) {
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(function() {
                    that.hit();
                }, HIT_SPEED);
            }
        }
    };
    // Helpers
    function getOffset(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }
    function isOverlap(a, b) {
        return getOffset(a, b) <= (a.width + b.width) / 2;
    }
    function hit(a, b) {
        var yOffset = b.y - a.y;
        var xOffset = b.x - a.x;
        var offset = getOffset(a, b);
        var power = Math.ceil(((a.width + b.width) / 2 - offset) / RIGIDITY);
        var yStep = yOffset > 0 ? Math.ceil(power * yOffset / offset) : Math.floor(power * yOffset / offset);
        var xStep = xOffset > 0 ? Math.ceil(power * xOffset / offset) : Math.floor(power * xOffset / offset);
        if (a.lucky) {
            b._xMove += xStep * 2;
            b._yMove += yStep * 2;
        } else if (b.lucky) {
            a._xMove += xStep * -2;
            a._yMove += yStep * -2;
        } else {
            a._yMove += -1 * yStep;
            b._yMove += yStep;
            a._xMove += -1 * xStep;
            b._xMove += xStep;
        }
    }
});

define("examples/lucky/1.0.0/user-debug", [ "jquery-debug" ], function(require, exports, module) {
    var $ = require("jquery-debug");
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
        this.el = $("<li>" + this.name + "</li>").appendTo("#balls");
        this.width = this.el.width();
        this.height = this.el.height();
    };
    User.prototype.move = function(callback) {
        this.left = r(0, CANVAS_WIDTH - this.width);
        this.top = r(0, CANVAS_HEIGHT - this.height);
        this.zIndex = r(0, MAX_ZINDEX);
        this.reflow(callback);
    };
    User.prototype.reflow = function(callback, direct) {
        this.x = this.left + this.width / 2;
        this.y = this.top + this.height / 2;
        this.el[0].style.zIndex = this.zIndex;
        if (direct) {
            this.el[0].style.left = this.left;
            this.el[0].style.top = this.top;
        } else {
            this.el.animate({
                left: this.left,
                top: this.top
            }, r(DURATION_MIN, DURATION_MAX), "easeOutBack", callback);
        }
    };
    User.prototype.start = function() {
        this.reset();
        this.moving = true;
        this.autoMove();
    };
    User.prototype.reset = function() {
        this.el.stop(true, true);
        this.lucky = false;
        this.el[0].className = "";
        this.el[0].style.width = BALL_WIDTH + "px";
        this.el[0].style.height = BALL_HEIGHT + "px";
        this.width = this.el.width();
        this.height = this.el.height();
        this._maxTop = CANVAS_HEIGHT - this.height;
        this._maxLeft = CANVAS_WIDTH - this.width;
    };
    User.prototype.autoMove = function() {
        var that = this;
        if (this.moving) {
            this.move(function() {
                that.autoMove();
            });
        }
    };
    User.prototype.stop = function() {
        this.el.stop(true, true);
        this.moving = false;
    };
    User.prototype.bang = function() {
        this.lucky = true;
        this.el[0].className = "selected";
        this.width = LUCKY_BALL_WIDTH;
        this.height = LUCKY_BALL_HEIGHT;
        this.left = (CANVAS_WIDTH - this.width) / 2;
        this.top = (CANVAS_HEIGHT - this.height) / 2;
        this.el.animate({
            left: this.left,
            top: this.top,
            width: this.width,
            height: this.height
        }, ZOOM_DURATION);
    };
    User.prototype.beginHit = function() {
        this._xMove = 0;
        this._yMove = 0;
    };
    User.prototype.hitMove = function() {
        this.left += this._xMove;
        this.top += this._yMove;
        this.top = this.top < 0 ? 0 : this.top > this._maxTop ? this._maxTop : this.top;
        this.left = this.left < 0 ? 0 : this.left > this._maxLeft ? this._maxLeft : this.left;
        this.reflow(null, false);
    };
    // Helpers
    function r(from, to) {
        from = from || 0;
        to = to || 1;
        return Math.floor(Math.random() * (to - from + 1) + from);
    }
});
