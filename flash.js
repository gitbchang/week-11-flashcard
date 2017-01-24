var importedQuestions = require("./cardinfo.js");
var importedClozeQuestions = require("./clozecardinfo.js");
var fs = require('fs');
var inquirer = require('inquirer');
// keep track of which question we are on
var counter = 0;
var joinedAnswer;
var jsonCloze;

// console.log(importedQuestions.questions.length);
// console.log(importedClozeQuestions.clozeQuestions[0]);
// askQuestion();
// getClozeAnswer();
// askClozeQuestion();
askCardType();


function askCardType(){
    counter = 0;
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to see a basic or cloze card?",
            choices: ["basic", "cloze"],
            name: "cardType"
        }
    ]).then(function(user){
        if(user.cardType === "basic"){
            askQuestion();
        }
        else if(user.cardType === "cloze"){
            askClozeQuestion();
        }
        else {
            askCardType();
        }
    });
}









//   BONUS
/*
fs.readFile("./clozecardinfojson.json", "utf8", function(err, data){
    if(err){
        console.log(err);
    }
    jsonCloze = JSON.parse(data);
    console.log(jsonCloze);
});
*/

function askClozeQuestion(){
    getClozeAnswer();
    var hiddenAnswer = "....";
    var theQuestion = importedClozeQuestions.clozeQuestions[counter].cloze;
    var curlyAnswer = "{{"+joinedAnswer+"}}";
    var replacedQuestion = theQuestion.replace(curlyAnswer, hiddenAnswer);
    // console.log(replacedQuestion);
    // console.log(joinedAnswer);
    // console.log(importedClozeQuestions.clozeQuestions.length);


        inquirer.prompt([

            {
                type: "confirm",
                message: replacedQuestion + "  Show Answer?",
                name: "userAnswer"
            }

        ]).then(function(user){
            if(user.userAnswer === true){
                console.log(joinedAnswer);
                counter++;
                startOverCloze();
                askClozeQuestion();
            }
            else {
                counter++;
                startOverCloze();
                askClozeQuestion();
            }
        });

}

function getClozeAnswer(){
    var myAnswer = importedClozeQuestions.clozeQuestions[counter].cloze;
    var getAnswerArray = [];
    // console.log(myAnswer);
    for(var i = 0; i < myAnswer.length;i++){
        // console.log(myAnswer.charAt(i));
        if(myAnswer.charAt(i) === "{"){
            if(myAnswer.charAt(i+1) === "{"){
                var starting = i+2;
                while(myAnswer.charAt(starting) !== "}"){
                    if(myAnswer.charAt(starting) === "}"){
                        if(myAnswer.charAt(starting+1) === "}"){
                            break;
                        }
                    }
                    getAnswerArray.push(myAnswer.charAt(starting));
                    starting++;
                }
            }
        }
    }
    joinedAnswer = getAnswerArray.join("");
    // console.log(joinedAnswer);
}


function askQuestion() {
    if (importedQuestions.questions[counter] !== undefined) {
        inquirer.prompt([

            {
                type: "input",
                message: importedQuestions.questions[counter].front,
                name: "userAnswer"
            }

        ]).then(function(user) {
            var userAnswerFormatted = user.userAnswer.toUpperCase();
            var cardAnswerFormatted = importedQuestions.questions[counter].back.toUpperCase();
            if (userAnswerFormatted === cardAnswerFormatted) {
                console.log("That is the correct answer!");
                counter++;
                askQuestion();

            } else {
                console.log("WRONG! The answer was: " + importedQuestions.questions[counter].back);
                counter++;
                askQuestion();
            }
        });
    }
    else {
        inquirer.prompt([

            {
                type: "confirm",
                message: "Would you like to play again?",
                name: "playAgain"
            }

        ]).then(function(user){
            if(user.playAgain === true){
                counter = 0;
                askQuestion();
            }
            else {
                askCardType();
            }

        });
    }


}

function startOverCloze(){
    if(counter === importedClozeQuestions.clozeQuestions.length){
        inquirer.prompt([

            {
                type: "confirm",
                message: "Would you like to play again?",
                name: "playAgain"
            }

        ]).then(function(user){
            if(user.playAgain === true){
                counter = 0;
                askClozeQuestion();
            }
            else {
                askCardType();
            }

        });
    }

}
