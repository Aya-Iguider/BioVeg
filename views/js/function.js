const chapitre = document.getElementsByClassName("themes");
const socket = io();


//Pour faire afficher la navigation en dynamique

socket.emit("chapitres")
socket.on("retourchapitres",(chap)=>{
console.log(chap[0].nom)
  /*const chapitre = document.getElementById("themes"); 
  //pour coller ca dans les div ou le class est "themes"?
  for(var i=0;i<=chap.lenght;i++){
    var chapNom=chap[i].nom;
    chapitre.innerHTML += "<a id='chap'"+i+">"+chapNom + "</a>";
  }

  const exercice=cdocument.getElementById("themes");
  for(var i=0;i<=chap.lenght;i++){
    var chapNom=chap[i].nom;
    var lien="/"+chapNom;
    chapitre.innerHTML += "<a href='"+lien+"'id='chap'"+i+">"+chapNom + "</a>";
  } 

});*/

var mini=true;
document.getElementById("sidebar").style.width = "30px";
document.getElementById("main").style.marginLeft = "85px";
function toggleSidebar() {
  if (mini) {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.mini = false;
  } else {
    document.getElementById("sidebar").style.width = "30px";
    document.getElementById("main").style.marginLeft = "85px";
    this.mini = true;
  }
}
document.getElementById('sidebar').addEventListener('mouseeover',()=>{
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  
})
document.getElementById('sidebar').addEventListener('mouseleave',()=>{
  document.getElementById("sidebar").style.width = "30px";
  document.getElementById("main").style.marginLeft = "85px";
  
})

//Angiospermes
document.getElementById("dropAngioCtn").classList.add('hidden')
document.getElementById("dropAngio").addEventListener('mouseleave',()=>{
  document.getElementById("dropAngioCtn").classList.add('hidden')
  document.getElementById("dropAngioCtn").classList.remove('visible')
})
document.getElementById("dropAngio").addEventListener('mouseover',()=>{
  document.getElementById("dropAngioCtn").classList.remove('hidden')
  document.getElementById("dropAngioCtn").classList.add('visible')
});


//GymnoSpermes
document.getElementById("dropGymnoCtn").classList.add('hidden')
document.getElementById("dropGymno").addEventListener('mouseover',()=>{
  document.getElementById("dropGymnoCtn").classList.remove('hidden')
  document.getElementById("dropGymnoCtn").classList.add('visible')
})
document.getElementById("dropGymno").addEventListener('mouseleave',()=>{
  document.getElementById("dropGymnoCtn").classList.add('hidden')
  document.getElementById("dropGymnoCtn").classList.remove('visible')
});


//Fougeres
document.getElementById("dropFougCtn").classList.add('hidden')
document.getElementById("dropFoug").addEventListener('mouseover',()=>{
  document.getElementById("dropFougCtn").classList.remove('hidden')
  document.getElementById("dropFougCtn").classList.add('visible')
})
document.getElementById("dropFoug").addEventListener('mouseleave',()=>{
  document.getElementById("dropFougCtn").classList.add('hidden')
  document.getElementById("dropFougCtn").classList.remove('visible')
});


