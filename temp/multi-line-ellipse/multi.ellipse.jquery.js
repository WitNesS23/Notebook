function MultiEllipse(wrapper){
	this.wrapper 	= $(wrapper);
	this.beforeText = $(wrapper).text(); 
}

MultiEllipse.prototype.init = function(){
	var $wrapper 			= this.wrapper;

	// wrapper width & height (just save content area)
	this.wrapperWidth 		= $wrapper.width();
	this.wrapperHeight 		= $wrapper.height();

	this.singleLineHeight 	= this.togglePX($wrapper.css("font-size"));

	// get the best lines number
	var _lineNum			= Math.floor(this.wrapperHeight / this.singleLineHeight);

	// Optimization: change the line-height could 
	var _betterLineHeight 	= togglePX(Math.floor(this.wrapperHeight / _lineNum));

	$wrapper.text("");

	// has the same styles of the $wrapper to calculate the width
	var _$span 				= $("<span>", { "style": this.getFontInfluence()});


	var _beforeChar 		= "";
	while(_$span.width() <= this.wrapperWidth){
		var _presentText = _$span.text();
		_beforeChar = this.beforeText[0];
		_$span.text(_presentText + _beforeChar);



	}

	for(var i = 0, length = beforeText.length; i < length; i++){
		_beforeChar = this.beforeText[0];
		var _presentText = _$span.text();
		_$span.text(_presentText + _beforeChar);

		if(_$span.width() > this.wrapperWidth){
			// overflow one line
			// this station will break word, need to be optimized
			_$span.text("");
		}else{
			this.beforeText = this.beforeText.substring(1);
		}
	}
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

MultiEllipse.prototype.getFontInfluence = function(){
	var $wrapper 	= this.wrapper;
	var _keys 		= [
					"font-family",
					"font-size",
					"white-space"
					];

	var _result 	= "";

	_keys.forEach(function(value, index){
		var _tempCSSValue = $wrapper.css(keys[index]);
		_result += keys[index] + ": " + _tempCSSValue + ";";
	})

	_result += "display: none;";

	return _result;
}