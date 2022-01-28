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

var chapitreChoisi, exoChoisi
let target = "@student.junia.com"


io.on('connection', (socket) => {

  console.log('socket.io est connecté');

    //requete de connexion
    socket.on("queryconnexion",(dataConnect)=>{
        console.log(dataConnect.email + ' veut se connecter avec le mdp : ' + dataConnect.password)
        if(dataConnect.password != 'admin'){
            console.log("c'est pas le bon mdp")
            socket.emit('wrongconnexion')
        }
        else if(dataConnect.email.substr(-target.length) != target){
            console.log("c'est le bon fin de mail")
            socket.emit('wrongconnexion')
        }
        else{
            console.log("c'est tout bon connect moi mon zouave ! ")
            socket.emit('goodconnexion')
        }
    })
//requete pour le nom des chapitres et les exercices qui vont avec
    socket.on('chapitres',()=> {
        console.log("l'user me demande les chapitres")
        let requete= "SELECT * FROM `themes`"; //Va chercher la table avec les chapitres
            con.query(requete, (err,chap)=>{  
                if (err)throw err 
            
                socket.emit('retourchapitres',chap);
                //console.log(type_exo[0].nom) //Quiz test
                
            }); 
    }); 

    socket.on('choixUser',(chapAttribute,exoAttribute)=>{
        console.log("user à cliqué sur un exercice")
        let requete= "SELECT * FROM `themes`";
        con.query(requete, (err,chap)=>{  
            if (err)throw err 
            for(var i=0;i<=chap.length-1;i++){
                if(chap[i].id==chapAttribute && 1<=exoAttribute<=3){
                    console.log("Boucle if ok")
                    chapitreChoisi=chap[i]
                    switch (exoAttribute) {
                        case "1": exoChoisi={id:1,nom:"Quiz"}
                        break;
                        case "2": exoChoisi={id:2,nom:"MotCache"}
                        break;
                        case "3": exoChoisi={id:3,nom:"TexteTrou"}

                        break;
                    }
                    socket.emit('retourClick',chapitreChoisi,exoChoisi) 
                    app.get("/allquiz/:chap&:exo", (request, response) => {
                        var chap = request.params.chapitre
                        var exo = request.params.exo
                        
                        response.sendFile(__dirname + "/views/html/listeQuizs.html");
                    
                    });
                }
            }  
        }); 
    })


//requete pour obtenir la liste des exos
    socket.on('exolist',()=> {
        console.log("l'user me demande la liste des exos")
        console.log(chapitreChoisi+"et"+exoChoisi)
        let requete= 'SELECT * FROM `num_exo` WHERE ';
            con.query(requete, (err,exo)=>{
                if (err) throw err;
                
                socket.emit('retourexoname',chap);

                
            }); 
   
    }); 

});

server.listen(3000, () => {
  console.log('Server successfully started on http: /localhost:3000');
});

//Tous les app.get

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/html/index.html');
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

