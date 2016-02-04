// 基于原型编写的弹窗对象 - 带动画效果
function myDialog($dialog){
	this.height = $dialog.height();
	this.width = $dialog.width();

	this.dom = $dialog;
}

myDialog.prototype.init = function(){

};

myDialog.prototype.show = function(){

};

myDialog.prototype.hide = function(callback){
	this.dom.fideOut(200, callback);
};