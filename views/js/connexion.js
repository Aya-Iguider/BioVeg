const formLogin = document.getElementById("formLogin");
const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");

const login = document.getElementById("login");

const socket = io();
let join = false;

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    let dataConnect = {'email':email.value,'password':password.value}
    console.log(dataConnect)
    socket.emit('queryconnexion',dataConnect)
});

socket.on('wrongconnexion',()=>{
    console.log('c pas bon')
    document.getElementById("errorMessage").innerHTML = "Echec de la connexion" 
})

socket.on('goodconnexion',()=>{
    console.log('c bon')
    document.getElementById("errorMessage").innerHTML = "" 
})

 


