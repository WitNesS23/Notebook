function tplEngime(tpl, data){
	var reg = /{{=([\s\S]+?)}}|{{([\s\S]+?)}}/g;

	var strOut = "var temp='';temp+='";
	var index = 0;
	

	tpl.replace(reg, function(match, value, flow, offset, origin){
		var _usuStr = tpl.slice(index, offset);
		strOut += _usuStr;

		if(value){
			strOut += "' +" + value + "+ '";
		}else if(flow){
			strOut += "';" + flow + "temp+='";
		}

		index = offset + match.length;

		return match;
	});

	strOut += "';return temp;";

	// return strOut;

	// while(temp = reg.exec(tpl)){
	// 	console.dir(temp);
	// }
	var fn = new Function(strOut);
	return fn.call(data);
}

var testStr = 	"<p>List:</p>"+
				"{{for(var i = 0; i < this.posts.length; i++){}}" +
					"<a href=\\\'#\\\'>{{=this.posts[i].name}}</a>" +
				"{{}}}";

var data = {
	posts: [
		{
			name: "hcj"
		}, {
			name: "cj"
		}, {
			name: "hl"
		}]
};



$("#other").html(tplEngime(testStr, data));