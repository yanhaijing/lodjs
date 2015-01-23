#[lodJS](https://github.com/yanhaijing/lodjs) [![release](https://img.shields.io/badge/release-v0.1.0-orange.svg)](https://github.com/yanhaijing/template.js/releases/tag/v0.1.0) [![license](http://img.shields.io/npm/l/express.svg)](https://github.com/yanhaijing/lodjs/blob/master/MIT-LICENSE.txt)

JavaScript模块加载器，基于[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)。迄今为止，对[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)理解最好的实现。

##功能概述

100%支持[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)规范，支持模块化开发，当定义好模块后，便可使用模块，无需维护依赖的模块，仅需写好依赖就可以了，lodJS会负责依赖注入。

##特性

- 模块化开发支持
- 异步加载
- 依赖注入
- 灵活的自定义功能

##兼容性

- Safari 6+ (Mac)
- iOS 5+ Safari
- Chrome 23+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
- Firefox 4+ (Windows, Mac, Android, Linux, Firefox OS)
- Internet Explorer 6+ (Windows, Windows Phone)
- Opera 10+ (Windows, linux, Android)

##如何使用？

###传统用法
	
	<script src="lodjs.js"></script>

###Bower

	$ bower install lodjs
	$ bower install git://github.com/yanhaijing/lodjs.git

##快速上手

###定义模块

使用lodJS的全局函数define定义一个模块，例如在 mod.js中有如下代码：

	define(function () {
		return 123;
	});

###使用模块

使用lodJS的use方法使用一个模块，下面的代码可以使用上面定义的模块：

	lodjs.use('mod', function (mod) {
		console.log(mod);//输出 123
	});

更多例子，请见目录下的[demo](demo)目录。

##文档

[API](doc/api.md)

##贡献指南

如果你想为lodJS贡献代码，请采用fork + pull request 方式，并在发起pr前先将master上超前的代码rebase到自己的分支上。

###发布Bower
	
	$ bower register lodjs git://github.com/yanhaijing/lodjs.git

##报告问题

- [Issues](https://github.com/yanhaijing/lodjs/issues "报告问题")

##作者

**yanhaijing**

- [Weibo](http://weibo.com/yanhaijing1234 "yanhaijing's Weibo")
- [Email](mailto:yanhaijing@yeah.net "yanhaijing's Email")
- [Blog](http://yanhaijing.com "yanhaijing's Blog")

##更新日志

[更新日志](CHANGELOG.md)

##相关链接

###AMD规范
- [AMD规范](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- [AMD规范(中文版)](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
- [AMD Require](https://github.com/amdjs/amdjs-api/wiki/require)
- [AMD Common-Config](https://github.com/amdjs/amdjs-api/wiki/Common-Config)
- [AMD Loader-Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)

###AMD实现
- [requirejs官网](http://requirejs.org/)
- [requirejs中文网](http://requirejs.cn/)
- [curl.js](https://github.com/cujojs/curl)
- [modJS](https://github.com/fex-team/mod)
- [ESL](https://github.com/ecomfe/esl)
- [loader.js](https://github.com/ember-cli/loader.js)
- [define.js](https://github.com/fixjs/define.js)

###CMD
- [CMD规范](https://github.com/cmdjs/specification/blob/master/draft/module.md)
- [seajs官网](http://seajs.org/docs/)