// calculate function needs numOne, operator and numTwo, run a operation depending of the operator data
const calculate = (n1, operator, n2) => {
  let result = '';
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
}

const calculator = document.querySelector('[data-calc]');
const display = calculator.querySelector('[data-display]');
const keys = calculator.querySelector('[data-keys]');

function currentDisplayContent(action, keyContent, displayedNum, previousKeyType) {
  // if key pressed is a number, don't have data-action
  if (!action) {
    if (
      // if number 0 is on screen or previous key pressed is operator or previous key pressed is equal
      displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
    ) {
      // display on screen the key pressed value, it's a number value
      display.textContent = keyContent;
    } else {
      // display on screen the first key pressed value and second value together, is for numbers of more than one digit
      display.textContent = displayedNum + keyContent;
    }
    // set previousKeyType to number
    calculator.dataset.previousKeyType = 'number';
  }
}

function operatorActions(key, action, displayedNum, previousKeyType) {
  // if key pressed is data-action + - * /
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    // store values in variables
    const numOne = calculator.dataset.numOne;
    const operator = calculator.dataset.operator;
    const numTwo = displayedNum;

    // the key pressed is a number...
    // if numOne exist and operator exist and the previous key pressed is not operator or equal 
    // it means the key pressed is a number and we have numTwo available for the function calculate
    if (
      numOne &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
    ) {
      // store calculate function in a variable
      const resultValue = calculate(numOne, operator, numTwo);
      // display on screen the result of the calculate function
      display.textContent = resultValue;
      // the result is now equal a variable numOne, we can start another calcul starting off the result
      calculator.dataset.numOne = resultValue;
    } else {
      // if the key pressed is a numOne value, is displayed on screen
      calculator.dataset.numOne = displayedNum;
    }

    // add class is-active to the key pressed
    key.classList.add('is-active');
    // set previousKeyType to data-action + - * /
    calculator.dataset.previousKeyType = 'operator';
    calculator.dataset.operator = action;
  }
}

function calc(action, displayedNum, previousKeyType) {
  // if key pressed is equal for the calculate
  if (action === 'calculate') {
    // store values in variables
    let numOne = calculator.dataset.numOne;
    const operator = calculator.dataset.operator;
    let numTwo = displayedNum;

    // if only exist numOne variable
    if (numOne) {
      // if key pressed is equal
      if (previousKeyType === 'calculate') {
        // display on screen value of numOne
        numOne = displayedNum;
        numTwo = calculator.dataset.resultValue;
      }
      // exist numOne, operator and numTwo, and calculate function run
      display.textContent = calculate(numOne, operator, numTwo);
    }

    // set numTwo variable to resultValue
    calculator.dataset.resultValue = numTwo;
    // set previousKeyType to data-action calculate
    calculator.dataset.previousKeyType = 'calculate';
  }
}

function clear(action) {
  // if key pressed is data-clear
  if (action === 'clear') {
    // display on screen number 0 for reset the function
    display.textContent = 0;
    // set numOne, resultValue and operator to empty string.
    calculator.dataset.numOne = '';
    calculator.dataset.resultValue = '';
    calculator.dataset.operator = '';
    // set previousKeyType to clear
    calculator.dataset.previousKeyType = 'clear'
  }
}

// Listen click on keys
keys.addEventListener('click', e => {
  // if click on a button
  if (e.target.matches('button')) {
    // set variables
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // go through all the key elements and remove class is-active from the items
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-active'));

    // call functions
    currentDisplayContent(action, keyContent, displayedNum, previousKeyType);

    operatorActions(key, action, displayedNum, previousKeyType);

    calc(action, displayedNum, previousKeyType);

    clear(action);
  }
})
