document.addEventListener('DOMContentLoaded', bindButtons);

	function bindButtons(){
		document.getElementById("add").addEventListener('click', function(e){
			var req = new XMLHttpRequest();
			
			//build a payload
			var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
			payload.name = document.getElementById('name').value;
			payload.reps =  document.getElementById('reps').value;
			payload.weight =  document.getElementById('weight').value;
			payload.date =  document.getElementById('date').value;
			payload.lbs =  document.getElementById('lbs').value;
			console.log("payload: " + payload.name);
			
			//req.open('GET', 'http://54.149.55.4:3000/insert', true);
			//req.setRequestHeader('Content-Type', 'application/json');
			// req.addEventListener('load',function(){
			  // if(req.status >= 200 && req.status < 400){
				// var response = JSON.parse(req.responseText);
				// console.log(response.insert);
			  // } else {
				// console.log("Error in network request: " + req.statusText);
			  // }});
			//req.send(payload);
			e.preventDefault();
	})
}