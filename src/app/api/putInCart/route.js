export async function GET(req, res) {
// Make a note we are on
// the api. This goes to the console.
console.log("in the putInCart api page")
// get the values
// that were sent across to us.
const { searchParams } = new URL(req.url)
const pname = searchParams.get('pname')
const price = searchParams.get('price')
const username = searchParams.get('username')
console.log(pname);
console.log(price);
console.log(username);
// =================================================
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://b00148239:<w6LWK2qole6008in>@assignment1.hgyc18w.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);
const dbName = 'app'; // database name
await client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collection = db.collection('shopping_cart'); // collection name
var myobj = { pname: pname, username: username, price: price};
const insertResult = await collection.insertOne(myobj);
//==========================================================
// at the end of the process we need to send something back.
return Response.json({ "data":"" + "inserted" + ""})
}