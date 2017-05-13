var past = 0;
var sent = false;
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
