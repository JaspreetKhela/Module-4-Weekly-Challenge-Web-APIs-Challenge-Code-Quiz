// Getting the page title DOM element
var title = document.getElementById('title');
// Getting the form DOM element
var form = document.getElementById('form');
// Getting the start button DOM element
var startButton = document.getElementById('start-quiz');
// Getting the feedback paragraph DOM element
var feedback = document.getElementById('feedback');
// Getting the timer DOM element
var timerDisplay = document.getElementById('timer');
// Getting reset button DOM element
var resetButton = document.getElementById('reset');
// Getting submit score button DOM element
var submitScoreButton = document.getElementById('submit-score');
// Getting the clear scores button DOM element
var clearScoresButton = document.getElementById('clear-scores');
// Getting the header paragraph DOM element
var headerText = document.getElementById("header-text");
// Getitng the anchor DOM element
var viewScores = document.getElementById("view-scores");

// Initializing the allowed time for the quiz
var time = 60;
// Initializing the answer provided by the user
var providedAnswerIndex = 4;
// Initializing the index of the correct answer in a question object
var correctAnswerIndex = 0;
// Initialize the deducted time for an incorrect answer
var deductedTime = '10';
// Initialize whether or not points are to be deducted for an incorrect answer
var deductPoints = false;
// Initialing the counter for the number of questions
var counter = 0;
// Initializing the number of questions to ask
var numberOfQuestions = 5;
// Initializing the user's info object
var userInfo = {
    name: '',
    score: 0
}
// Initialzing the scores list
var userScores = JSON.parse(localStorage.getItem("userScores"));

