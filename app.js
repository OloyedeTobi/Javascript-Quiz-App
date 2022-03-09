class Quiz{
	constructor(questions){
		this.questions =  questions;
		this.index = 0;
		this.scoreCount = 0;

	}
    
   getQuestionNumber(){
   	return this.questions[this.index];
   }

   guess(answer){
   	 if(this.getQuestionNumber().isCorrect(answer))
   	 {
   	 	this.scoreCount++; 
   	 }
   	 this.index++;
   }
   
	
	quizEnd(){
		return this.index === this.questions.length
	}
}



//class for questions
class Quizquestions{
	constructor(text, choices, answer){
		this.text = text;
		this.choices = choices;
		this.answer = answer;
	}

	isCorrect(guess) {
		return this.answer === guess;
		console.log(guess)
	}
}


function showProgress() {
	let currentQuestionNumber = quiz.index + 1;
	let progressElement = document.getElementById("questionNo");
	progressElement.innerHTML =`QUESTION <span class="bold">${currentQuestionNumber}</span> of <span class="bold">${quiz.questions.length}</span>`; 
}


//show score
function outputScore(){
	let quizEndHTML = 
   	`
   	    <h1 class="end-quiz"> CONGRATULATIONS! You completed the Quiz </h1>
   	    <div class="flex"><img src="thumbsUp.jpg" class="img"></div>
   	    <h2 id = "score" class="score"> Your score:  ${quiz.scoreCount} / ${quiz.questions.length} </h2>
   	    <button class ="quiz-restart flex">
   	         <a href = "index.html"> Take Quiz Again </a>
   	    </buton> 
	`;
	let quizElement = document.getElementById("quiz-box");
	quizElement.innerHTML = quizEndHTML;
};

function guess (id, guess) {
	let button = document.getElementById(id);

	button.onclick = function() {
		quiz.guess(guess);
		displayQuestions();
	}
}




const displayQuestions = () => {
   if (quiz.quizEnd()){
   	   outputScore()
   } else {
   	let questionElement = document.getElementById("questions")
   	questionElement.innerHTML = quiz.getQuestionNumber().text;

   	let choices = quiz.getQuestionNumber().choices;

	for(let i = 1; i <= choices.length; i++){
   		let choiceElement = document.getElementById(`option${i}`)
   		choiceElement.innerHTML = choices[i - 1];
   		guess('btn' + i, choices[i - 1])
   			 
   	}
   	showProgress();

   }
};


const questions = [
      new Quizquestions (
          "In what year did Nigeria gain independence?", ["1960", "1400", "1962", "1999"], "1960"
      	),
      new Quizquestions (
          "Who is the current president of Nigeria?", ['Abdul Mohammed', 'Mohammadu Buhari', 'Ahmed Tijani', 'Uzumaki Naruto'], 'Mohammadu Buhari'
      	),
      new Quizquestions (
          "Which of these is a programming language?", ['Snake', 'Cobra', 'Python', 'Scorpion'], 'Python'
      	),
      new Quizquestions (
          "What is the capital of Lagos state", ['Onipanu', 'Ikeja', 'Lekki', 'Yaba'], 'Ikeja'
      	),
      new Quizquestions (
          "which of these is an Object Oriented language", ['HTML', 'SQL', 'C++', 'SCSS'], 'C++'
      	)
];


let quiz = new Quiz(questions);
displayQuestions();



let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("timer");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            outputScore();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();