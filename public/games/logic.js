var past = 0;
var sent = false;
window.onload = updateScores;
	
function updateScores(){
	$.get("platformer/score", function(data, status){
		var a = '';
		for(var i = 0; i != data.length; i++){
			a += '<p>' + (i + 1) + ' ' + data[i] + '</p>\n';
		}
        	document.getElementById('chart').innerHTML = a;
    	});
}

function time(data){
	if(past === data && past !== 0 && !sent){
		console.log('done');
		sent = true;
		$.post("platformer/score", {
			time: data
    		},
    		function(data, status){
			console.log('ok');
			updateScores();
       		});
	}
	past = data;
}
