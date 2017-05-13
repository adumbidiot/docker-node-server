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
	console.log(this);
	console.log(this.name + (index + 1));
	var target = document.getElementById(this.name + (index + 1));
	console.log(target);
	if(target.block == activeBrush) return;
	if(target.block){
		this.clearTile(target);
	}
	
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
	event.target.block = null;
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

function render(event){
	var target = event.target;
	console.log(target);
	if(target.type == 'block'){
		//render_legacy(event);
		var index = Number(target.parentNode.id) - 1;
		level.render(index, active);
	}else{
		var index = Number(target.id) - 1;
		level.render(index, active);
	}
}

	
	
//Legacy
function render_legacy(event){
	if(event.target.block == active || event.target.block_id == active){
		return;
	}
				var bl = document.createElement('img');
				bl.style.width = "25px";
				bl.style.height = "25px";
				switch(active){
					case "block":
						var parent = event.target.parentElement;
						clear(event);
						bl.src = "./Block.png";
						bl.id = "bl";
						bl.block_id = "block";
						if(event.target.id == 'bl'){
							parent.appendChild(bl);
							parent.block = "block";
						}else{
							event.target.appendChild(bl);
							event.target.block = "block";
						}
						break;
					case "block_key":
						var parent = event.target.parentElement;
						clear(event);
						bl.src = "./Block_key.png";
						bl.id = "bl";
						bl.block_id = "block_key";
						if(event.target.id == 'bl'){
							parent.appendChild(bl);
							parent.block = "block_key";
						}else{
							event.target.appendChild(bl);
							event.target.block = "block_key";
						}
						break;
					case "item_key":
						var parent = event.target.parentElement;
						clear(event);
						bl.src = "./item_key.png";
						bl.id = "bl";
						bl.block_id = "item_key";
						if(event.target.id == 'bl'){
							parent.appendChild(bl);
							parent.block = "item_key";
						}else{
							event.target.appendChild(bl);
							event.target.block = "item_key";
						}
						break;
					case "delete":
						clear(event);
						break;
					default:
						clear(event);
						break;
				}
			}
			function mouseoverblock(event){
				if(!lvl.mouseDown) return;
				render(event);	
			}
			function stopdragblock(event){
				render(event);
				event.preventDefault();
			}
