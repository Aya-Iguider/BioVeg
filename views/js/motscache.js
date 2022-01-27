var question = document.getElementById(question);
var def = document.getElementById(def);
var rep = document.getElementById(reponse);
var suivant=document.getElementById(progression);



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
    question.textContent=questRep[n].quest;
    def.textContent=questRep[n].rep;

    rep.addEventListener("click", () => {
        if(getComputedStyle(def).display != "none"){
          def.style.display = "none";
        } else {
          def.style.display = "block";
        }
      })



   // question= questRep[n].quest;
    //def= questRep[n].rep;
    var n=0;
    function questionSuivante () {
        //if(n<(questRep.lenght-1))
        n+=1;
        question.textContent=questRep[n].quest;
        def.textContent=questRep[n].rep;
    }

    suivant.addEventListener("click", () => {
      //  question.textContent=questRep[n].quest;
       questionSuivante ()
        }
      )
    
