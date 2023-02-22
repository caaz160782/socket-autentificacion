const miFormulario= document.querySelector('form');

miFormulario.addEventListener('submit',ev =>{
    ev.preventDefault();
    const formData={};

    for(let el of miFormulario.elements){
        if(el.name.length >0)
        formData[el.name]=el.value
    }
    //console.log(formData)
    fetch('http://localhost:8000/api/auth/login',
    {
        method: 'POST',
        headers:{'Content-Type':'application/json' 
        },
        body:JSON.stringify(formData)
    })
    .then(resp=> resp.json())
    .then(data =>{
       if(data.usuario.estado){
         localStorage.setItem('token',data.token);
         window.location.href = 'chat.html';
        }else{
             console.log("Error en psw/user");
        }
    })
    .catch(err=>{
        console.log(err)
    });

})


function handleCredentialResponse(response) {
   const body ={id_token:response.credential}
    fetch('http://localhost:8000/api/auth/google',
    {
        method: 'POST',
        headers:{'Content-Type':'application/json' 
        },
        body:JSON.stringify(body)
    })
    .then(resp=> resp.json())
    .then(resp =>{
        localStorage.setItem('token',resp.token);
        localStorage.setItem('email',resp.usuario.correo);
        window.location.href = 'chat.html';
    })
    .catch(console.warn);
}


const button= document.getElementById('google_signout');
button.onclick=()=>{
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('email'),done=>{
        localStorage.clear();
        location.reload();
    })
}


