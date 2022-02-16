// DOM Element

const ac = document.querySelector(".ac");
const plusMinus = document.querySelector(".plus-minus");
const percent = document.querySelector(".percent");
const division = document.querySelector(".division");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const multiply = document.querySelector(".multiply");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const minus = document.querySelector(".minus");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const plus = document.querySelector(".plus");
const zero = document.querySelector(".zero");
const point = document.querySelector(".point");
const equal = document.querySelector(".equal");
const displayDown = document.querySelector(".display-down");
const displayUp = document.querySelector(".display-up");
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");

const button = document.querySelectorAll(".button");
const operator = document.querySelectorAll(".operator");
const numbers = document.querySelectorAll(".number");
const number = [zero, one, two, three, four, five, six, seven, eight, nine];

let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let temporaryOperand = "";

// function

function displayNumbers() {
  if (operation) {
    displayUp.innerHTML = `${previousOperand} ${operation}`;
  } else {
    displayUp.innerHTML = previousOperand;
  }
  displayDown.innerHTML = currentOperand;
}

function appendNumber(number) {
  // number . ile başlıyorsa ve şu anki operand . içeriyorsa yanına 2. bir . koymaması için
  if (number === "." && currentOperand.includes(".")) return;
  // number 0 ise ve şu anki operand 0 ise yanına başka 0 gelmemesi için
  if (number === 0 && currentOperand === "0") return;
  // şu anki operandın 7 basamaktan fazla olmaması için
  if (currentOperand.length > 7) return;

  if (number == multiply) {
    displayUp.innerHTML = `${previousOperand} ${operation} ${operation}`;
  }

  currentOperand = currentOperand.toString() + number.toString();

  displayNumbers();
}

function chooseOperation(selectedOperation) {
  if (temporaryOperand) {
    previousOperand = temporaryOperand.toString();
    currentOperand = "";
    temporaryOperand = "";
    operation = selectedOperation;
    displayNumbers();
    return;
  }

  operation = selectedOperation;
  previousOperand = currentOperand;
  ac.innerHTML = "AC";
  currentOperand = "";

  displayNumbers();
}

function compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (!operation) return;
  if (isNaN(previous) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = previous + current;
      break;

    case "-":
      computation = previous - current;
      break;

    case "÷":
      computation = previous - current;
      break;

    case "×":
      computation = previous * current;

    default:
      break;
  }

  if (isNaN(computation)) return;

  currentOperand = computation;
  previousOperand = "";
  operation = undefined;
  displayNumbers();
  temporaryOperand = currentOperand;
  currentOperand = "";
}

function allClear() {
  displayUp.innerHTML = " ";
  displayDown.innerHTML = " ";
}

function PlusMinus() {
  currentOperand = currentOperand * -1;
  displayNumbers();
}

function percentFunction() {
  currentOperand = currentOperand / 100;
  displayNumbers();
}

// Add Event Listeners

operator.forEach(function (item) {
  item.addEventListener("click", () => {
    chooseOperation(item.innerHTML);
  });
});

equal.addEventListener("click", () => {
  compute();
});

ac.addEventListener("click", () => {
  allClear();
});

plusMinus.addEventListener("click", () => {
  PlusMinus();
});

percent.addEventListener("click", () => {
  percentFunction();
});

numbers.forEach((item) => {
  item.addEventListener("click", () => {
    appendNumber(item.innerHTML);
    temporaryOperand = "";
  });
});

// for (let i = 0; i < number.length; i++) {
//   const num = number[i];

//   num.addEventListener("click", () => {
//     appendNumber(i);
//     // temporaryOperand = "";
//   });
// }

point.addEventListener("click", () => {
  appendNumber(".");
});

// Set up the time

const updateTime = () => {
  let currentTime = new Date();

  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();

  hour.textContent = currentHour.toString().padStart(2, "0");
  minute.textContent = currentMinute.toString().padStart(2, "0");
};

setInterval(updateTime, 1000);
// updateTime();
