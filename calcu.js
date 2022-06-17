const fs = require("fs");
const readline = require("readline");

async function readInput(question) {
    return new Promise((resolve) => {
        let userInput = null;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        rl.question(question, (choice) => {
            userInput = choice;
            rl.close();
        });
        rl.on("close", function () {
            resolve(userInput);
        })
    });
}


function printMenu() {
    console.log("-> Choose operation to perform");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication");
    console.log("4. Division");
    console.log("5. Quit the app");
}

async function acceptOperation() {
    const selectedOption = await readInput("Enter your choice : ");
    if (["1", "2", "3", "4", "5"].includes(selectedOption)) {
        return +selectedOption;
    } else {
        console.log("Wrong option selected, retry again\n");
        return acceptOperation();
    }
}

async function numberCheck() {
    const number = await readInput("");
    if (!isNaN(number)) {
        return +number;
    } else {
        console.log("Not a valid number, please try again");
        return numberCheck();
    }
}

function writeFileContents(contents) {
    try {
      fs.appendFileSync("Results.txt", contents);
    } catch (err) {
      console.error(err);
    }
  }

async function performOperation(choice) {

    let num1 = null;
    let num2 = null;
    let results = null;

    switch (choice) {
        case 1:
            console.log("Enter two numbers");
            num1 = await numberCheck();
            num2 = await numberCheck();
            results = `${num1} + ${num2} = ${num1 + num2}`;
            console.log(`\nResults\n ${results}`);
            writeFileContents(`${results}\n`);
            return;
        case 2:
            console.log("Enter two numbers");
            num1 = await numberCheck();
            num2 = await numberCheck();
            results = `${num1} - ${num2} = ${num1 - num2}`;
            console.log(`Results\n ${results}`);
            writeFileContents(`${results}\n`);
            return;
        case 3:
            console.log("Enter two numbers");
            num1 = await numberCheck();
            num2 = await numberCheck();
            results = `${num1} * ${num2} = ${num1 * num2}`;
            console.log(`Results\n ${results}`);
            writeFileContents(`${results}\n`);
            return;
        case 4:
            console.log("Enter two numbers");
            num1 = await numberCheck();
            num2 = await numberCheck();
            results = `${num1} / ${num2} = ${num1 / num2}`
            console.log(`Results\n ${results}`);
            writeFileContents(`${results}\n`);
            return;
        case 5:
            console.log(`exited, bye`);
            process.exit(1);
    }
}

async function app() {
    printMenu();
    const selectedOperation = await acceptOperation();
    await performOperation(selectedOperation);
    app();
}

console.log("****** Welcome to Calculator app *****");
app();