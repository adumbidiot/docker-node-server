window.lvl = function(){
	this.gridTemplate = document.createElement('div');
	this.gridTemplate.style.width = '23px';
	this.gridTemplate.style.height = '23px';
	this.gridTemplate.style.border = '1px solid black';
	this.gridTemplate.style.float = 'left';
	
	this.board = document.createElement('div');
	this.board.id = 'main';
	this.board.style.width = '800px';
	this.board.height = '450px';
	
	for(var i = 0; i != (18 * 32); i++){
		var grid = this.gridTemplate.cloneNode();
		grid.id = i + 1;
		this.board.appendChild(b);
		grid.addEventListener("mouseover",  mouseoverblock);
		grid.addEventListener("mousedown",  stopdragblock);
		grid.addEventListener("click", render);
	}
}

window.lvl.mouseDown = false;
document.onmousedown = function(){
	window.lvl.mouseDown = true;
}
document.onmouseup = function(){
	window.lvl.mouseDown = false;
}

function render(event){
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
