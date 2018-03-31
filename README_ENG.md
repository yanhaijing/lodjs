# [lodJS](https://github.com/yanhaijing/lodjs) [![release](https://img.shields.io/badge/release-v0.1.0-orange.svg)](https://github.com/yanhaijing/template.js/releases/tag/v0.1.0) [![license](http://img.shields.io/npm/l/express.svg)](https://github.com/yanhaijing/lodjs/blob/master/MIT-LICENSE.txt)

The JavaScript module loader is based on [AMD] (https://github.com/amdjs/amdjs-api/blob/master/AMD.md). lodJS is the best implemented understanding of [AMD] (https://github.com/amdjs/amdjs-api/blob/master/AMD.md) up to now.

## Function Overview

100% supports [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md) specifications. Supports modular development. When a module is defined, modules can be used without maintaining a dependent module, just write a dependency, and lodJS will automatically be responsible for the dependency injection.

## Characteristics

- Modular Development Support
- Asynchronous loading
- Dependency injection
- Flexible custom functionality

## Compatibility

- Safari 6+ (Mac)
- iOS 5+ Safari
- Chrome 23+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
- Firefox 4+ (Windows, Mac, Android, Linux, Firefox OS)
- Internet Explorer 6+ (Windows, Windows Phone)
- Opera 10+ (Windows, linux, Android)

## How to Use?

### Traditional Usage
	
	<script src="lodjs.js"></script>

### Bower

	$ bower install lodjs
	$ bower install git://github.com/yanhaijing/lodjs.git

## Quick Start

### Define Module

We use lodJS's global function define to define a module, for example, in mod.js, we have the following code:

	define(function () {
		return 123;
	});

### Module Usage

The use method in lodJS uses a module. The following code can use the module defined above:

	lodjs.use('mod', function (mod) {
		console.log(mod);// Outputs 123
	});

For more examples, please see the directory of [demo](demo).

## Document

[API](doc/api.md)

## Contribution Guide

If you want to contribute code for lodJS, please use fork + pull request method, ensuring that before you launch pr, you rebase code on the master branch to your own branch.

### Publish Bower
	
	$ bower register lodjs git://github.com/yanhaijing/lodjs.git

## Report Issues

- [Issues](https://github.com/yanhaijing/lodjs/issues "报告问题")

## Author

**yanhaijing**

- [Weibo](http://weibo.com/yanhaijing1234 "yanhaijing's Weibo")
- [Email](mailto:yanhaijing@yeah.net "yanhaijing's Email")
- [Blog](http://yanhaijing.com "yanhaijing's Blog")

## Update Log

[Update Log](CHANGELOG.md)

## Related Links

### AMD Specifications
- [AMD Specifications](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- [AMD Specifications (Chinese Version)](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
- [AMD Require](https://github.com/amdjs/amdjs-api/wiki/require)
- [AMD Common-Config](https://github.com/amdjs/amdjs-api/wiki/Common-Config)
- [AMD Loader-Plugins](https://github.com/amdjs/amdjs-api/wiki/Loader-Plugins)

### AMD Implementation
- [requirejs Official Webpage](http://requirejs.org/)
- [requirejs Chinese Webpage](http://requirejs.cn/)
- [curl.js](https://github.com/cujojs/curl)
- [modJS](https://github.com/fex-team/mod)
- [ESL](https://github.com/ecomfe/esl)
- [loader.js](https://github.com/ember-cli/loader.js)
- [define.js](https://github.com/fixjs/define.js)

### CMD
- [CMD Specifications](https://github.com/cmdjs/specification/blob/master/draft/module.md)
- [seajs Official Webpage](http://seajs.org/docs/)
