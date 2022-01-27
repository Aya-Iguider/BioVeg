const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/views'));

//connexion à la BDD
var mysql = require('mysql')
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "",
    database : "eductseaqfbioveg",
    });

    con.connect(function(err) {
    if (err) throw err;   
    console.log("Connection à la base de données!");

    });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/html/index.html');
});

io.on('connection', (socket) => {
  console.log('socket.io est connecté');

//requete pour le nom des chapitres et les exercices qui vont avec
    socket.on('chapitres',()=> {
        console.log("l'user me demande les chapitres")
        let requete= "SELECT * FROM `themes`"; //Va chercher la table avec les chapitres
        console.log("requete effectuée") //Quiz test
        let requete2= "SELECT * FROM `type_exo`";
    
            con.query(requete, (err,chap)=>{  
                if (err)throw err 
            
                socket.emit('retourchapitres',chap);
                //console.log(type_exo[0].nom) //Quiz test
                
            }); 
            con.query(requete2, (err,type_exo)=>{  
                if (err)throw err 
            
                socket.emit('retourtypeExo',type_exo);
                console.log(type_exo[0].nom) //Quiz test

            }); 

   
    }); 


//requete pour obtenir la liste des exos
    socket.on('exoname',()=> {
        console.log("l'user me demande la liste des exos")
        let requete= 'SELECT * FROM `num_exo` WHERE ';
            con.query(requete, (err,exo)=>{
                if (err) throw err;
                
                socket.emit('retourexoname',chap);

                
            }); 
   
    }); 

/*//requete pour les questions de quiz
    socket.on('quiz',()=> {
        console.log("l'user me demande la liste des exos")
        let requete= 'SELECT * FROM `num_exo`';
            con.query(requete, (err,exo)=>{
                if (err) throw err;
                
                socket.emit('retourquiz',chap);

                
            }); 

    }); */
});

server.listen(3000, () => {
  console.log('Server successfully started on http: /localhost:3000');
});

//Tous les app.get

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/html/index.html");

});

app.get("/allquiz", (request, response) => {
    response.sendFile(__dirname + "/views/html/listeQuizs.html");

});

app.get("/alltextrou", (request, response) => {
    response.sendFile(__dirname + "/views/html/listeTextrou.html");

});

app.get("/allmotscaches", (request, response) => {
    response.sendFile(__dirname + "/views/html/listeDefinition.html");

});

app.get("/quiz1", (request, response) => {
    response.sendFile(__dirname + "/views/html/quiz1.html");

});

app.get("/textrou", (request, response) => {
    response.sendFile(__dirname + "/views/html/textrou.html");

});

app.get("/connexion", (request, response) => {
    response.sendFile(__dirname + "/views/html/connexion.html");

});




app.get("/motscache", (request, response) => {
    response.sendFile(__dirname + "/views/html/motscache.html");

});


app.get("/annales", (request, response) => {
    response.sendFile(__dirname + "/views/html/annales.html");

});