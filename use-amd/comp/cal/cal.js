// @require /static/require.js

define(function (require, exports, module) {
    exports.add = function (a, b) {
        return a + b;
    };

    exports.div = function (a, b) {
        return a / b;
    };

    exports.mul = function (a, b) {
        return a * b;
    };

    exports.min = function (a, b) {
        return a - b;
    };
});