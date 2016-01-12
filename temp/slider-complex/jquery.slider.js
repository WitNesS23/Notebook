(function($){
	$.fn.slider = function(options){
		// save the caller-this
		var _this = this;

		var defaultConfig = {
			"canvas": $(this).find("ul"),
			"content": $(this).find("ul").children("li"),
			"needContainer": true,
			"showNav": false,
			"aniType": "slide",
			"fadeTime": 2000,
			"animteTime": 1000,
			"animateInterval": 2000,
			"compatible": true,
			"loop": true,
			"preFn": null,
			"nextFn": null,
			"beforePreFn": null,
			"beforeNextFn": null
		};

		var config 		= $.extend({}, defaultConfig, options||{});

		var $canvas		= $(config.canvas);
		var $content 	= $(config["content"]);
		var _itemWidth 	= $content.eq(0).width();
		var _itemHeight = $content.eq(0).height();

		init();
	};

	$.fn.slider.init = function(){
		var _this = this;
		if(config.aniType == "slide"){
			// aniType: slide
			// default 'li' items can't realize the perfect effect
			// so in here I append the same size of 'li' items to the father wrap
			$content.appendTo($canvas);

			// init the container
			if(config.needContainer){
				var container = $("<div>", {"class": "plug-create-container"});
				container.css({"width": _itemWidth, "height": _itemHeight, "position": "relative"});
				_this.container = container;
				container.wrap(config.canvas);
			}
		}
		else{
			// aniType: fade
			// need to be done
		}
	}

	$.fn.slider.animate = function(direction, num){
		var _this = this;
		$content.animate({
			"left": "-=" + _itemWidth
		}, {
			"duration": config.animateTime,
			"easing": "swing",
			"complete": completeFun.bind({}, direction, num)
		});

		function completeFun(direction, num){
			// change half of the dom struct to the before
			var _contentLength 	= $content.length;
			var _defaultLeft 	= (_contentLength / 2) * _itemWidth;
			var _defaultTop		= (_contentLength / 2) * _itemHeight;
			$content.detach();
			if(direction == "rtl"){
				while(num > 0){
					$content.first().appendTo($canvas);
					num--;
				}
				$content.offset({left: _defaultLeft});
			}
			$content.appendTo(_this.container);
		}
	}
}(jQuery));