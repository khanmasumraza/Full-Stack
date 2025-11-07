async function connectBackend(){
    try{
    const res=await fetch("http://localhost:8888/adduser",{
        method:"POST",
        headers:{
   "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstname:"khabib",
            lastname:"nurmadaogo",
            emailId:"khabib125@gmail.com",
            password:"khbib@A124",
            skills:["fighter","mma","wrestler"],
            age:24,
        })
    });

}
catch(err){
    console.log("Error:",err)
}
}

async function getData(){
    try{
    const user= await fetch("http://localhost:8888/getuser")
 const data=await user.json();
 console.log(data)

 document.getElementById("data").innerText=JSON.stringify(data,null,2)
    }
    catch(err){
        console.log("Error",err.message)
    }
}
getData();
connectBackend();