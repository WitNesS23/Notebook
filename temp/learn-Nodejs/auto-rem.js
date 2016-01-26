var fs = require("fs")

var content = fs.readFileSync("style.css", "utf-8")

var arr = content.split("\n")

var count = 0;

arr.forEach(function(currentValue, index, array){
	var value = currentValue
	var temp;
	temp = value.replace(/(\d+)px/g, function(){
		if(Number(arguments[1]) > 1){
			count ++;
			return Number(arguments[1]) / 100 + "rem"
		}
	})

	if(temp != currentValue){
		array.splice(index + 1, 0, temp)
	}
})

var result = arr.join("\n")

fs.writeFile("style_format.css", result, "utf-8", function(err){
	if(err) console.log(err)
	console.log("change lines number" + count)
})
