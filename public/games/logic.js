var past = 0;
var sent = false;
window.onload = function(){
	var data = 0;
	$.get("platformer/score", function(data, status){
		var a = '';
		for(var i = 0; i != (data.length-1); i++){
			a += '<p>' + data[i] + '</p>\n';
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
       		});
	}
	past = data;
}
