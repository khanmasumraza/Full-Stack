async function dbconnect(){
    const url="mongodb+srv://MasumRaza89:Masumdatasecure23@masumraza.qjpiwch.mongodb.net/fullstack"
    await connect(url);
}
module.exports=dbconnect

