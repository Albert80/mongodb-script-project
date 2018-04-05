// mongodb-script.js
// Module 3 MongoDB
// Introduction to nodejs: Microsoft

const mongodb = require('mongodb')


const insertDocs = (db, callback) => {
	// Get reference to edx-course-docs collection
	const collection = db.collection('edx-course-students')
	// Insert 3 documents
	collection.insert([
		{name: 'Bob'}, {name: 'John'}, {name: 'Peter'} // 3 documents
	], (error, result) => {
		if (error) return process.exit(1)
		console.log(result.result.n)
		console.log(result.ops.length)
		console.log('Inserted 3 documents into edx-course-students collection')
		callback(result)
	})
}


const MongoClient = mongodb.MongoClient
// Connection URI
const url = 'mongodb://localhost:27017/edx-course-db'
// USe connect method to connect to the server
MongoClient.connect(url, (err, db) => {
	if (err) return process.exit(1)
	console.log('Kudos. Connected successfully to server')
	insertDocs(db, () => {
		db.close()
	})
})
