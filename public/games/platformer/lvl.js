window.lvl = function(){
	this.gridTemplate = document.createElement("div");
	this.gridTemplate.style.width = "23px";
	this.gridTemplate.style.height = "23px";
	this.gridTemplate.style.border = "1px solid black";
	this.gridTemplate.style.float = "left";
}

window.lvl.mouseDown = false;
document.onmousedown = function(){
	window.lvl.mouseDown = true;
}
document.onmouseup = function(){
	window.lvl.mouseDown = false;
}
