#lodJS
lodJS会占用全局命名空间lodjs，是一个对象，有如下属性：

- version {String} 版本号
- use {Function} 使用已定义的模块
- loadjs {Funtion} 加载js文件
- config {Function} 配置参数
- define {Function} 定义模块
- require {Function} 请求已加载的模块

下面是这些属性的详细解释。

##define
lodJS会占用全局变量define，作为定义模块的接口，定义模块的代码如下：

	define(id?, deps?, module);

- [id] {String} 定义模块的id，可省略，若省略此参数，为匿名函数，其id为js的文件名。
- [deps] {Array} 模块的依赖数组，可省略，若省略此参数则为独立模块。
- module {*} 任意值
- return {*} 任意值 模块的输出

下面是定义模块的一些例子：

###定义简单值
lodJS可定义任何值，包括null，下面是定义字符串的例子：
	
	//my/shirt.js
	define("black")；

###简单值对
如果一个模块仅含值对，没有任何依赖，则在define()中定义这些值对就好了：

	//my/shirt.js:
	define({
	    color: "black",
	    size: "unisize"
	});

###函数式定义
如果一个模块没有任何依赖，但需要一个做setup工作的函数，则在define()中定义该函数，并将其传给define()：

	//my/shirt.js
	define(function () {
	    //做一些初始化工作
	
	    return {
	        color: "black",
	        size: "unisize"
	    }
	});

###存在依赖的函数式定义
如果模块存在依赖：则第一个参数是依赖的名称数组；第二个参数是函数，在模块的所有依赖加载完毕后，该函数会被调用来定义该模块，因此该模块应该返回一个定义了本模块的object。依赖关系会以参数的形式注入到该函数上，参数列表与依赖名称列表一一对应。

	//my/shirt.js 依赖cart和和inventory
	//依赖当前路径下的模块
	define(["./cart", "./inventory"], function(cart, inventory) {
	        //返回shirt模块的输出
	        return {
	            color: "blue",
	            size: "large",
	            addToCart: function() {
	                inventory.decrement(this);
	                cart.add(this);
	            }
	        }
	    }
	);

本示例创建了一个my/shirt模块，它依赖于my/cart及my/inventory。磁盘上各文件分布如下：

- my/cart.js
- my/inventory.js
- my/shirt.js

模块函数以参数"cart"及"inventory"使用这两个以"./cart"及"./inventory"名称指定的模块。在这两个模块加载完毕之前，模块函数不会被调用。
严重不鼓励模块定义全局变量。遵循此处的定义模式，可以使得同一模块的不同版本并存于同一个页面上(参见 高级用法 )。另外，函参的顺序应与依赖顺序保存一致。
返回的object定义了"my/shirt"模块。这种定义模式下，"my/shirt"不作为一个全局变量而存在。

###commonjs支持
如果你现有一些以CommonJS模块格式编写的代码，而这些代码难于使用上述依赖名称数组参数的形式来重构，你可以考虑直接将这些依赖对应到一些本地变量中进行使用。你可以使用一个CommonJS的简单包装来实现：

	define(function(require, exports, module) {
        var a = require('a'),
            b = require('b');

        //Return the module value
        return function () {};
    });

该包装方法依靠Function.prototype.toString()将函数内容赋予一个有意义的字串值，但在一些设备如PS3及一些老的Opera手机浏览器中不起作用。

###定义一个命名模块
你可能会看到一些define()中包含了一个模块名称作为首个参数：

	//显示定义 "foo/title" 模块:
    define("foo/title", function() {
        //模块内容
    });

可以显式指定模块名称，但这使模块更不具备移植性——就是说若你将文件移动到其他目录下，你就得重命名。一般最好避免对模块硬编码。

###其他注意事项
**一个文件一个模块:** 每个Javascript文件应该只定义一个模块，这是模块名-至-文件名查找机制的自然要求。

###define.amd
AMD规范规定define函数要有一个amd属性用来标记期遵循AMD规范，lodJS的amd属性所示：

	{
		from: 'lodjs';
	}

lodJS扩展了自定义的from属性，用来标记来自lodJS。

###lodjs.define

lodJS在lodjs中保留了一份对define函数的引用，可以用来在define冲突时备用。

	lodjs.define = define;

##lodjs.use

use是使用模块的方法，定义好了模块，下一步就是使用模块，use有两个参数如下：

- deps {String|Array} 使用的模块
- callback {Function} 回调函数

其会将使用的模块作为参数传入回调函数中。

###使用单个模块

当只用一个模块时，可作为字符串传入，use中的模块可以是绝对路径，或相对路径，相对路径是相对于baseUrl。

	lodjs.use('my/shirt', function (shirt) {
		console.log(shirt);
	});

###使用多个模块

若想同时使用多个模块，可使用数组方式：

	lodjs.use(['my/shirt', 'my/shirt2'], function (shirt, shirt2) {
		console.log(shirt, shirt2);
	});

##lodjs.config
可用来自定义lodJS的配置选项，来自定义功能。可像下面这样使用：

	lodjs.config({});

config会返回当前配置信息的一份深拷贝，可用来查看当前的配置信息（调试很好用）。

其支持如下参数：

###baseUrl
配置当前的根目录，主要用于定义模块的依赖和使用模块时路径的解析，默认是lodjs.js所在的目录，可配置为其他目录，如下，配置当前路径下的js路径为本目录：

	lodjs.config({
		baseUrl: 'js'
	})

###path
path是一个非常强大的功能，对于程序的可移植性非常有用，想象一下我们有一个lib目录，如果有一天期路径改变了，我们要去更改所有引用里面模块的js，那将是灾难，解决这个可以配置一个path，并在路径更改是改变path即可：

	lodjs.config({
		path: {'lib': 'js/lib'}
	});

当lib的路径改变了，我们只需改下配置即可，应用的代码如下所示，lodjs内部会对lib做替换：

	define(['lib/jquery'], function($){});

**注意：**path中配置的相对路径是基于baseUrl。

##lodjs.loadjs

可用来载入一个js文件，有如下参数:

- src {String} js的路径
- success {Function} js载入成功后的回调函数
- error {Function} js载入失败后的回调函数
- option {Object} 一些自定义参数

典型的使用方式如下：

	lodjs.loadjs('my.js', function () {}, function () {});

option可支持如下属性：

- charest 默认的字符集是文档的字符集，一般不需要手动设置，除非你想实验一下
- cache 此属性默认为false，设置为true后，会自定给请求的js添加时间戳，开发时有用

##lodjs.require
可用来请求一个已经加载完成的模块，这个方法对于在控制台调试非常有用，对于尚未加载的模块不会加载模块。

	lodjs.require('my/shirt');

**注意**：此处的相对路径相对于baseUrl。

##lodjs.version
用来表示lodjs的版本。