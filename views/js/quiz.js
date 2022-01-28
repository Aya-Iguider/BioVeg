const socket = io()
class Question {

  constructor(text, choices, answer) { //informations que l'on veut afficher et récupérer
    this.text = text; //le texte sera contenu dans la variable this.text
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) { //va vérifier si la réponse est correcte ou non
    return this.answer === choice; // si "choice" est égal à "this.answer", ca renvoie true == booléen
  }

}

let questions = [

  new Question("Quel est le premier organe qui émerge lors de la germination ?", ["Racine", "Feuille", "Tige", "Bourgeon"], "Racine"),

  new Question("Parmi les réponses suivantes, lequel de ces méristèmes ne fait pas partie des méristèmes primaires ?", ["protoderme", "Procambium", "Cambium", "Méristème fondamental"], "Cambium"),

  new Question("Le procambium est à l’origine de quel tissu primaire ?", ["Epiderme", "Xylème et phloème primaire", "Tissu fondamental", "Xylème et phloème secondaire"], "Xylème et phloème primaire"),

  new Question("Que ne transporte pas le phloème ?", ["Sucres", "Lipides", "ARN", "Protides"], "Protides"),

  new Question("Par quoi est portée une fleur isolée ?", ["Un pédicelle", "Un pédoncule", "un réceptacle", "Une inflorescence"], "Un pédoncule"),

  new Question("Quels sont les deux types de tissus existants ?", ["Tissus simples (plusieurs types de cellules) et composés (un seul type de cellule)", "Tissus pluriel (plusieurs types de cellules) et uniques (un seul type de cellule)", "Tissus pluriel (plusieurs types de cellules) et simples (un seul type de cellule)", "Tissus composés (plusieurs types de cellule) et simples (un seul type de cellule)"], "Tissus composés (plusieurs types de cellule) et simples (un seul type de cellule)")


];


class Quiz {

  constructor(questions) {
    this.score = 0; //score qui commence à 0
    this.questions = questions;
    this.currentQuestionIndex = 0; // index de la question (commence tjs à 0)
  }

  getCurrentQuestion() { //pour avoir la question actuelle (utilise l'index)
    return this.questions[this.currentQuestionIndex];
  }

  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++; //augmente ton score de 1 si la réponse est correcte
    }
    this.currentQuestionIndex++; // passe à la question suivante (avec l'index)
  }

  hasEnded() { //programme finit si l'index question est le même chiffre que la taille du tableau de nbr de question
    return this.currentQuestionIndex >= this.questions.length;
  }
}


// Regroup all  functions relative to the App Display
const display = {

  elementShown: function (id, text) { // fonction qui a comme paramètres id et text
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  endQuiz: function () {
    endQuizHTML = `
        <h1><span>Q</span>uiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
        <p class="qtext"><a href="/">Accueil</a></p>`;
    this.elementShown("quiz", endQuizHTML);

    if((quiz.score/quiz.questions.length)*100 > 70){
      startConfetti();
    }
    else if((quiz.score/quiz.questions.length)*100 > 30 ){
      for (let j = 0; j<10;j++){
        document.getElementById("snowflakes").innerHTML +='<div class="snowflake">😐</div>';
      }
    }
    else{
      for (let j = 0; j<10;j++){
        document.getElementById("snowflakes").innerHTML +='<div class="snowflake">👎🏻</div>';
      }
    }

  },

  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },

  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      }
    }
    // display choices and handle guess
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choix" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },

  progress: function () {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

// Timer


let timerElement = document.getElementById("timer");
let counter = 30;
function startTimer() {

  var timer = setInterval(function () {

    let minutes = parseInt(counter / 60, 10);
    let secondes = parseInt(counter % 60, 10);
    timerElement.innerText = minutes + ":" + secondes;
    counter--;
    if (counter == 0) {
      setTimeout(function () {
        display.endQuiz();
        timerElement.innerText = "Le temps est écoulé ";

        clearInterval(timer);

      }, 1000)
    }

  }, 1000)
}



// Game logic
quizApp = () => {
  if (quiz.hasEnded()) { // détermine quand le quiz est fini (teste si c'est true)
    display.endQuiz(); // on dit end quand le quiz est fini
  }

  else if (counter == 0) {

    display.endQuiz();


  }

  else { // sinon
    display.question(); // on veut afficher la question
    display.choices(); // les choix
    display.progress(); // le progress
  } 
}


// Create Quiz
let quiz = new Quiz(questions);

//affichage du bouton de demarrage
let startBtn = document.getElementById("startBtn");
let quizCtn = document.getElementById('quizContainer')
let startCtn = document.getElementById("startContainer");

const formLogin = document.getElementById("formLogin");
const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");

const login = document.getElementById("login");

quizCtn.style.display = 'none';
startBtn.addEventListener('click',()=>{
  let dataConnect = {'email':email.value,'password':password.value}
  socket.emit('queryconnexion',dataConnect)
})

socket.on('wrongconnexion',()=>{
  document.getElementById("errorMessage").style.display = "block" 
})

socket.on('goodconnexion',()=>{
  startTimer();
  quizCtn.style.display = 'block'
  startCtn.style.display = 'none'
  quizApp(); // gère tout l'affichage de notre code
})