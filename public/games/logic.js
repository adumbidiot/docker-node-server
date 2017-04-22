var past = 0;
var sent = false;

function time(data){
	if(past === data && past !== 0){
		console.log('done');
		$.post("platformer/score", {
			time: data
    		},
    		function(data, status){
			console.log('ok');
       		});
	}
	past = data;
}
