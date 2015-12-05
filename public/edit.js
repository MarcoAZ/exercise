document.addEventListener('DOMContentLoaded', loadInputs);

//loads values into form
function loadInputs(){
	var id = document.getElementById("id").value;
	pool.query("SELECT * FROM workouts WHERE id=", [id], function(err, result){
		if(err)
		{
			next(err);
			return;
		}
		if(result.length = 1){
			var curVals = result[0];
			var name = document.getElementById("name");
			var reps = document.getElementById("reps");
			var weight = document.getElementById("weight");
			var date = document.getElementById("date");
			var lbs = document.getElementById("lbs");
			
			name.value = curVals.name;
			reps.value = curVals.reps;
			weight.value = curVals.weight;
			date.value= curVals.date;
			lbs.value = curVals.lbs;
		}
	});
}