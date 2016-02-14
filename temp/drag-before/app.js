var chosen = false;

var offsetX = 0, offsetY = 0;
var wrapperOffsetX = $(".wrap").get(0).offsetLeft;
var wrapperOffsetY = $(".wrap").get(0).offsetTop;

$(".wrap>div>div").on("mousedown", function(e){
	if(!chosen){
		// console.log(e);
		chosen = true;
		$(this).css("cursor", "pointer")
			.css("position", "absolute")
			.css("background-color", "rgba(255, 255, 255, 0.5)");
		offsetX = e.pageX;
		offsetY = e.pageY;
	}
}).on("mousemove", function(e){
	// console.log(e);
	if(chosen && e.which == 1){
		$(this).css("cursor", "move")
			.css("left", e.pageX - offsetX + "px")
			.css("top", e.pageY - offsetY + "px");
	}
}).on("mouseup", function(e){
	if(chosen){
		$(this).siblings().each(function(index, ele){
			
		})
	}
});