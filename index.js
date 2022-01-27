const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/views'));

//connexion à la BDD
/*var mysql = require('mysql')
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "",
    database : "eductseaqfbioveg",
    });

/* con.connect(function(err) {
    if (err) throw err;
    console.log("Connection à la base de données!");
<<<<<<< HEAD
    });
*/
=======
    }); */

>>>>>>> 53078d32ae8913830740eccf7e0400242ac60a69

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/html/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chapitres',()=> {
    console.log("l'user me demande les chapitres")
    let requete1= 'SELECT * FROM `themes`';
    
    
    /* con.query(requete1, (err,chap)=>{
        if (err) throw err;
        
        socket.emit('retourchapitres',chap);

        //console.log(chap[1].nom) //Gymnospermes test
   }); */
   
}); 
});

server.listen(3000, () => {
  console.log('Server successfully started on http: /localhost:3000');
});

//Tous les app.get

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/html/index.html");

});

app.get("/quiz", (request, response) => {
    response.sendFile(__dirname + "/views/html/listeQuizs.html");

});

app.get("/quiz1", (request, response) => {
    response.sendFile(__dirname + "/views/html/quiz1.html");

});

app.get("/textrou", (request, response) => {
    response.sendFile(__dirname + "/views/html/textrou.html");

});

app.get("/accueil", (request, response) => {
    response.sendFile(__dirname + "/views/html/accueil.html");

});


app.get("/annales", (request, response) => {
    response.sendFile(__dirname + "/views/html/annales.html");

});

app.get("/motscache", (request, response) => {
    response.sendFile(__dirname + "/views/html/motscache.html");

});