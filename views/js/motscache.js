var question = document.getElementById("question");
var def = document.getElementById("def");
var reponse = document.getElementById("reponse");
var suivant=document.getElementById("suivant");
var progression=document.getElementById("progression");
var retour=document.getElementById("retour");
var fin=document.getElementById("fin");
var container=document.getElementById("container");
var startBtn = document.getElementById("startBtn");
var startCtn = document.getElementById("startContainer");
var exit=document.getElementById("exit");


  var questRep = [
    {
        quest:" Une inflorescence",
        rep:"Un ensemble de fleurs groupées"
    },
    {
        quest:"Le réceptacle",
        rep: "Portion où les pièces de la fleur sont insérées"
    },
    {
        quest:"Le calice",
        rep: "Nom donné à l’ensemble des sépales"
    },
    {
        quest:"Le corolle",
        rep: "Nom donné à l'ensemble des pétales"
    }
    ]
    

    var n=0;

      question.textContent=questRep[n].quest;
      def.textContent=questRep[n].rep;
      def.style.display = "none";
     

    reponse.addEventListener("click", () => {
        if(getComputedStyle(def).display != "none"){
          def.style.display = "none";
        } else {
          def.style.display = "block";
        }
        

      })

    

    function questionSuivante () {
        //if(n<(questRep.lenght-1))
        n+=1;
        question.textContent=questRep[n].quest;
        def.textContent=questRep[n].rep;
        def.style.display = "none";

    }

    suivant.addEventListener("click", () => {
      //  question.textContent=questRep[n].quest;
      if(n===questRep.length-1)
      {
          question.style.display = 'none';
          def.style.display = 'none';
          progression.style.display='none';
          reponse.style.display='none';
          suivant.style.display="none";
          retour.style.display="none";
          fin.textContent= "Exercice terminé !!";
      }
      else{

       questionSuivante ()
        }
      }
      )
      function questionPres () {
        if(n>0){
        n -=1;
        question.textContent=questRep[n].quest;
        def.textContent=questRep[n].rep;
        def.style.display = "none";

        }

       
       
        
    }

    retour.addEventListener("click", () => {
      
       questionPres ()
      
    }

    )

exit.style.display='none';
container.style.display = 'none';
startBtn.addEventListener('click',()=>{
  container.style.display = 'block'
  startCtn.style.display = 'none'
  exit.style.display='block'
})

    
