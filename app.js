const questions = [
    {
    question: 'What does HTML stand for?',
    answers: [
        { text: 'HyperText Marking Language', correct: false},
        { text: 'HyperText Markup Language', correct: true},
        { text: 'Hyper Transfer Markup Language', correct: false},
        { text: 'Hyperlink Transfer Markup', correct: false},
    ]
},
{
    question: 'What is JavaScript primarily used for in web development?',
    answers: [
        { text: 'To define the structure of a webpage', correct: false},
        { text: 'To style a webpage', correct: false},
        { text: 'To add interactivity and dynamic behavior', correct: true},
        { text: 'To manage databases', correct: false},
    ]
},
{
    question: 'What does CSS stand for?',
    answers: [
        { text: ' Cascading Simple Styles', correct: false},
        { text: 'Creative Style Sheets', correct: false},
        { text: 'Colorful Style Sheets', correct: false},
        { text: 'Cascading Style Sheets', correct: true},
    ]
},
{
    question: 'How do you declare a variable in JavaScript?',
    answers: [
        { text: 'let', correct: false},
        { text: 'var', correct: false},
        { text: 'const', correct: false},
        { text: 'All of the above', correct: true},
    ]
},
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);

    });
}

function  resetState(){
    nextButton.style.display = 'none'; 
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}
nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});


startQuiz();