var testStr = 	"<p>List:</p>" +
				"{{for(var i = 0; i < this.posts.length; i++){}}" +
					"{{if(this.posts[i].info){}}" +
						"<a href='#'>{{=this.posts[i].name}}</a>" +
					"{{}}}" +
				"{{}}}";

console.log(testStr);

var data = {
	posts: [
		{
			info: true,
			name: "hcj"
		}, {
			info: false,
			name: "cj"
		}, {
			info: true,
			name: "hl"
		}]
};

function tplEnginee(testStr, data){
	var reg = /{{=([\S\s]+?)}}|{{([\S\s]+?)}}/g;

	var _result = "var temp = ''; temp += '";

	var index = 0;

	testStr = testStr.replace(/'/g, "\\\'");

	testStr.replace(reg, function(match, value, flow, offset, origin){
		_result += testStr.slice(index, offset);

		if(value){
			_result += "'; temp +=" + value + "; temp += '";
		}else if(flow){
			_result += "'; " + flow + "temp += '";
		}

		index = offset + match.length;
	});

	_result += testStr.slice(index) + "'; return temp;";

	var fn = new Function(_result);
	return fn.call(data);
}

$("#other").html(tplEnginee(testStr, data));