// Questions array with question objects
var questions = [
    {question:"Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>","<script>","<scripting>","<js>"],
    answer: "<script>"},

    {question: "What is the correct JavaScript syntax to change the content of the HTML element below? <p id='demo'>This is a demonstration.</p>",
    choices: ["document.getElementById('demo').innerHTML = 'Hello World!';","demo.innerHTML = 'Hello World';","document.getElementByName('p').innerHTML = 'Hello World';","document.getElement('p').innerHTML = 'Hello World!';"],
    answer: "document.getElementById('demo').innerHTML = 'Hello World!';"},

    {question:"Where is the correct place to insert a JavaScript?",
    choices: ["The <body> section","The <head> section","Both the <head> section and the <body> section are correct","Trick question!"],
    answer: "Both the <head> section and the <body> section are correct"},

    {question:"What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: ["<script> name='xxx.js'","<script src='xxx.js'>","<script href='xxx.js'>","Trick question!"],
    answer: "<script src='xxx.js'>"},

    {question:"The external JavaScript file must contain the <script> tag.",
    choices: ["True","False","What?","Trick question!"],
    answer: "False"},

    {question: "How do you write 'Hello World' in an alert box?",
    choices: ["alert('Hello World')","msgBox('Hello World')","msg('Hello World')","alertBox('Hello World')"],
    answer: "alert('Hello World')"},

    {question:"How do you create a function in JavaScript?",
    choices: ["function:myFunction()","function myFunction()","function = myFunction()","Trick question!"],
    answer: "function myFunction()"},

    {question: "How do you call a function named 'myFunction'?",
    choices: ["myFunction()","call myFunction()","call function myFunction()","Trick question!"],
    answer:"myFunction()"},

    {question: "How to write an IF statement in JavaScript?",
    choices: ["if i==5 then","if (i==5)","if i=5 then","if i=5"],
    answer: "if (i==5)"},

    {question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    choices: ["if (i<>5)","if i<>5","if (i!=5)","if i=!5 then"],
    answer: "if (i!=5)"},

    {question: "How does a WHILE loop start?",
    choices: ["while (i<=10)","while i=1 to 10","while (i<=10; i++)","Trick question!"],
    answer: "while (i<=10)"},

    {question: "How does a FOR loop start?",
    choices: ["for i=1 to 5","for (i=0; i<=5; i++)","for (i=0; i<=5)","for (i<=5; i++)"],
    answer: "for (i=0; i<=5; i++)"},

    {question: "How can you add a comment in a JavaScript?",
    choices: ["'This is a comment","<!--This is a comment-->","//This is a comment","Trick question"],
    answer: "//This is a comment"},

    {question: "How to insert a comment that has more than one line?",
    choices: ["/*This comment has more than one line*/","//This comment has more than one line","<!--This comment has more than one line-->","Trick question"],
    answer: "/*This comment has more than one line*/"},

    {question: "What is the correct way to write a JavaScript array?",
    choices: [" var colors = (1:'red', 2:'green', 3:'blue')","var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')","var colors = 'red', 'green', 'blue'","var colors = ['red', 'green', 'blue']"],
    answer: "var colors = ['red', 'green', 'blue']"},

    {question: "How do you round the number 7.25, to the nearest integer?",
    choices: ["rnd(7.25)","Math.round(7.25)","round(7.25)","Math.rnd(7.25)"],
    answer: "Math.round(7.25)"},

    {question: "How do you find the number with the highest value of x and y?",
    choices: ["Math.max(x,y)","ceil(x,y)","Math.ceil(x,y)","top(x,y)"],
    answer: "Math.max(x,y)"},

    {question: "What is the correct JavaScript syntax for opening a new window called 'w2' ?",
    choices: ["w2 = window.new('http://www.w3schools.com')","w2 = window.open('http://www.w3schools.com')","What?","Trick question"],
    answer: "w2 = window.open('http://www.w3schools.com')"},

    {question: "JavaScript is the same as Java.",
    choices: ["True","False","What?","Trick question"],
    answer: "False"},

    {question: "How can you detect the client's browser name?",
    choices: ["client.navName","browser.name","navigator.appName","Trick question"],
    answer: "navigator.appName"},

    {question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseclick","onmouseover","onclick","onchange"],
    answer: "onclick"},

    {question: "How do you declare a JavaScript variable?",
    choices: ["var carName","variable carName","v carName","Trick question!"],
    answer: "var carName"},

    {question: "Which operator is used to assign a value to a variable?",
    choices: ["-","x","*","="],
    answer: "="},

    {question: "What will the following code return: Boolean(10 > 9)",
    choices: ["true","NaN","false","Trick question!"],
    answer: "true"},

    {question: "Is JavaScript case-sensitive?",
    choices: ["Yes","No","Maybe","So"],
    answer: "Yes"},
];

// Create timer
function startTimer(duration, display) {
    // Declaring variables and initializing timer with the value of duration
    var timer = duration, minutes, seconds;

    // Initializing and running the timer
    var countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // Deducting points if user's answer is incorrect
        if (deductPoints) {
            timer = timer - parseInt(deductedTime);
        }

        // Reseting variable
        deductPoints = false;
        
        // Displaying timer
        display.textContent = "Time Left: " + minutes + ":" + seconds;

        // If time runs out or if all of the provided questions have been attempted
        if ((--timer < 0)||(counter == numberOfQuestions)) {
            userInfo.score = timer;          
            clearInterval(countdown);            
            form.style.display = "none";
            feedback.textContent = "Time is up! Your score is: " + timer;
            submitScoreButton.style.display = "block";
        }
    }, 1000);

    if (userInfo.score <= 0) {
        userInfo.score = 0;
    }
    
    return userInfo.score;
}

// Update the question
function updateQuestion(){
    // Generate a new question
    chosenQuestion = questions[(Math.floor(Math.random()*questions.length))];
    // Store question's answer
    answer = chosenQuestion.answer;
    // Store question's index
    correctAnswerIndex = chosenQuestion.choices.indexOf(answer);

    // Update questions in form
    document.getElementById('question').textContent = chosenQuestion.question;

    // Update options in form
    document.querySelector('label[for=option-1]').textContent = chosenQuestion.choices[0];
    document.querySelector('label[for=option-2]').textContent = chosenQuestion.choices[1];
    document.querySelector('label[for=option-3]').textContent = chosenQuestion.choices[2];
    document.querySelector('label[for=option-4]').textContent = chosenQuestion.choices[3];
}

