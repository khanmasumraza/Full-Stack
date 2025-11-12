async function connectBackend(){
    try{
    const res=await fetch("http://localhost:8888/adduser",{
        method:"POST",
        headers:{
   "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstname:"silicon",
            lastname:"Valley",
            emailId:"silicon12@gmail.com",
            password:"silicon@A124",
            skills:["tech hub","rich","hacker camp"],
            age:24,
        })
    });

  const user=await res.json()
console.log("User response:",user);

}
catch(err){
    console.log("Error "+err.message)
}
}

async function movieData(){
    try{
    const movie= await fetch("http://localhost:8888/movie",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
title:"Bajrangi Bhaijaan",
releaseDate:2015,
actor:"Salman khan",
heroine:"kareena kappor",
budget:200000    ,    
        })
    });

   const data= await movie.json()
   console.log("Movie response",data)
}
catch(err){
  console.log("Error" +err.message)
}

}

async function getData(){
    try{
    const user= await fetch("http://localhost:8888/getuser")
 const data=await user.json();
 console.log(data);

 document.getElementById("data").innerText=JSON.stringify(data,null,2)
    }
    catch(err){
        console.log("Error"+ err.message)
    }
}

async function init(){
    // await connectBackend();
    // await movieData();
    // await getData();
}

init();
