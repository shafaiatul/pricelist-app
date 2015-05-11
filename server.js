var express = require('express');
var app = express(); 
var mongojs = require('mongojs');
var db = mongojs('pricelist', ['pricelist']) //which mangoDB database or collection I will be using 
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));//my static files are in "public" folder
app.use(bodyParser.json());//Now the server is able to PARSE the data from the body input field

app.get('/pricelist', function (req, res) {
		console.log("Received a GET request ");
		//lets have the server find the data from the 'pricelist' database
		db.pricelist.find(function (err, docs) { //'docs' means it will respond with the pricelist document from the database 
			console.log(docs); //to make sure I receive the data from database
			res.json(docs); //sends the data back to the 'controller'
		});

	
});
app.post('/pricelist', function(req, res) {
		console.log(req.body); //req.body -> what I received and parsed
//now I gonna be able to 'insert' the data from user input to the mongoDB
		db.pricelist.insert(req.body, function (err, doc) { //doc ->represents the items we parsed and received
			res.json(doc); //I am sending back these data to the controller.
		});

});

app.delete('/pricelist/:id', function (req, res) { //:id because id is not part of the string
	var id = req.params.id; //this basically get the value of the id from the URL
	console.log(id);
	db.pricelist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) { //ObjectID(id) this 'id' refers to variable id set in line 30, this will choose which product I wanna remove
		res.json(doc); //I am sending the product I am removing back to the controller.
		//to immediately refreh the browser page after the remove button is clicked, in controller page call the refresh function
	});
});

app.get('/pricelist/:id', function (req, res) {
	var id = req.params.id; //this basically get the value of the id from the URL
	console.log(id);
	db.pricelist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc); 
	});
});	

app.put('/pricelist/:id', function (req, res) {
	var id = req.params.id; //this basically get the value of the id from the URL
	console.log(req.body.productname); //for testing purpose, works fine
	//now officially update and modify
	db.pricelist.findAndModify({ query: {_id: mongojs.ObjectId(id)}, 
		update : {$set: {productname : req.body.productname, price : req.body.price, size : req.body.size }},//this is the update I want to set for the product I selected 
		new : true}, function (err, doc) {
			res.json(doc);
			//let go to controller.js file and tell the browser to refresh the page
		
	});
});

app.listen(3000, function(err, success) {
	if (err) {
		console.log("App is not running in localhost:3000");
	} else {
		console.log("Yay app is running good in localhost:3000");
	}
});
