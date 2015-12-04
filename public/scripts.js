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
			console.log(JSON.stringify(payload));
			
			req.open('POST', 'http://54.149.55.4:3000/insert', true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400)
			{
				var response = JSON.parse(req.responseText);
				console.log(response.insertId);
				//get tbody
				var tbody = document.getElementById("tbody");
				//create table row and data
				var tr = document.createElement("tr");
				var tdName = document.createElement("td");
				var tdReps = document.createElement("td");
				var tdWeight = document.createElement("td");
				var tdDate = document.createElement("td");
				var tdLbs = document.createElement("td");
				var tdDelete = document.createElement("div");
				var tdEdit= document.createElement("div");
				
				var form = document.createElement("form");
				var inputDelete = document.createElement("input");
				var inputEdit = document.createElement("input");
				var hiddenId = document.createElement("input");
				//attach text
				tdName.innerHTML = payload.name;
				tdReps.innerHTML = payload.reps;
				tdWeight.innerHTML = payload.weight;
				tdDate.innerHTML = payload.date;
				tdLbs.innerHTML = payload.lbs;
				
				inputDelete.type = "submit";
				inputDelete.id = "delete";
				inputDelete.value = "Delete";
				
				inputDelete.type = "submit";
				inputDelete.id = "edit";
				inputDelete.value = "Edit";
				
				//need the inserted id for hidden value
				hiddenId.type = "hidden";
				hiddenId.name = "id";
				hiddenId.value = response.insertId
				
				//append inputs to td
				tdDelete.innerHTML = "<input type='submit' id='delete' value='Delete'>";
				tdEdit.appendChild(inputEdit);
				
				//append form components to form
				form.appendChild(hiddenId);
				form.appendChild(tdDelete);
				form.appendChild(tdEdit);
				
				//append everything to tr
				tr.appendChild(tdName);
				tr.appendChild(tdReps);
				tr.appendChild(tdWeight);
				tr.appendChild(tdDate);
				tr.appendChild(tdLbs);
				tr.appendChild(form);
				
				tbody.appendChild(tr);

			}
			else {
				console.log("Error in network request: " + req.statusText);
			}});
			
			req.send(JSON.stringify(payload));
			e.preventDefault();
	})
}