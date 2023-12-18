export async function GET(req, res) {
    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")
    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    const pass = searchParams.get('pass')
    const address = searchParams.get('address')
    const telephone = searchParams.get('telephone')
    const dob = searchParams.get('dob')
    const { MongoClient } = require('mongodb');
    const url = 'mongodb+srv://b00148239:qwerty123@assignment1.hgyc18w.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(url);
    const dbName = 'app'; // database name
    await client.connect();
    console.log('Connected successfully to server');
    var validator = require("email-validator");
    const db = client.db(dbName);
    const collection = db.collection('login'); // collection name
    
    const findResult = await collection.find({
        "username": username,
        "pass" : pass
    }).toArray();
    console.log('Found documents =>', findResult);
    let valid = false
    if (findResult.length > 0) {
        valid = false;
        console.log("Account already created")   
    } else {
        valid = true;
        console.log("Account doesn't exist, creating account")
        const addResult = await collection.insertOne({
            "username" : username,
            "pass" : pass,
            "address" : address,
            "telephone" : telephone,
            "dob" : dob
        }).toArray();
        
        
    }
    //==========================================================
    // at the end of the process we need to send something back.
    
    if(valid == true){
        console.log("successfully created account");
        //sessionStorage.setItem('Login', username);
        console.log(username);
        //window.location.href = "/dashboard"
    return Response.json({"data": "valid", username})
    }

}