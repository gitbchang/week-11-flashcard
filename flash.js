var importedQuestions = require("./cardinfo.js");
var inquirer = require('inquirer');
// keep track of which question we are on
var counter = 0;

// console.log(importedQuestions.questions[0]);


function askQuestion() {
    if (importedQuestions.questions[counter] !== undefined) {
        inquirer.prompt([

            {
                type: "input",
                message: importedQuestions.questions[counter].front,
                name: "userAnswer"
            }

        ]).then(function(user) {
            if (user.userAnswer === importedQuestions.questions[counter].back) {
                console.log("That is the correct answer!");
                counter++;

            } else {
                console.log("WRONG!");
                counter++;
            }
        });
    }


}
