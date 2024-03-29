document.addEventListener('DOMContentLoaded', bindEditButton);

//lbind edit button and hadle updating
function bindEditButton(){
	document.getElementById("edit").addEventListener('click', function(e){
		var req = new XMLHttpRequest();
		
		//build a payload
		var payload = {id:null, name:null, reps:null, weight:null, date:null, lbs:null};
		payload.id = document.getElementById('id').value;
		payload.name = document.getElementById('name').value;
		payload.reps =  document.getElementById('reps').value;
		payload.weight =  document.getElementById('weight').value;
		payload.date =  document.getElementById('date').value;
		payload.lbs =  document.getElementById('lbs').value;
		//format date correctly
		var d = new Date(payload.date);
		var month = d.getMonth() + 1; //Months are zero based
		var year = d.getFullYear();
		var day = d.getDate() +1; //days are zero based
		d = year + "-" + month + "-" + day;
		payload.date = d;
		
		req.open('POST', 'http://54.149.55.4:3000/update', true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400)
			{
				//redirect
				window.location = "http://54.149.55.4:3000";
			}
			else {
				console.log("Error in network request: " + req.statusText);
			}
		});
		req.send(JSON.stringify(payload));
		e.preventDefault();
	})
}