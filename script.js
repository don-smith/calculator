document.addEventListener('DOMContentLoaded', addButtonEventListeners)

let expressionText = ''

function addButtonEventListeners () {
  const buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleButtonClick)
  }
}

function handleButtonClick (e) {
  if (e.target.value === '=') {
    const result = processMultiplication(expressionText.replace(/ /g, ''))
    document.getElementById('answer').innerHTML = result
    expressionText = ''
  } else {
    expressionText += ' ' + e.target.value
  }

  document.getElementById('display').innerHTML = expressionText
}

function processMultiplication (exp) {
  const opIdx = exp.indexOf('*')
  if (opIdx > -1) {
    // TODO: add out of bounds checks
    const product = Number(exp[opIdx - 1]) * Number(exp[opIdx + 1])
    return product
  }
}
