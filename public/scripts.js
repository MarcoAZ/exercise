//bind buttons
document.addEventListener('DOMContentLoaded', bindButtons);

//functions to delete rows
function deleteRowId(id){
     //make delete mysql request
    var req = new XMLHttpRequest();
	var payload = {id:null};
	payload.id = id;
	
	req.open('POST', 'http://54.149.55.4:3000/delete', true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load',function(){
		if(req.status >= 200 && req.status < 400)
		{
			var response = req.responseText;
			console.log(response.results);
		}
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});
  	req.send(JSON.stringify(payload));
}

function deleteRowTr(tableID,currentRow) {
    try {
        var table = document.getElementById(tableID);
        var rowCount = table.rows.length;
        for (var i = 0; i < rowCount; i++) {
            var row = table.rows[i];
            if (row==currentRow.parentNode.parentNode.parentNode) {
                table.deleteRow(i);
                rowCount--;
                i--;
            }
        }
    } catch (e) {
        alert(e);
    }
}

//functions to edit rows
var editRow = function(id){
     //redirect
    window.location = "/edit?id="+id;
}

function bindButtons(){
		document.getElementById("add").addEventListener('click', function(e){
			var req = new XMLHttpRequest();
			
			//build a payload
			var payload = {name:null, reps:null, weight:null, date:null, lbs:null};
			payload.name = document.getElementById('name').value;
			payload.reps =  document.getElementById('reps').value != "" ? document.getElementById('reps').value : 0;
			payload.weight =  document.getElementById('weight').value != "" ? document.getElementById('weight').value : 0;
			payload.date =  document.getElementById('date').value != "" ? document.getElementById('date').value : 0;
			payload.lbs =  document.getElementById('lbs').value != "" ? document.getElementById('lbs').value : 0;
			
			//create elements for later
			var tbody = document.getElementById("tbody");
			var formDel = document.createElement("form");
			var formEdit = document.createElement("form");
			//create table row and data
			var tr = document.createElement("tr");
			var tdName = document.createElement("td");
			var tdReps = document.createElement("td");
			var tdWeight = document.createElement("td");
			var tdDate = document.createElement("td");
			var tdLbs = document.createElement("td");

			var tdDelete = document.createElement("td");
			var tdEdit = document.createElement("td");
			var inputDelete = document.createElement("input");
			var inputEdit = document.createElement("input");
			
			tdName.innerHTML = payload.name;
			tdReps.innerHTML = payload.reps;
			tdWeight.innerHTML = payload.weight;
			tdDate.innerHTML = payload.date;
			tdLbs.innerHTML = payload.lbs;
			
			inputDelete.type = "submit";
			inputDelete.value = "Delete";
			inputEdit.type = "submit";
			inputEdit.value = "Edit";
			
			//apend inputs>form>td>tr>tbody
			formDel.appendChild(inputDelete);
			formEdit.appendChild(inputEdit);
			tdDelete.appendChild(formDel);
			tdEdit.appendChild(formEdit);
			tr.appendChild(tdName);
			tr.appendChild(tdReps);
			tr.appendChild(tdWeight);
			tr.appendChild(tdDate);
			tr.appendChild(tdLbs);
			tr.appendChild(tdDelete);
			tr.appendChild(tdEdit);
			
			req.open('POST', 'http://54.149.55.4:3000/insert', true);
			req.setRequestHeader('Content-Type', 'application/json');
			req.addEventListener('load',function(){
			if(req.status >= 200 && req.status < 400)
			{
				var response = JSON.parse(req.responseText);
				inputDelete.addEventListener('click', function(e){
					//make delete request
					deleteRowId(response.insertId);
					deleteRowTr('tbody', this);
					e.preventDefault();
				 });
				 
				inputEdit.addEventListener('click', function(e){
					//render edit form
					editRow(response.insertId);
					e.preventDefault();
				});


				tbody.appendChild(tr);

			}
			else {
				console.log("Error in network request: " + req.statusText);
			}});
			
			req.send(JSON.stringify(payload));
			e.preventDefault();
	})
}