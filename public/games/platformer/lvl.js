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
		grid.addEventListener("mouseover",  this.boardMouseOver.bind(this));
		grid.addEventListener("mousedown",  this.boardMouseDown.bind(this));
		grid.addEventListener("click", this.boardMouseClick.bind(this));
	}
}

lvl.prototype.render = function(index, blockType){
	var target = document.getElementById(this.name + (index + 1));
	if(target.block == blockType || !blockType) return;
	if(target.block){
		this.clearTile(index);
	}
	if(blockType == 'delete') return;
	
	var block = document.createElement('img');
	block.style.width = '25px';
	block.style.height = '25px';
	block.src = './' + blockType + '.png';
	block.type = 'block';
	target.appendChild(block);
	target.block = blockType;
}

lvl.prototype.clearTile = function(index){
	var target = document.getElementById(this.name + (index + 1));
	while(target.firstChild){
		target.removeChild(target.firstChild);
	}
	target.block = null;
}

lvl.prototype.clearAllTiles = function(){
	for(var i = 0; i != (18 * 32); i++){
		this.clearTile(i);
	}
}

lvl.prototype.renderEvent = function(event){
	var target = event.target;
	if(target.type == 'block'){
		target = target.parentNode;
	}
	
	var index = Number(target.id.slice(this.name.length)) - 1;
	this.render(index, active);
}

lvl.prototype.export = function(){
	var array = [];
	for(var i = 0; i != (32 * 18); i++){
		array.push((document.getElementById(name + (i + 1)).block || 'null'));
	}
	return array;	
}

lvl.prototype.import = function(data){
	this.clearAllTiles();
	var array = data.split(',');
	for(var i = 0; i != (32 * 18); i++){
		if(data != 'null'){
			render(i, data[i]);
		}
	}
}

lvl.prototype.boardMouseClick = function(event){
	console.log(this);
	console.log(this.name);
	this.renderEvent(event);
}

lvl.prototype.boardMouseOver = function(event){
	if(!lvl.mouseDown) return;
	console.log(this);
	this.renderEvent(event);
}

lvl.prototype.boardMouseDrag = function(event){
	console.log(this);
	this.renderEvent(event);
	event.preventDefault();
}

window.lvl.mouseDown = false;
document.onmousedown = function(){
	window.lvl.mouseDown = true;
}
document.onmouseup = function(){
	window.lvl.mouseDown = false;
}
