const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db){
	if(err){
		return console.dir(err);
	}
	console.log('Connected to MongoDB');

	// InsertDocument(db, function(){
	// 	db.close();
	// });

	// InsertDocuments(db, function(){
	// 	db.close();
	// });

	// FindDocuments(db, function(){
	// 	db.close();
	// });

	// QueryDocuments(db, function(){
	// 	db.close();
	// });

	// UpdateDocuments(db, function(){
	// 	db.close();
	// });

	RemoveDocuments(db, function(){
		db.close();
	});
});

// Insert Single Doc
const InsertDocument = function(db, callback){
	// Get collection
	const collection = db.collection('users');
	// Insert docs
	collection.insert({
		name: 'Neil',
		email: 'neil@neil.com'
	}, function(err, result){
		if(err){
			return console.dir(err);
		}
		console.log('Inserted Document');
		console.log(result);
		callback(result);
	});
}

// Insert Multiple docs
const InsertDocuments = function(db, callback){
	// Get collection
	const collection = db.collection('users');
	collection.insertMany([
		{
			name: 'Neil',
			email: 'neil@neil.com'
		},
		{
			name: 'Sam',
			email: 'sam@neil.com'
		},
		{
			name: 'John',
			email: 'john@neil.com'
		}
	], function(err, result){
		if(err){
			return console.dir(err);
		}
		console.log('Inserted ' + result.ops.length + ' documents');
		callback(result);
	});
}

const FindDocuments = function(db, callback){
	// Get collection
	const collection = db.collection('users');
	collection.find({}).toArray(function(err, docs){
		if(err){
			return console.dir(err);
		}
		console.log('Found the following records');
		console.log(docs);
		callback(docs);
	});
}

const QueryDocuments = function(db, callback){
	// Get Collection
	const collection = db.collection('users');

	collection.find({'name': 'Neil'}).toArray(function(err, docs){
		if(err){
			return console.dir(err);
		}
		console.log('Found the following record');
		console.log(docs);
		callback(docs);
	});
}

const UpdateDocuments = function(db, callback){
	// Get collection
	const collection = db.collection('users');

	collection.updateOne({name: 'Neil'}, 
		{$set: {email: 'neil@abcd.com'}}, 
		function(err, result){
		if(err){
			return console.dir(err);
		}
		console.log('Updated Document');
		callback(result);
	});
}

const RemoveDocuments = function(db, callback){
	const collection = db.collection('users');

	collection.deleteOne({email: 'neil@abcd.com'}, 
		function(err, result){
			if(err){
			return console.dir(err);
		}
		console.log('Document Deleted');
		callback(result);
		});
}