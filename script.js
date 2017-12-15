// I'm not fond of this being global, but students getting this assignment
// aren't yet ready for the techniques I'd use to keep it local to functions.
const exprArray = []

// Adds a symbol property to the operator functions. I know this
// isn't typical, but it makes formatting the expression easier.
// These functions are defined at the end of this file.
add.symbol = '+'
divide.symbol = '/'
subtract.symbol = '-'
multiply.symbol = '*'

document.addEventListener('DOMContentLoaded', addButtonEventListeners)

function addButtonEventListeners () {
  const buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
}

function handleButtonClick (e) {
  const buttonValue = e.target.value
  // TODO: add support for CE
  switch (buttonValue) {
    case 'ac':
      // empties the expression array
      exprArray.splice(0, exprArray.length)
      // falls through
    case '=':
      document.getElementById('answer').innerHTML = getExprResult(exprArray)
      break
    case multiply.symbol:
      exprArray.push(multiply)
      break
    case divide.symbol:
      exprArray.push(divide)
      break
    case subtract.symbol:
      exprArray.push(subtract)
      break
    case add.symbol:
      exprArray.push(add)
      break
    default:
      addNumber(buttonValue)
  }

  const currentExpr = document.getElementById('current-expression')
  currentExpr.innerHTML = makeExprText(exprArray)
}

function addNumber (value) {
  const lastIdx = exprArray.length - 1
  if (typeof exprArray[lastIdx] === 'string') {
    // for concatenating multi-digit numbers
    exprArray[lastIdx] = exprArray[lastIdx] + value
  } else {
    exprArray.push(value)
  }
}

function makeExprText () {
  return exprArray.reduce((prev, curr) => {
    return prev + ' ' + (typeof curr === 'function' ? curr.symbol : curr)
  }, '')
}

function getExprResult () {
  let operator = null
  let op1 = 0
  let op2 = 0
  exprArray.forEach((item, id) => {
    if (typeof item === 'function') {
      // TODO: add out of bounds checks
      operator = item
      op1 = Number(exprArray[id - 1])
      op2 = Number(exprArray[id + 1])
    }
  })
  // return zero if expr is an empty array
  return operator ? operator(op1, op2) : 0
}

function multiply (op1, op2) {
  return op1 * op2
}

function divide (op1, op2) {
  return op1 / op2
}

function add (op1, op2) {
  return op1 + op2
}

function subtract (op1, op2) {
  return op1 - op2
}
