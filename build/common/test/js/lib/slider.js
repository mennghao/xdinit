(function(window){
	'use strict';

	var CSlider = function(){
		this.timer = null;
		this.opts = null;
		this.len = 0;
		this.index = 0;
	};
	/**
	 * [根据index设置显示哪张幻灯片]
	 * @param {[type]} box   [description]
	 * @param {[type]} index [description]
	 */
	function setIndex(box, index){
		var children = box.children,
			KEY = 'active';
		box.querySelector('.' + KEY).classList.remove(KEY);
		children[index].classList.add(KEY);
	};

	CSlider.prototype = {

		setOptions : function(opts){
			//默认配置项
			var defaultConf = {
				box : document.getElementById('slider-box'),
				wrap : document.querySelector('.cs-slider'),
				btn : "btn-index",
				time : 5000
			};

			for (var i in opts) {
				defaultConf[i] = opts[i];
			}

			return defaultConf;
		},

		init : function(opts){
			this.opts = this.setOptions(opts);
			this.len = this.opts.box.children.length;
			
			this.autoPlay();
			this.eventBind();
		},
		autoPlay : function(){
			var that = this;

			if (that.timer) {
				clearInterval(that.timer);
			}

			that.timer = setInterval(function(){

				if (that.index < that.len) {
					setIndex(that.opts.box, that.index);
					that.index++;
				} else {
					that.index = 0;
				}
			}, that.opts.time);
		},
		eventBind : function(){
			var that = this;

			that.opts.wrap.addEventListener("click", function (e){
				e.preventDefault();
				if (e.target.className = "btn-index") {
					var type = e.target.dataset.type;
					clearInterval(that.timer);
					if (type === "prev") {
						that.index = that.index > 0 ? --that.index : that.len - 1; 
					} else {
						that.index = that.index < (that.len - 1) ? ++that.index : 0;
					}
					setIndex(that.opts.box, that.index);

					that.autoPlay.call(that);
				}
			});
		}
	}

	window.CSlider = CSlider;
}(window))