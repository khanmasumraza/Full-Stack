async function connectBackend(){
    try{
    const res=await fetch("http://localhost:8888/adduser",{
        method:"POST",
        headers:{
   "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstname:"Khanh",
            lastname:"Masum",
            emailId:"masum125@gmail.com",
            password:"khan@A124",
            skills:["javascript","react","nodejs"],
            age:29,
        })
    });

}
catch(err){
    console.log("Error:",err)
}
}
connectBackend();