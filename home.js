var express = require('express');
var bodyParser = require('body-parser');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(express.static('public'));

/*var request = new XMLHttpRequest();
request.open("GET", "../deliveries-sample.json", true);
request.send(null);*/
var JSON = require('deliveries-sample.json');





app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 1492);



//console.log(JSON.dropoffs[1].day);

var day = {};
var deliveries = [];
var date = new Date();
var today = date.getDay();

if (today < 2)
	today -= 1;
else
	today -= 2;


app.get('/', function(req,res)
{
	day.day = JSON.dropoffs[today].day;
	day.deliveries = JSON.dropoffs[today].deliveries;
	//day.restaurant = restaurant;
	res.render('home', day);
});

app.get('/monday', function(req,res)
{
	day.day = JSON.dropoffs[0].day;
	day.deliveries = JSON.dropoffs[0].deliveries;
	res.render('home', day);
});

app.get('/tuesday', function(req,res)
{
	day.day = JSON.dropoffs[1].day;
	day.deliveries = JSON.dropoffs[1].deliveries;
	res.render('home', day);
});

app.get('/wednesday', function(req,res)
{
	day.day = "Wednesday";
	day.deliveries = [];
	res.render('home', day);
});

app.get('/thursday', function(req, res)
{
	day.day = JSON.dropoffs[2].day;
	day.deliveries = JSON.dropoffs[2].deliveries;
	res.render('home', day);
});

app.get('/friday', function(req, res)
{
	day.day = JSON.dropoffs[3].day;
	day.deliveries = JSON.dropoffs[3].deliveries;
	res.render('home', day);
});

app.get('/saturday', function(req, res)
{
	day.day = JSON.dropoffs[4].day;
	day.deliveries = JSON.dropoffs[4].deliveries;
	res.render('home', day);
});

app.get('/sunday', function(req, res)
{
	day.day = JSON.dropoffs[5].day;
	day.deliveries = JSON.dropoffs[5].deliveries;
	res.render('home', day);
});

app.use(function(req,res)
{
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next)
{
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function()
{
	console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate.');
})

