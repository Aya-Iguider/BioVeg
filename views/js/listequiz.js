
const exo = document.getElementById("listeQuizs");

socket.emit("exoname")
socket.on("retourexoname",(exo)=>{
console.log("l'utilisateur demande la liste de tous les exercices")
    for(var i=0;i<=exo.length -1;i++){
        var lien=""
        var exoNom =exo[i].nom
        exo.innerHTML="<a class='lqs' href='"+lien+"'>"+exoNom+"</a>"
    }
});