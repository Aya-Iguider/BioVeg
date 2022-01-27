var reponse = document.getElementById("reponse");
var boutonValider = document.getElementById("boutonValider");
var question = document.getElementById("question");
var progression = document.getElementById("progression");
var fin = document.getElementById("fin");
let startBtn = document.getElementById("startBtn");


conteneur.style.display = 'none';
startBtn.style.display='block';


startBtn.addEventListener('click',()=>{
    conteneur.style.display='block';
    startBtn.style.display='none';

})*/

reponse.addEventListener('keydown',function(e){
    if(e.key==="Enter") {boutonValider.onclick()} //pour que la touche entrée valide la saisie

});

//question.textContent="Les ... et les angiospermes constituent  les spermatophytes";

var questRep = [
{
    quest:"Les ... et les angiospermes constituent  les spermatophytes",
    rep:"gymnospermes"
},
{
    quest:"Les angiospermes sont caractérisés par des fruits et des ...",
    rep: "fleurs"
},
{
    quest:"Après la fécondation, les ... deviennent des fruits et le carpelle la paroi du fruit ",
    rep: "ovules"
},
{
    quest:"Le calice et la corolle forment le ... , ce sont les parties stériles de la plante",
    rep: "périanthe"
}
]



var n=0;
var nbJuste=0;

question.textContent=questRep[n].quest;


function questionSuivante () {
    if(n<(questRep.lenght-1))
    n+=1;
    question.textContent=questRep[n].quest;

}

function quizApp () {
    progression.textContent= "Question " + 1 + " sur " + questRep.length;
  
    boutonValider.onclick=function(){
        if(n===questRep.length-1)
        {
            question.style.display = 'none';
            boutonValider.style.display = 'none';
            progression.style.display='none';
            reponse.style.display='none';
            fin.textContent= "Exercice terminé!! Votre score est de "+nbJuste+"/4" ;
        }
         if (reponse.value.toLowerCase() === questRep[n].rep)
        { //pour gérer les problèmes de majuscule on transforme tout en minuscule avant le test
            reponse.value="BRAVO !!!";
            nbJuste+=1;
            //display.progress();
            progression.textContent= "Question " + (n +2) + " sur " + questRep.length;
    
        }
        
        else {
            reponse.value = "Erreur :(";
            setTimeout (questionSuivante, 1000);
            progression.textContent= "Question " + (n +2) + " sur " + questRep.length;
        }
        setTimeout (function(){reponse.value=""}, 1000); //au bout de 2 secondes on remet la zone de saisi vierge
        setTimeout (questionSuivante, 1000);//on appelle la question suivante si la réponse est juste
        
    
    }

}


 





//question.style.display = 'table-cell';
   // boutonValider.style.display = "table-cell";
    //progression.style.display="table-cell";
    //reponse.style.display="table-cell";
    //startBtn.style.display='none';
    //questionSuivante();
    //quizApp();