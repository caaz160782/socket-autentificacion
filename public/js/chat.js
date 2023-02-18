let usuario=null;
let socket=null;


const validarJWT=async()=>{
    const token =localStorage.getItem('token') || '';

    if(token.length <= 10){
        window.location='index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp= await  fetch('http://localhost:8000/api/auth',
     {
         headers:{
                    'x-token':token
                 }        
     })
     
     const {usuario:userDB, token:tokenDB}=await resp.json();
     //console.log(userDB,tokenDB)
     localStorage.setItem('token',tokenDB);
     usuario =userDB;
}



const main = async()=>{

    await validarJWT();
}

main();

//const socket=io();

