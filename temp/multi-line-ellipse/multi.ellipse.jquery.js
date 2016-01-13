function MultiEllipse(wrapper){
	this.wrapper 	= $(wrapper);
	this.beforeText = $(wrapper).text(); 

	this.init();
}

MultiEllipse.prototype.init = function(){
	var $wrapper 			= this.wrapper;

	// wrapper width & height (just save content area)
	this.wrapperWidth 		= $wrapper.width();
	this.wrapperHeight 		= $wrapper.height();

	// has the same styles of the $wrapper to calculate the width & height
	this._span 				= $("<span>", { "style": this.getFontInfluence()});
	this._span.appendTo($("body"));
	this.singleLineHeight 	= this.solveLineHeight($wrapper);

	// get the best lines number
	var _lineNum			= Math.floor(this.wrapperHeight / this.singleLineHeight);

	// Optimization: change the line-height could 
	var _betterLineHeight 	= this.togglePX(Math.floor(this.wrapperHeight / _lineNum));

	// $wrapper.text("");

	var _changeText 		= "";
	var _beforeChar 		= "";
	var _count				= 1;

	for(var i = 0, length = this.beforeText.length; i < length; i++){
		_beforeChar = this.beforeText[0];
		var _presentText = this._span.text();

		this._span.text(_presentText + _beforeChar);

		if(this._span.width() > this.wrapperWidth){
			// overflow one line
			// this station will break word, need to be optimized
			_changeText += this._span.text().slice(0, -1) + "\<br\>"; 
			this._span.text("");
			if(_count == _lineNum){
				break;
			}
			_count++;
		}else{
			this.beforeText = this.beforeText.substring(1);
		}
	}

	$wrapper.html(_changeText);
};

MultiEllipse.prototype.togglePX = function(val){
	if(/(\d+)$/g.test(val)){
		// "16" -> "16px"
		return val + "px";
	}else{
		// "16px" -> "16"
		return /^(\d+)/g.exec(val)[1];
	}
};

MultiEllipse.prototype.solveLineHeight = function($ele){
	if($ele.css("line-height") == "normal"){
		this._span.text("abcdefghijklm");
		var _height = this._span.height();
		this._span.text("");
		return _height;
	}else{
		return (this.togglePX($ele.css("line-height")));
	}
};

// get the styles maybe influence the 'width' and set to the temp span
MultiEllipse.prototype.getFontInfluence = function(){
	var $wrapper 	= this.wrapper;
	var _keys 		= [
					"font-family",
					"font-size",
					"white-space"
					];

	var _result 	= "";

	_keys.forEach(function(value, index){
		var _tempCSSValue = $wrapper.css(_keys[index]);
		_result += _keys[index] + ": " + _tempCSSValue + ";";
	})

	// _result += "display: none;";

	return _result;
}

$.fn.multiEllipse = function(){
	this.each(function(){
		new MultiEllipse($(this));
	});

	return this;
};