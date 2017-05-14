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
		grid.addEventListener("mouseover",  mouseoverblock);
		grid.addEventListener("mousedown",  stopdragblock);
		grid.addEventListener("click", this.boardClick);
	}
	
	this.library = {
		
	}
}

lvl.prototype.render = function(index, activeBrush){
	var target = document.getElementById(this.name + (index + 1));
	if(target.block == activeBrush) return;
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

lvl.prototype.boardClick = function(event){
	render(event);
}

window.lvl.mouseDown = false;
document.onmousedown = function(){
	window.lvl.mouseDown = true;
}
document.onmouseup = function(){
	window.lvl.mouseDown = false;
}

//TODO: Remove all following functions
function render(event){
	var target = event.target;
	if(target.type == 'block'){
		target = target.parentNode;
	}
	
	var index = Number(target.id.slice(level.name.length)) - 1;
	level.render(index, active);
}

//Legacy
			function mouseoverblock(event){
				if(!lvl.mouseDown) return;
				render(event);	
			}
			function stopdragblock(event){
				render(event);
				event.preventDefault();
			}
