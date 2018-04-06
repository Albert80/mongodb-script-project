// mongodb-script.js
// Module 3 MongoDB
// Introduction to nodejs: Microsoft
// mongdb version 3.x

const mongodb = require('mongodb')

// Insert documents
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

// Updating Documents
const updateDoc = (db, callback) => {
	// Get the edx-course-students collection
	const collection = db.collection('edx-course-students')
	// Update document where a is 2, set b equal to 1
	const name = 'Peter'
	collection.update({ name : name }, { $set: { grade : 'A' } }, (error, result) => {
		if (error) return process.exit(1)
		console.log(result.result.n) // Will be 1
		console.log(`Updated the student document where name = ${name}`)
		callback(result)
	})
}

// Removing Documents
const removeDoc = (db, callback) => {
	// Get the documents collection
	const collection = db.collection('edx-course-students')
	// Insert some documents
	const name = 'Bob'
	collection.remove( {name : name }, (error, result) => {
		if (error) return process.exit(1)
		console.log(result.result.n) //will be 1
		console.log(`Removed the document where name = ${name}`)
		callback(result)
	})
}

// Finding Documents
const findDocs = (db, callback) => {
	// Get the documents collection
	const collection = db.collection('edx-course-students')
	// Find some documents
	collection.find({}).toArray((error, docs) => {
		if (error) return process.exit(1)
		console.log(2, docs.length) // will be 2 because we removed one document
		console.log(`Found the following documents:`)
		console.dir(docs)
		callback(docs)
	})
}
// ------------------------------------------------------------------------------------------
// Main
const MongoClient = mongodb.MongoClient


// Connection URI
// const url = 'mongodb://localhost:27017/edx-course-db' // for 2.x 
const url = 'mongodb://localhost:27017/edx-course-db'
// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
	if (err) return process.exit(1)
	var db = client.db('edx-course-db')
	console.log('Kudos. Connected successfully to server')
	insertDocs(db, () => {
		updateDoc(db, () => {
			removeDoc(db, () => {
				findDocs(db, () => {
					client.close()
				})
			})
			
		})
		
	})
})
