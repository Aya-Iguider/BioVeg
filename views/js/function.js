const sidebar = document.getElementById("sidebar");
const socket = io();


//Pour faire afficher la navigation en dynamique

socket.emit("chapitres")
socket.emit("typeExo")
let chapTmp

socket.on('retourchapitres', (chap) => {
  chapTmp = chap;
  createSubCategories()
});


function createSubCategories() {
  for (var i = 0; i < chapTmp.length; i++) {

    var chapNom = chapTmp[i].nom;  //Nom du chapitre

    var tmp = document.createElement('div')//Div du chapitre
    tmp.id = "chapitre" + (i + 1)
    tmp.classList.add("category")
    tmp.innerHTML = "<a class='themes' href='#'>" + chapNom + "</a>"
    tmp.setAttribute('data',i+1)


    let tmpDiv = document.createElement('div')
    tmpDiv.classList.add('subthemesCtn', "hidden")
    tmpDiv.id = "drop" + (i + 1);
    tmpDiv.innerHTML = "<a class='subthemes' href='#'>Quiz</a><a class='subthemes' href='#'>Mots croisés</a><a class='subthemes' href='#'>Textes à trous</a>"

    tmp.appendChild(tmpDiv)



    sidebar.appendChild(tmp)
    console.log("event listener pour "+ (i + 1))
    document.getElementById('chapitre'+(i+1)).addEventListener('mouseenter', (e) => {
     let tmpData = e.target.parentElement.getAttribute('data')
     //console.log(tmpData)
     document.getElementById("drop"+tmpData).classList.remove('hidden')
     document.getElementById("drop"+tmpData).classList.add('visible')
    })

  }

}




var mini = true;
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

//Pour corriger le bug de la navigation 

/*document.getElementById('sidebar').addEventListener('mouseeover',()=>{
  console.log("sidebar")
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";

})
document.getElementById('sidebar').addEventListener('mouseleave',()=>{
  document.getElementById("sidebar").style.width = "30px";
  document.getElementById("main").style.marginLeft = "85px";

})*/


/*document.getElementById("dropAngioCtn0").classList.add('hidden')
document.getElementById("dropAngio0").addEventListener('mouseleave',()=>{
  document.getElementById("dropAngioCtn0").classList.add('hidden')
  document.getElementById("dropAngioCtn0").classList.remove('visible')
})
document.getElementById("dropAngio0").addEventListener('mouseover',()=>{
  document.getElementById("dropAngioCtn0").classList.remove('hidden')
  document.getElementById("dropAngioCtn0").classList.add('visible')
});*/





