define(['require', 'exports', 'module', '../simple/simple'], function(require, exports, module, simple1) {
    module.exports = 'commonjs1:' + simple1 + require('../simple/simple');
});