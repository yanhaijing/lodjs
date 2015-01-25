define(function(require, exports, module) {
    var simple1 = require('../simple/simple');
    var return0 = require('return');
    var exp = require('exp').exp;
    var mod = require('mod');

    module.exports = 'commonjs:' + simple1 + return0 + exp + mod;
});