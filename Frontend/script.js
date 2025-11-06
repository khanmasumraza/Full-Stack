async function connectBackend(){
    const res=await fetch("http://localhost:8888/about",{
        method:"POST",
        headers:{
   "Content-Type":"application/json"
        }
    })
    
    const data=await res.text();
    console.log(data);
    document.getElementById("output").innerText=data;
}    

connectBackend();