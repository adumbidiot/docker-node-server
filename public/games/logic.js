var past = 0;
var sent = false;
window.onload = function(){
	var data = 0;
	$.get("platformer/score", function(data, status){
		/*var a = JSON.parse(data);
		console.log(a);
		var b = '';
		for(var i in a){
			b += '<p>' + i.toString() + '</p>';
		}*/
        	document.getElementById('chart').innerHTML += data;
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
