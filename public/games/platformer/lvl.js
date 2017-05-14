window.lvl = function(name){
	this.name = name;
	
	this.gridTemplate = document.createElement('div');
	this.gridTemplate.style.width = '23px';
	this.gridTemplate.style.height = '23px';
	this.gridTemplate.style.border = '1px solid black';
	this.gridTemplate.style.float = 'left';
	this.gridTemplate.type = 'holder';
	
	this.board = document.createElement('div');
	this.board.id = this.name;
	this.board.style.width = '800px';
	this.board.height = '450px';
	
	for(var i = 0; i != (18 * 32); i++){
		var grid = this.gridTemplate.cloneNode();
		grid.id = this.name + (i + 1);
		this.board.appendChild(grid);
		grid.addEventListener("mouseover",  this.boardMouseOver);
		grid.addEventListener("mousedown",  this.boardMouseDown);
		grid.addEventListener("click", this.boardMouseClick);
	}
	
	this.library = {
		
	}
}

lvl.prototype.render = function(index, activeBrush){
	var target = document.getElementById(this.name + (index + 1));
	if(target.block == activeBrush || !activeBrush) return;
	if(target.block){
		this.clearTile(index);
	}
	if(activeBrush == 'delete') return;
	
	var block = document.createElement('img');
	block.style.width = '25px';
	block.style.height = '25px';
	block.src = './' + activeBrush + '.png';
	block.type = 'block';
	target.appendChild(block);
	target.block = activeBrush;
}

lvl.prototype.clearTile = function(index){
	var target = document.getElementById(this.name + (index + 1));
	while(target.firstChild){
		target.removeChild(target.firstChild);
	}
	target.block = null;
}

lvl.prototype.renderEvent = function(event){
	var target = event.target;
	if(target.type == 'block'){
		target = target.parentNode;
	}
	
	var index = Number(target.id.slice(this.name.length)) - 1;
	this.render(index, active);
}

lvl.prototype.boardMouseClick = function(event){
	renderEvent(event);
}

lvl.prototype.boardMouseOver = function(event){
	if(!lvl.mouseDown) return;
	this.renderEvent(event);
}

lvl.prototype.boardMouseDrag = function(event){
	renderEvent(event);
	event.preventDefault();
}

window.lvl.mouseDown = false;
document.onmousedown = function(){
	window.lvl.mouseDown = true;
}
document.onmouseup = function(){
	window.lvl.mouseDown = false;
}
