var mysql = require('mysql');
var pool = mysql.createPool({
  host  : 'localhost',
  user  : 'student',
  password: 'default',
  database: 'student'
});

var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.get('/',function(req,res,next){
  var context = {};
  pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.rows = rows;
    res.render('home', context);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.reset= "Table reset";
      res.render('home',context);
    })
  });
});

app.post('/insert',function(req,res,next){
  var context = {};

	pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?,?,?,?,?)", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insertId = result.insertId;
	res.send(context);
  });
});

app.post('/delete',function(req,res,next){
  var context = {};
  pool.query("DELETE FROM workouts WHERE id=? ", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    res.send(context);
  });
});

app.post('/update',function(req,res,next){
	var context = {};
	pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ", [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id], function(err, result){
		if(err){
		  next(err);
		  return;
		}
		//redirect home is called in the response
		context.results = "Deleted " + result.changedRows + " rows.";
		res.send(context);
	});
});

app.get('/edit',function(req,res,next){
	var ctx = {};
	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err)
		{
			next(err);
			return;
		}
		if(result.length = 1){
			var curVals = result[0];
			ctx.id = req.query.id;
			ctx.name = curVals.name;
			ctx.reps = curVals.reps;
			ctx.weight = curVals.weight;
			ctx.date= curVals.date;
			ctx.lbs = curVals.lbs;
		}
		res.render('edit', ctx);
	});
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});