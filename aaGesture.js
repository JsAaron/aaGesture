/**
 * 手势库
 * 2014.3.10 by Aaron
 * @return {[type]} [description]
 */
;(function(aaGesture) {
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = aaGesture;
		}
		exports.aaGesture = aaGesture;
	} else {
		window.aaGesture = aaGesture;
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

	//构造器
	var aaGesture = function(element, options, context) {
		return new aaGesture.init(element, options, context);
	};

	//生成委托句柄
	var delegateBindingHandlers = function(element, eventType, handler) {
		//过滤委托关系
		var filterDelegate = function(evt) {
			handler(evt);
		};

		aaGesture.bind(DOC, eventType, filterDelegate);

		return filterDelegate;
	};

	aaGesture.init = function(element, options, context) {
		this.element = element;
		this.options = options;
		this._eventStartHandler = delegateBindingHandlers(element, START_EV, function(evt) {

		})
		//事件句柄合集
		this._eventHandler = [];
	};

	//共享原型
	aaGesture.fn = aaGesture.prototype = aaGesture.init.prototype;

	//混入方法
	aaGesture.mix = aaGesture.fn.mix = function(target) {
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
	aaGesture.mix({
		'each': each,
		'bind': function(element, type, handler) { // 绑定事件
			element.addEventListener(type, handler, false);
		},
		'unbind': function(element, type, handler) { //卸载事件
			element.removeEventListener(type, handler, false);
		}
	})

	//混入手势方法
	aaGesture.fn.mix({








	})




	return aaGesture;

}(this));


var gesture = aaGesture(document.getElementById("container"));

console.log(gesture)
// hammertime.on('tap',function(){
//     alert(1)
// })