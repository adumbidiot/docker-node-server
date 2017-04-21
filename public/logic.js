var past = 0;
			var score = document.getElementById("score");
			function time(data){
				console.log(data);
				score.innerText = "SCORE: "+ data;
				if(past === data && past !== 0){
					score.innerHTML = "FINAL SCORE: " + data;
				}
				past = data;
			}