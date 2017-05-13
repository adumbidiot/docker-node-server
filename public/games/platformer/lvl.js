window.lvl = function(){
	this.gridTemplate = document.createElement("div");
	this.gridTemplate.style.width = "23px";
	this.gridTemplate.style.height = "23px";
	this.gridTemplate.style.border = "1px solid black";
	this.gridTemplate.style.float = "left";
	
	this.mouseDown = false;
	document.onmousedown = function(){
		this.mouseDown = true;
	}
	document.onmouseup = function(){
		this.mouseDown = false;
	}
}
