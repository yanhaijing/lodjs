;(function (root) {
    'use strict';
    var modMap = [];
    var exportsMap = [];
    var moduleMap = [];
    var toString = {}.toString;
    var slice = [].slice;
    var baseSrc = document.currentScript.src;
    var docSrc = location.href.slice(0, location.href.indexOf('?'));
    var docUrl = docSrc.slice(0, docSrc.lastIndexOf('/') + 1);
    var baseUrl = baseSrc && baseSrc.slice(0, baseSrc.lastIndexOf('/') + 1) || docUrl;
    var gid = 0;
    var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
    var cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g;
    var o = {
        baseUrl: baseUrl
    };
    console.log('baseUrl:' +baseUrl);
    function getGid() {
        return gid++;
    }
    function isArr(arr) {
        return toString.call(arr) === '[object Array]';
    }
    function isObj(obj) {
        return toString.call(obj) === '[object Object]';
    }
    function isFn(fn) {
        return toString.call(fn) === '[object Function]';
    }
    function extendDeep() {
        var target = arguments[0] || {};
        var arrs = slice.call(arguments, 1);
        var len = arrs.length;
        var copyIsArr;
        var clone;

        for (var i = 0; i < len; i++) {
            var arr = arrs[i];
            for (var name in arr) {
                var src = target[name];
                var copy = arr[name];
                
                //避免无限循环
                if (target === copy) {
                    continue;
                }
                
                if (copy && (isObj(copy) || (copyIsArr = isArr(copy)))) {
                    if (copyIsArr) {
                        copyIsArr = false;
                        clone = src && isArr(src) ? src : [];

                    } else {
                        clone = src && isObj(src) ? src : {};
                    }
                    target[ name ] = extendDeep(clone, copy);
                } else if (typeof copy !== 'undefined'){
                    target[name] = copy;
                }
            }

        }

        return target;
    }
    function loadjs(src, success, error) {
        var js = document.createElement('script');
        js.src = src;
        js.id = 'lodjs-' + getGid();
        js.onload = success;
        js.onerror = error;
        (document.getElementsByTagName('head')[0] || document.body).appendChild(js);
    }
    function loadcss(src, success, error) {
        var css = document.createElement('link');
        css.rel = "stylesheet";
        css.href = src;
        css.onload = success;
        css.onerror = error;
        (document.getElementsByTagName('head')[0] || document.body).appendChild(css);
    }
    function getUrl(path, url) {
        //绝对网址
        if (path.search(/^(http:\/\/|https:\/\/|\/\/)/) !== -1) {
            return path;
        }
        // /开头
        if (path.search(/^\//) !== -1) {
            return (url.match(/[^\/]*\/\/[^\/]*\//)[0] || url + '/') + path;
        }

        // ../开头
        if (path.search(/^\.\.\//) !== -1) {
            url = url.slice(0, url.lastIndexOf('/') + 1);
            while(path.search(/^\.\.\//) !== -1) {
                if (url.lastIndexOf('/') !== -1) {
                    path = path.slice(3);
                    url = url.slice(0, url.lastIndexOf('/', url.length - 2) + 1);
                } else {
                    throw new Error('loadjs geturl error, cannot find path in url');
                }
            }

            return url + path;
        }
        // ./
        if (path.search(/^\.\//) !== -1) {
            path = path.slice(2);
        }

        return url.slice(0, url.lastIndexOf('/') + 1) + path;
    }
    function getDepUrl(id, url) {
        url = getUrl(id, url || o.baseUrl);
        console.log('getdepurl: ' + url + '.js');
        return url.search(/\.js$/) !== -1 ? url : url + '.js';
    }
    function getIdUrl(id){
        //没有id的情况
        if (!id) {
            return document.currentScript.src;
        }
        //id不能为相对路径
        if (id.search(/^\./) !== -1 || id.search(/\.js$/) !== -1) {
            throw new Error('loadjs define id' + id + 'must absolute and no .js');
        }

        var url = getUrl(id, o.baseUrl);
        console.log(id + ' idurl:' + url + '.js');
        return url + '.js';
    }
    function getCurSrc() {
        return document.currentScript && document.currentScript.src || '';
    }
    function require(id) {
        var url = getDepUrl(id, getCurSrc());
        return moduleMap[url].exports;
    }
    var define = function (name, deps, callback) {
        //省略模块名
        if (typeof name !== 'string') {
            callback = deps;
            deps = name;
            name = null;
        }

        //无依赖
        if (!isArr(deps)) {
            callback = deps;
            deps = [];
        }

        //支持commonjs
        if (deps.length === 0 && isFn(callback) && callback.length) {
            callback
                .toString()
                .replace(commentRegExp, '')
                .replace(cjsRequireRegExp, function (match, dep) {
                    deps.push(dep);
                });
            var arr = ['require'];
            if (callback.length > 1) {
                arr.push('exports');
            }
            if (callback.length > 2) {
                arr.push('module');
            }
            deps = arr.concat(deps);
        }

        var modName = getIdUrl(name);

        modMap[modName] = modMap[modName] || {};
        modMap[modName].deps = deps;
        modMap[modName].callback = callback;
        modMap[modName].status = 'loaded';
        moduleMap[modName] = {};

        return 0;
    };
    define.amd = {};
    function loadMod(id, callback, option) {
        //commonjs
        if(id === 'require') {
            callback(require);
            return -1;
        }
        if (id === 'exports') {
            var exports = moduleMap[option.baseUrl].exports = {};
            callback(exports);
            return -2;
        }
        if (id === 'module') {
            callback(moduleMap[option.baseUrl]);
            return -3;
        }

        var modName = getDepUrl(id, option.baseUrl);
        //未加载
        if (!modMap[modName]) {
            modMap[modName] = {
                status: 'loading',
                onload: [callback]
            };
            loadjs(modName, function () {
                //如果define的不是函数
                if (!isFn(modMap[modName].callback)) {
                    moduleMap[modName].exports = modMap[modName].callback;
                    callback(moduleMap[modName].exports);
                    //模块定义完毕 执行load函数
                    for (var i = 0; i < modMap[modName].onload.length; i++) {
                        modMap[modName].onload[i](moduleMap[modName].exports);
                    }
                    return 0;
                } 

                //define的是函数
                use(modMap[modName].deps, function () {                    
                    //commonjs
                    if (modMap[modName].deps[0] === 'require') {
                        var exp = modMap[modName].callback.apply(null, arguments);
                        //也支持返回值
                        if (exp) {
                            moduleMap[modName].exports = exp;
                        }
                    } else {
                        //amd
                        moduleMap[modName].exports = modMap[modName].callback.apply(null, arguments);
                    }

                    callback(moduleMap[modName].exports);

                    //模块定义完毕 执行load函数
                    for (var i = 0; i < modMap[modName].onload.length; i++) {
                        modMap[modName].onload[i](moduleMap[modName].exports);
                    }
                }, {baseUrl: modName});
                return 1;
            }, function () {
                modMap[modName].status === 'error';
                callback();
            });
            return 0;
        }

        //加载失败
        if (modMap[modName].status === 'error') {
            callback();
            return 1;
        }
        //正在加载
        if (modMap[modName].status === 'loading') {
            modMap[modName].onload.push(callback);
            return 1;
        }

        //加载完成
        //尚未执行完成
        if (!moduleMap[modName].exports) {
            //如果define的不是函数
            if (!isFn(modMap[modName].callback)) {
                moduleMap[modName].exports = modMap[modName].callback;
                callback(moduleMap[modName].exports);
                return 2;
            } 

            //define的是函数
            use(modMap[modName].deps, function () {
                //commonjs
                if (modMap[modName].deps[0] === 'require') {
                    var exp = modMap[modName].callback.apply(null, arguments);
                    //也支持返回值
                    if (exp) {
                        moduleMap[modName].exports = exp;
                    }
                } else {
                    //amd
                    moduleMap[modName].exports = modMap[modName].callback.apply(null, arguments);
                }

                callback(moduleMap[modName].exports);
            }, {baseUrl: modName});
            return 3;
        }

        //已经执行过
        callback(moduleMap[modName].exports);
        return 4;
    }
    function use(deps, callback, option) {
        if (!deps || !callback) {
            throw new Error('lodjs.use arguments error');
            return 0;
        }

        if (typeof deps === 'string') {
            deps = [deps];
        }

        if (!isArr(deps) || !isFn(callback)) {
            throw new Error('lodjs.use arguments error');
            return 1;
        }
        if (!isObj(option)) {
            option = {
                baseUrl: o.baseUrl
            };
        }
        if (deps.length === 0) {
            callback();
            return 2;
        }
        var depsCount = deps.length;
        var params = [];
        for(var i = 0; i < deps.length; i++) {
            (function (j) {
                loadMod(deps[j], function (param) {
                    depsCount--;
                    params[j] = param;
                    if (depsCount === 0) {
                        callback.apply(null, params);
                    }
                }, option);
            }(i));
        }

        return 3;
    }
    var lodjs = {
        version: '0.1.0',
        use: use,
        loadjs: loadjs,
        loadcss: loadcss
    };
    lodjs.config = function (option) {
        if (option.baseUrl) {
            option.baseUrl = getUrl(option.baseUrl, docUrl);
        }
        o = extendDeep(o, option);
        console.log(o);
        return extendDeep(o);
    };
    root.define = define;
    root.lodjs = lodjs;
}(window));