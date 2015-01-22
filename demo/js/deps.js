define(['../simple', 'src/sub.js', 'lib/lib.js'], function(simple, sub, lib) {
    console.log('deps: deps exec');
    console.log('deps: ' + simple);
    console.log('deps: ' + sub);
    console.log('deps: ' + lib);
    return 'deps';
});