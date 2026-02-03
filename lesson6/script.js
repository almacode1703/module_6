function getHistory() {
  return document.getElementById("history-value").innerText;
}

function printHistory(num) {
  document.getElementById("history-value").innerText = num;
}

function getOutput() {
  return document.getElementById("output-value").innerText;
}

function printOutput(num) {
  if (num == "") {
    document.getElementById("output-value").innerText = "";
  } else {
    document.getElementById("output-value").innerText =
      getFormattedNumber(num);
  }
}

/* Format number with commas */
function getFormattedNumber(num) {
  if (num == "-") return "";

  let n = Number(num);
  return n.toLocaleString("en");
}

/* Remove commas */
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}

/* ---------------- Operators ---------------- */

let operators = document.getElementsByClassName("operator");

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function () {
    let output = getOutput();
    let history = getHistory();

    // CLEAR
    if (this.id == "clear") {
      printHistory("");
      printOutput("");
      return;
    }

    // BACKSPACE
    if (this.id == "backspace") {
      output = reverseNumberFormat(output).toString();
      output = output.slice(0, -1);
      printOutput(output);
      return;
    }

    // If output exists, add it into history
    if (output != "") {
      output = reverseNumberFormat(output);
      history += output;
    }

    // HANDLE EQUAL
    if (this.id == "=") {
      try {
        let result = eval(history);
        printOutput(result);
        printHistory("");
      } catch {
        printOutput("Error");
        printHistory("");
      }
      return;
    }

    // HANDLE %
    if (this.id == "%") {
      if (output != "") {
        let percentValue = output / 100;
        printOutput(percentValue);
      }
      return;
    }

    // Prevent double operator issue
    if (isNaN(history[history.length - 1])) {
      history = history.slice(0, -1);
    }

    // Add operator
    history += this.id;
    printHistory(history);
    printOutput("");
  });
}

/* ---------------- Numbers ---------------- */

let numbers = document.getElementsByClassName("number");

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    let output = reverseNumberFormat(getOutput());

    if (isNaN(output)) output = "";

    output = output + this.id;
    printOutput(output);
  });
}