// Check for correct answer and display the results to the page
function correctAnswerCheck(){
    //console.log(providedAnswerIndex,correctAnswerIndex);
    //console.log(providedAnswerIndex == correctAnswerIndex);
    if (providedAnswerIndex == correctAnswerIndex) {
        feedback.textContent = 'Your answer was correct!';
        deductPoints = false;
    }
    else {
        feedback.textContent = 'Your answer was incorrect! We have deducted ' + deductedTime + ' seconds from the timer.';
        deductPoints = true;
    }
}

// Store the user's score
function saveScore() {
    if (!userScores) {
        userScores = [];
    }
    userScores.push(userInfo);
    localStorage.setItem("userScores", JSON.stringify(userScores));
}

// Display the high scores
function displayScores() {
    form.style.display = "none";
    submitScoreButton.style.display = "none";
    title.textContent = "Recent Scores";

    headerText.textContent = '';

    for (var i = 0; i < userScores.length; i++) {
        headerText.textContent += userScores[i].name + " has a score of " + userScores[i].score + ". ";
    }
}

function clearScores() {
    localStorage.clear();
    headerText.textContent = 'Scores have been cleared!';
}

// Updating name key value in the userInfo object
userInfo.name = window.prompt("What is your name?", "John Smith");

// Hiding form, submitScoreButton, and clearScoreButton initially
form.style.display = "none";
submitScoreButton.style.display = "none";
clearScoresButton.style.display = "none";


// Display the high scores
viewScores.addEventListener('click', function(){
    displayScores();
});

// Display the form
startButton.addEventListener('click', function(){
    //
    headerText.textContent = "Take our quiz below! Your score will be the time left on the timer. For each incorrect answer, you will loose 10 seconds from the time left below."

    // Update the question and options in the form
    updateQuestion();

    // Hide the start button
    startButton.style.display = "none";

    // Display the form
    form.style.display = "block";

    // Start timer when start button is clicked
    userInfo.score = startTimer(time, timerDisplay);
});

form.addEventListener('submit', function(event){
    // Prevent default event behaviours
    event.preventDefault();

    // Get form DOM elements
    var firstOption = document.getElementById("option-1");
    var secondOption = document.getElementById("option-2");
    var thirdOption = document.getElementById("option-3");
    var forthOption = document.getElementById("option-4");

    // If first option is chosen
    if (firstOption.checked){
        providedAnswerIndex = firstOption.value; 
        correctAnswerCheck();
        firstOption.checked = false;
    }

    // If second option is chosen
    if (secondOption.checked){
        providedAnswerIndex = secondOption.value;
        correctAnswerCheck();
        secondOption.checked = false;
    }

    // If third option is chosen
    if (thirdOption.checked){
        providedAnswerIndex = thirdOption.value;
        correctAnswerCheck();
        thirdOption.checked = false;
    }

    // If forth option is chosen
    if (forthOption.checked){
        providedAnswerIndex = forthOption.value;
        correctAnswerCheck();
        forthOption.checked = false;
    }

    counter++;

    if (counter < numberOfQuestions){
        // Update the question and options in the form
        updateQuestion();
    } 
});

resetButton.addEventListener('click', function(){
    location.reload();
});

submitScoreButton.addEventListener('click', function(){
    saveScore();
    displayScores();
    viewScores.style.display = "none";
    timerDisplay.style.display = "none";
    feedback.style.display = "none";
    clearScoresButton.style.display = "block";
});

clearScoresButton.addEventListener('click', function(){
    clearScores();
});