window.lvl = function(name){
	this.name = name;
	var self = this;
	
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
	
	this.encode = {
		MAIN: 'X0',
		block: 'B0',
		block_key: 'BK',
		exit: 'E0',
		switch: 'S0',
		SwitchCeiling: 'S1',
		ToggleBlockSolid: 'T0',
		ToggleBlockPhase: 'T1',
		WireRed: 'WR',
		PowerUpBurrow: 'P0',
		PowerUpGravity: 'P1',
		item_key: 'IK',
		SecretExit: 'Z0',
		Decoration_Scaffold: 'D0',
		Decoration_Sconce: 'D1',
		Mask_Circle: 'A0',
		null: '00'
	}
	
	this.decode = {
		X0: 'Main',
		B0: 'block',
		BK: 'block_key',
		E0: 'exit',
		S0: 'switch',
		S1: 'SwitchCeiling',
		T0: 'ToggleBlockSolid',
		T1: 'ToggleBlockPhase',
		WR: 'WireRed',
		P0: 'PowerUpBurrow' ,
		P1: 'PowerUpGravity',
		IK: 'item_key',
		Z0: 'SecretExit',
		D0: 'Decoration_Scaffold',
		D1: 'Decoration_Sconce',
		A0: 'Mask_Circle',
		00: 'null'
	}
	
	this.down = function(event){
		self.renderEvent(event);
		event.preventDefault();
	}
	this.over = function(event){
		if(!lvl.mouseDown) return;
		self.renderEvent(event);
	}
	this.click = function(event){
		self.renderEvent(event);
	}
}

lvl.prototype.generateBoard = function(){
	for(var i = 0; i != (18 * 32); i++){
		var grid = this.gridTemplate.cloneNode();
		grid.id = this.name + (i + 1);
		this.board.appendChild(grid);
		
		grid.addEventListener("mouseover", this.over);
		grid.addEventListener("mousedown", this.down);
		grid.addEventListener("click", this.click);
	}
	return this.board;
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
		var element = document.getElementById(this.name + (i + 1));
		var id = element.block || 'null';
		array.push(this.encode[id]);
	}
	return array;	
}

lvl.prototype.import = function(data){
	this.clearAllTiles();
	var array = data.split(',');
	for(var i = 0; i != (32 * 18); i++){
		if(this.decode[data] != 'null'){
			this.render(i, this.decode[data[i]]);
		}
	}
}

window.lvl.mouseDown = false;
document.onmousedown = function(){
	window.lvl.mouseDown = true;
}
document.onmouseup = function(){
	window.lvl.mouseDown = false;
}
