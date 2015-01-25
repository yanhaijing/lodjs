module('lodjs');

lodjs.config({
    baseUrl: 'js/',
    path: {
        sim: 'simple/'
    }
});

QUnit.test( "define", function(assert) {
    assert.expect(1);
    var done1 = assert.async();

    lodjs.use('define/object', function (exp) {
        assert.ok(exp.name === 'object.js', 'define/object');
        done1();
    });
});

QUnit.test( "simple", function(assert) {
    assert.expect(2);
    var done1 = assert.async();
    var done2 = assert.async();

    lodjs.use('simple/simple', function (simple) {
        assert.ok(simple === 'simple', 'simple/simple');
        done1();
    });
    lodjs.use('simple/simple1', function (simple) {
        assert.ok(simple === 'simple1:simplesimplesimplesimplesimplesimple', 'simple/simple1');
        done2();
    });
});

QUnit.test( "commonjs", function(assert) {
    assert.expect(2);
    var done1 = assert.async();
    var done2 = assert.async();

    lodjs.use('commonjs/commonjs', function (exp) {
        assert.ok(exp === 'commonjs:simplereturnexpmod', 'commonjs/commonjs');
        done1();
    });
    lodjs.use('commonjs/commonjs1', function (exp) {
        assert.ok(exp === 'commonjs1:simplesimple', 'commonjs/commonjs1');
        done2();
    });
});