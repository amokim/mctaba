// Selecting the required elements
const display = document.querySelector("#calc-display");
const buttons = document.querySelectorAll(".calc-btn");

// Setting calculator state
let currentValue = "0";
let previousValue = null;
let pendingOperator = null;
let waitingForNewValue = false;

// Updating the display to match the currentValue
const updateDisplay = () => {
  display.textContent = currentValue;
};

// creating a function to do operation between two number
const calculate = (a, operator, b) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (operator) {
    case "+":
      return numA + numB;
    case "-":
      return numA - numB;
    case "×":
      return numA * numB;
    case "÷":
      return numB === 0 ? "Error" : numA / numB;
    default:
      return numB;
  }
};

// Handling user digit presses (0-9)
const inputDigit = (digit) => {
  if (waitingForNewValue) {
    currentValue = digit;
    waitingForNewValue = false;
  } else {
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
};

// Handling the decimal input press
const inputDecimal = () => {
  if (waitingForNewValue) {
    currentValue = "0";
    waitingForNewValue = false;
    return;
  }
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
};

// Handling the operator press
const inputOperator = (operator) => {
  if (pendingOperator !== null && !waitingForNewValue) {
    const result = calculate(previousValue, pendingOperator, currentValue);
    currentValue = String(result);
  }
  previousValue = currentValue;
  pendingOperator = operator;
  waitingForNewValue = true;
};

// Handling the = press
const evaluateResult = () => {
  if (pendingOperator === null || previousValue === null) {
    return;
  }
  const result = calculate(previousValue, pendingOperator, currentValue);
  currentValue = String(result);
  previousValue = null;
  waitingForNewValue = true;
};

// Handling the clear press button
const clearAll = () => {
  currentValue = "0";
  previousValue = null;
  pendingOperator = null;
  waitingForNewValue = true;
};

// Handling backspace
const backspace = () => {
  if (waitingForNewValue) {
    return;
  }
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
};

// Routing the button press to the right function
const handleAction = (action, value) => {
  if (action === "digit") {
    inputDigit(value);
  } else if (action === "decimal") {
    inputDecimal();
  } else if (action === "operator") {
    inputOperator(value);
  } else if (action === "equals") {
    evaluateResult();
  } else if (action === "clear") {
    clearAll();
  }
  updateDisplay();
};

// Setting up the calculator buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const value = button.dataset.value;
    handleAction(action, value);
  });
});

// Keyboard Support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    handleAction("digit", key);
  } else if (key === "+" || key === "-") {
    handleAction("operator", key);
  } else if (key === "*") {
    handleAction("operator", "×");
  } else if (key === "/") {
    event.preventDefault(); // stop the browser's quick-find from opening
    handleAction("operator", "÷");
  } else if (key === "Enter" || key === "=") {
    handleAction("equals");
  } else if (key === "Escape" || key === "c" || key === "C") {
    handleAction("clear");
  } else if (key === ".") {
    handleAction("decimal");
  } else if (key === "Backspace") {
    backspace();
    updateDisplay();
  }
});

// Setting up initial display
updateDisplay();
