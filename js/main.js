// Operation Functions
let roundedDecimal = 10;
const additionOperation = (num1, num2) => {
  return +(+num1 + +num2).toFixed(roundedDecimal);
};

const subtractionOperation = (num1, num2) => {
  return +(+num1 - +num2).toFixed(roundedDecimal);
};

const multiplyOperation = (num1, num2) => {
  return +(+num1 * +num2).toFixed(roundedDecimal);
};
const divisionOperation = (num1, num2) => {
  if (+num2 != 0) {
    return +(+num1 / +num2).toFixed(roundedDecimal);
  } else {
    return "You Can't Divide By 0";
  }
};

// Operation Variables

let numberOne, operationSign, numberTwo;
let displayBox = document.getElementById("display");
let digitsButtons = document.querySelectorAll(".digits");
let operatorButtons = document.querySelectorAll(".operator");
let equalButton = document.querySelector(".equal");
let deleteOne = document.querySelector(".delete");
let clearAll = document.querySelector(".clear");
let squareRoot = document.querySelector(".square");
let minusButton = document.querySelector(".minus");
let dotButton = document.querySelector(".dot");

const operate = (num1, op, num2) => {
  if (op === "+") {
    return additionOperation(num1, num2);
  } else if (op === "-") {
    return subtractionOperation(num1, num2);
  } else if (op === "*") {
    return multiplyOperation(num1, num2);
  } else if (op === "/") {
    return divisionOperation(num1, num2);
  }
};

const clearOperator = () => {
  operatorButtons.forEach((button) => {
    button.classList.remove("choosen");
  });
};

const resetCalculator = () => {
  numberOne = null;
  numberTwo = null;
  operationSign = null;
  displayBox.value = 0;
  equalButton.classList.remove("done");
  dotButton.classList.remove("added");
};

minusButton.addEventListener("click", function () {
  displayBox.value = displayBox.value * -1;
  if (equalButton.classList.contains("done")) {
    numberOne = displayBox.value;
    numberTwo = null;
    operationSign = null;
  }
});

deleteOne.addEventListener("click", function () {
  if (!equalButton.classList.contains("done")) {
    let isChoosen = false;
    operatorButtons.forEach((button) => {
      if (button.classList.contains("choosen")) isChoosen = true;
    });
    if (isChoosen) {
      clearOperator();
      operationSign = null;
      numberOne = null;
    } else {
      if (displayBox.value.endsWith(".")) dotButton.classList.remove("added");
      displayBox.value = displayBox.value.slice(0, -1);
    }
    if (displayBox.value == "") {
      displayBox.value = 0;
    }
  }
});

clearAll.addEventListener("click", function () {
  resetCalculator();
  clearOperator();
});

squareRoot.addEventListener("click", function () {
  displayBox.value = +Math.sqrt(+displayBox.value).toFixed(roundedDecimal);
  numberOne = displayBox.value;
  operationSign = null;
  numberTwo = null;
  equalButton.classList.remove("done");
});

digitsButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (equalButton.classList.contains("done")) {
      resetCalculator();
    }
    operatorButtons.forEach((button) => {
      if (button.classList.contains("choosen")) {
        button.classList.remove("choosen");
        displayBox.value = "";
      }
    });
    if (
      displayBox.value === "0" ||
      displayBox.value === "You Can't Divide By 0"
    ) {
      displayBox.value = button.value;
    } else {
      displayBox.value += button.value;
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    dotButton.classList.remove("added");
    if (equalButton.classList.contains("done"))
      equalButton.classList.remove("done");

    if (numberOne != displayBox.value && numberOne != null) {
      numberTwo = displayBox.value;
      displayBox.value = operate(numberOne, operationSign, numberTwo);
    }
    numberOne = displayBox.value;
    operationSign = button.value;
    clearOperator();
    button.classList.add("choosen");
  });
});

dotButton.addEventListener("click", function () {
  if (!dotButton.classList.contains("added")) {
    if (equalButton.classList.contains("done")) {
      resetCalculator();
      displayBox.value = "0.";
    }
    operatorButtons.forEach((button) => {
      if (button.classList.contains("choosen")) {
        button.classList.remove("choosen");
        displayBox.value = "0.";
      }
    });
    if (displayBox.value !== "0.") displayBox.value += ".";
    dotButton.classList.add("added");
  }
});

equalButton.addEventListener("click", function () {
  numberTwo = displayBox.value;
  clearOperator();
  dotButton.classList.remove("added");
  displayBox.value = operate(numberOne, operationSign, numberTwo);

  if (displayBox.value !== "You Can't Divide By 0") {
    numberOne = displayBox.value;
  } else {
    numberOne = null;
  }
  this.classList.add("done");
});
