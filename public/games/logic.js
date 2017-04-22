var past = 0;

function time(data){
	console.log(data);
	if(past === data && past !== 0){
		$.post("score", {
			time: atob(data)
    		},
    		function(data, status){
       		});
	}
	past = data;
}
