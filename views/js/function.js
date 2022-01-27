const sidebar = document.getElementById("sidebar");
const socket = io();

let exoAttribute
let chapAttribute


//Pour faire afficher la navigation en dynamique

socket.emit("chapitres")

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
    tmpDiv.innerHTML = "<a class='subthemes' id='1'href='#'>Quiz</a><a class='subthemes' id='2' href='#'>Mots caché</a><a class='subthemes' id='3' href='#'>Textes à trous</a>"
    tmpDiv.setAttribute('data',i+1)
    tmp.appendChild(tmpDiv)



    sidebar.appendChild(tmp)
    console.log("event listener pour "+ (i + 1))
    document.getElementById('chapitre'+(i+1)).addEventListener('mouseenter', (e) => {
     let tmpData = e.target.getAttribute('data')
     document.getElementById("drop"+tmpData).classList.remove('hidden')
     document.getElementById("drop"+tmpData).classList.add('visible')
    })
    document.getElementById('chapitre'+(i+1)).addEventListener('mouseleave', (e) => {
     let tmpData1 = e.target.getAttribute('data')
     document.getElementById("drop"+tmpData1).classList.add('hidden')
     document.getElementById("drop"+tmpData1).classList.remove('visible')
    })

    document.getElementById('drop'+(i+1)).addEventListener('click', (e) => {
      exoAttribute = e.target.getAttribute('id') 
      console.log(exoAttribute)   
      chapAttribute =e.target.parentElement.getAttribute('data')
      console.log(chapAttribute)
      socket.emit("choixUser",chapAttribute,exoAttribute)
      window.location.href="http://localhost:3000/allquiz/"+chapAttribute+"&"+exoAttribute;
     })
    
  }
    //sidebar.innerHTML = "<div id='chapitre' class='category'><a class='themes' href='annales'> Annales </a></div>"
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





