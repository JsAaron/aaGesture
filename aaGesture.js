/**
 * 手势库
 * 2014.3.10 by Aon
 * @return {[type]} [description]
 */
;(function(Aon) {
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Aon;
		}
		exports.aaGesture = Aon;
	} else {
		window.aaGesture = Aon;
	}
})(function(window, undefined) {

	//原型引用
	var DOC = window.document,
		aproto = Array.prototype,
		oproto = Object.prototype,
		fproto = Function.prototype;

	//原型方法
	var push   = aproto.push,
		slice  = aproto.slice,
		concat = aproto.concat,
		hasOwnProperty = oproto.hasOwnProperty;

	//ECMAScript5 支持的本地方法
	var	nativeForEach     = aproto.forEach,
		nativeMap         = aproto.map,
		nativeReduce      = aproto.reduce,
		nativeReduceRight = aproto.reduceRight,
		nativeFilter      = aproto.filter,
		nativeEvery       = aproto.every,
		nativeSome        = aproto.some,
		nativeIndexOf     = aproto.indexOf,
		nativeLastIndexOf = aproto.lastIndexOf,
		nativeBind        = fproto.bind;

	//平台检测
	var ua = navigator.userAgent,
		uv = navigator.appVersion,
		isAndroid = (/android/gi).test(uv),
		isTouchPad = (/hp-tablet/gi).test(uv),
		isIphone = (/iphone|ipod/gi).test(ua),
		isIpad = (/ipad/gi).test(ua),
		isIOS = isIphone || isIpad,
		has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
		hasTouch = 'ontouchstart' in window && !isTouchPad,
		START_EV  = hasTouch ? 'touchstart' : 'mousedown',
		MOVE_EV   = hasTouch ? 'touchmove' : 'mousemove',
		END_EV    = hasTouch ? 'touchend' : 'mouseup',
		CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';

	//过滤原型链的对象属性
	var hasProperty = function(obj, key) {
		return hasOwnProperty.call(obj, key);
	};

	//遍历
	var each = function(obj, callback, context) {
		if (obj == null) return;
		//如果支持本地forEach方法,并且是函数
		if (nativeForEach && obj.forEach === nativeForEach) {
			obj.forEach(callback, context);
		} else if (obj.length === +obj.length) {
			//for循环迭代
			for (var i = 0, l = obj.length; i < l; i++) {
				if (callback.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			//对象
			for (var key in obj) {
				if (hasProperty(obj, key)) {
					if (callback.call(context, obj[key], key, obj) === breaker) return;
				}
			}
		}
	};


	//数据缓存生成器
	function Data() {
		Object.defineProperty(this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});
		this.expando = 'Aon' + Math.random();
	}

	Data.prototype = {
		set: function() {

		},
		get: function() {

		},
		remove: function() {

		},
	}

	//数据缓存,用户存储事件句柄
	var dataCache = new Data();

	//构造器
	var Aon = function(element, options, context) {
		return new Aon.init(element, options, context);
	};

	Aon.init = function(element, options, context) {
		this.element = element;
		this.options = options;
		this._startEventHandler = Aon.event.add(element, START_EV, function(event) {
			console.log(event)
		});
		Aon.event.add(element, MOVE_EV);
		Aon.event.add(element, END_EV);
		//事件句柄合集
		this._eventHandler = [];
	};

	//共享原型
	Aon.fn = Aon.prototype = Aon.init.prototype;

	//混入方法
	Aon.mix = Aon.fn.mix = function(target) {
		var parent = target,
			offset = 1;
		//如果没有输入目标对象,取当前的this,修改偏移量
		if (arguments.length === 1) {
			--offset;
			parent = this;
		}
		each(slice.call(arguments, offset), function(source) {
			if (source) {
				//混入引用
				for (var prop in source) {
					parent[prop] = source[prop];
				}
			}
		});
		return parent;
	};

	//扩充静态方法
	Aon.mix({
		'each': each,
		'bind': function(element, type, handler) { // 绑定事件
			element.addEventListener(type, handler, false);
		},
		'unbind': function(element, type, handler) { //卸载事件
			element.removeEventListener(type, handler, false);
		}
	})

	//事件辅助
	Aon.event = {

		add: function(element, eventType, handler) {
			//过滤委托关系
			var filterDelegate = function(event) {
				var overwriteEvent,
					count_touches = 0,
					type = event.type.toLowerCase();

				//计算一次有效点击
				if (!event.which || !type.match(/mouse/)) {
					return;
				}

				if (type.match(/touch/)) {
					count_touches = event.touches.length;
				} else {
					count_touches = 1;
				}

				//重写事件对象
				overwriteEvent = new Aon.Event(element, eventType, count_touches, event);

				handler && handler(overwriteEvent);
			};
			Aon.bind(DOC, eventType, filterDelegate);
		},

		handlers: function(element, eventType, handler) {

		}



	};

	/**
	 * 封装事件对象类
	 * @return {[type]} [description]
	 */
	Aon.Event = function(element, eventType, touches, evt) {
		this.timeStamp   = new Date().getTime();
		this.target      = evt.target;
		this.touches     = touches;
		this.eventType   = eventType;
		this.srcEvent    = evt;
	};

	/**
	 * 封装事件方法
	 * @type {Object}
	 */
	Aon.Event.prototype = {
		// 取消特定事件的默认行为
		preventDefault: function() {},
		// 取消事件的进一步捕获或冒泡
		stopPropagation: function() {},
		// 阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上
		stopImmediatePropagation: function() {}
	}


	Aon.injection = {
		swipe: function() {

		},
		tap: function() {

		}
	}


	//实例接口方法
	Aon.fn.mix({
		on: function() {

		},
		off: function() {

		}
	})

	return Aon;

}(this));


var gesture = aaGesture(document.getElementById("container"));
console.log('静态', Object.keys(aaGesture))
console.log('原型', Object.keys(aaGesture.fn))

// hammertime.on('tap',function(){
//     alert(1)
// })