export async function GET(req, res) {

    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")


    // get the values
    // that were sent across to us.
    const { searchParams } = new URL(req.url)


    const username = searchParams.get('username')
    const email = searchParams.get('email')
    const reEmail = searchParams.get('reEmail')
    const pass = searchParams.get('pass')
    const address = searchParams.get('address')
    const telephone = searchParams.get('telephone')
    const dob = searchParams.get('dob')

    console.log(username);
    console.log(email);
    console.log(reEmail);
    console.log(pass);
    console.log(address);
    console.log(telephone);
    console.log(dob);



    // database call goes here

    // at the end of the process we need to send something back.
    return Response.json({ "data": "valid" })
}