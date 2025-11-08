async function connectBackend(){
    try{
    const res=await fetch("http://localhost:8888/adduser",{
        method:"POST",
        headers:{
   "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstname:"roman",
            lastname:"reings",
            emailId:"roman125@gmail.com",
            password:"roman@A124",
            skills:["fighter","wwe","wrestler"],
            age:24,
        })
    });

}
catch(err){
    console.log("Error:",err)
}
}

async function movieData(){
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
    })

}

async function getData(){
    try{
    const user= await fetch("http://localhost:8888/movieList")
 const data=await user.json();
 console.log(data)

 document.getElementById("data").innerText=JSON.stringify(data,null,2)
    }
    catch(err){
        console.log("Error",err.message)
    }
}

connectBackend();
movieData();
getData();