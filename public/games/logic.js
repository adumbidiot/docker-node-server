window.onload = updateScores;
	
function updateScores(){
	$.get("platformer/score", function(data, status){
		var a = '';
		for(var i = 0; i != data.length; i++){
			a += '<p><b>' + (i + 1) + '</b> ' + data[i].name + ': ' + data[i].score + '</p>\n';
		}
        	document.getElementById('chart').innerHTML = a;
    	});
}

function myFunction(name, time){
	console.log('NAME: ' + name);
	console.log('TIME: ' + time);
	$.post("platformer/score", {
			time: time,
			name: name
    	},
    	function(data, status){
		console.log('ok');
		updateScores();
       	});
}

function clickCustom(event){
	console.log(event.target);
	var lvl = event.target.id;
	if(lvl == 'load'){
		document.cookie = 'level=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		document.cookie="levelData=" + btoa(document.getElementById('i').value);
		return;
	}
	document.cookie = 'levelData=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	var name = 'custom';
	document.cookie = 'level=' + lvl.substr(name.length);
	updateScores(); //Why not?
}
document.cookie="level=1";
