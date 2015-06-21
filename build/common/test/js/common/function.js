(function(window){
	'use strict';

	window.cs = {
		namespace : function(ns, fn){
			var parts = ns.split("."),
				object = this,
				i, len;

			for (i = 0, len = parts.length; i < len; i++) {
				if (!object[parts[i]]) {
					object[parts[i]] = {};
				}
				object = object[parts[i]];
			}

			fn(object);
		}

	};
	/**
	 * [格式化传输数据]
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	var encodeParams  = function(params){
		var paramsStr = [];
	    for (var k in params) {
	    	if (params.hasOwnProperty(k)) {
	        	paramsStr.push(k + '=' + params[k]);
	    	}
	    }
	    return paramsStr.join('&');
	}

	cs.namespace('fn', function (ret){

			/**
			 * 选中所有的check
			 */
			ret.checkAll = function(){
				var allCheckRadio = document.querySelectorAll('input[type="checkbox"]');

				allCheckRadio[0].addEventListener("click", function (e){

					Array.prototype.forEach.call(allCheckRadio, function (x, i){

						if (i > 0) {
							x.checked = !e.target.checked === true ? false : true;
						}
					})			
				})
			},
			/**
			 * ready
			 */
			ret.ready = function(fn) {
		  		if (document.readyState != 'loading'){
			    	fn();
		  		} else {
			    	document.addEventListener('DOMContentLoaded', fn);
		  		}
			},
			ret.ajax = {
				post : function(url, params){
					var that = this;
					return new Promise(function(resolve, reject) {
				        var xhr = new XMLHttpRequest();
				        xhr.open('POST', url);
				        xhr.onload = function() { resolve(xhr.response); };
				        xhr.onerror = function() { reject(xhr.response); };
				        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				        xhr.send(encodeParams(params));
				    });
				},
				getJSON : function(url, fn){
					var request = new XMLHttpRequest();
					request.open('GET', url, true);

					request.onload = function() {
					  if (request.status >= 200 && request.status < 400) {
					    // Success!
					    fn(JSON.parse(request.responseText));
					  } else {
					    // We reached our target server, but it returned an error

					  }
					};

					request.onerror = function() {
					  // There was a connection error of some sort
					};

					request.send();
				}

			},
			ret.storage = {
				local : {
					set : function(name, data){
						localStorage.setItem(name, JSON.stringify(data));
					},
					get : function(name){
						return JSON.parse(localStorage.getItem(name));
					},
					remove : function(name){
						localStorage.removeItem(name);
					}
				},
				session : {
					set : function(name, data){
						sessionStorage.setItem(name, JSON.stringify(data));
					},
					get : function(name){
						return JSON.parse(sessionStorage.getItem(name));
					},
					remove : function(name){
						sessionStorage.removeItem(name);
					}
				}
			},
			ret.timeFormat = function(){
				var DAY, DEFAULT_FORMAT, HOUR, MINUTE, MONTH, SECOND, YEAR, angularApp, entry, exports, getFullTime, map, replace, time, two, unify;
				    YEAR = "year";
				    MONTH = "month";
				    DAY = "day";
				    HOUR = "hour";
				    MINUTE = "minute";
				    SECOND = "second";
				    DEFAULT_FORMAT = "%y-%M-%d %h:%m:%s";
				    map = {
				    "%y": YEAR,
				    "%M": MONTH,
				    "%d": DAY,
				    "%h": HOUR,
				    "%m": MINUTE,
				    "%s": SECOND
				    };

				    unify = function(time){
				        if ((typeof time) === "number") {
				            time += "";
				        };
				        if (time.length === 10) {
				            time += "000";
				        } else if (time.length > 10) {
				            time = time.substr(0, 13);
				        };
				        time -= 0;
				        return time;
				    };
				    /**
				     * [转为两位数]
				     * @param  {[type]} str [description]
				     * @return {[type]}     [description]
				     */
				    two = function(str){
				        var s;
				        s = str + "";
				        if (s.length === 1) {
				            s = "0" + s;
				        };
				        return s;
				    };

				    /**
				     * [替换占位符]
				     * @param  {[type]} str [description]
				     * @param  {[type]} src [占位符]
				     * @param  {[type]} dst [description]
				     * @return {[type]}     [description]
				     */
				    replace = function(str, src, dst){
				        var reg;
				        reg = new RegExp(src, "g");
				        return str.replace(reg, dst);
				    };

				    getFullTime = function(time){
				        var date;
				        date = new Date(unify(time));
				        return {
				            year  : date.getFullYear(),
				            month : two(date.getMonth() + 1),
				            day   : two(date.getDate()),
				            hour  : two(date.getHours()),
				            minute: two(date.getMinutes()),
				            second: two(date.getSeconds())
				        }
				    };

				    time = {
				        "default" : function(time, format){
				            var fullTime, ret, src;
				            if (format && (typeof format) !== "string") {
				                throw new Error("format must be a string.");
				            };
				            fullTime = getFullTime(time);
				            ret = format || DEFAULT_FORMAT;
				            for (src in map) {
				                ret = replace(ret, src, fullTime[map[src]]);
				            };

				            return ret;
				        },
				        "human" : function(time){
				            var ago, curTime, diff, int;
				            time = unify(time);
				            int  = parseInt;
				            curTime = +new Date();
				            diff = curTime - time;
				            ago = "";

				            if (1000 * 60 > diff) {
				                ago = "刚刚";
				            } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
				                ago = int(diff / (1000 * 60)) + "分钟前";
				            } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
				                ago = int(diff / (1000 * 60 * 60)) + "小时前";
				            } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
				                ago = int(diff / (1000 * 60 * 60 * 24)) + "天前";
				            } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
				                ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前";
				            } else {
				                ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前";
				            }

				            return ago;
				        }
				    };
				    entry = time["default"];
				    entry.human = entry.ago = time.human;

				    return entry;
			}
		
	})


	/**
	 * [ajax返回后提示模块]
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	var ajaxHint = function(type, data){
		var strHtml = '<div class="am-alert am-alert-'+type+'" data-am-alert> <button type="button" class="am-close">&times;</button> <p>'+data+'</p> </div>'
		var div = document.createElement('div');
		div.id = "ajaxHint";
		div.innerHTML = strHtml;

		document.body.appendChild(div);
		setTimeout(function(){
			document.getElementById('ajaxHint').remove();
		}, 1000)
	};

	

}(window));