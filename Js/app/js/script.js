// logic:
// user input 
// parse input 
// evaluate using operator functions in order of operations
// example 3 + 5 * 6 - 2 / 4 = 32.5

// add keyboard event listener


let expression = ['0']
const expressionTag = document.querySelector('#expression')
const entryTag = document.querySelector('#entry')

// digits
const digitsTags = document.querySelectorAll('.digits')

for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        // zero -> replace
        // number -> add number
        // not number -> push number
        if (parseFloat(expression[expression.length - 1]) === 0) {
            expression[expression.length - 1] = digitsTags[i].textContent
            console.log(expression, 'zero')
        } else if (parseInt(expression[expression.length - 1])) {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'number')
        } else {
            expression.push(digitsTags[i].textContent)
            console.log(expression, 'not number')
        }
        // display expression and entry
        expressionTag.textContent = expression.join('')
        entryTag.textContent = expression[expression.length - 1]
    })
}

const decimalTag = document.querySelector('#decimal')

decimalTag.addEventListener('click', () => {
    // decimal -> do nothing 
    // number -> add decimal
    // not a number -> push zero with a decimal
    // *zero is falsey 
    if (/[.]/.test(expression[expression.length - 1])) {
        console.log(expression, 'decimal')
    } else if (parseInt(expression[expression.length - 1]) || parseFloat(expression[expression.length - 1]) === 0) {
        expression[expression.length - 1] += decimalTag.textContent
        console.log(expression, 'number')
    } else {
        expression.push('0' + decimalTag.textContent)
        console.log(expression, 'not number')
    }
    // display expression and entry
    expressionTag.textContent = expression.join('')
    entryTag.textContent = expression[expression.length - 1]
})

const operatorTags = document.querySelectorAll('.operators')

for (let i = 0; i < operatorTags.length; i++) {
    operatorTags[i].addEventListener('click', () => {
        expression.push(operatorTags[i].textContent)
        console.log(expression, "operator")
        // display expression and entry
        expressionTag.textContent = expression.join('')
        entryTag.textContent = expression[expression.length - 1]
    })
}

// evaluate
function multiply(num1, num2) {
    return num1 * num2
}

function divide(num1, num2) {
    return num1 / num2
}

function add(num1, num2) {
    return num1 + num2
}

function subtract(num1, num2) {
    return num1 - num2
}

function evaluate(operator, func) {
    while (expression.includes(operator)) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === operator) {
                expression[i] = func(expression[i - 1], expression[i + 1])
                expression.splice(i - 1, 1)
                expression.splice(i, 1)
                break
            }
        }
        console.log(expression)
    }
}

const equalsTag = document.querySelector('#equals')

equalsTag.addEventListener('click', () => {
    // turn expression strings into numbers 
    for (let i = 0; i < expression.length; i++) {
        if (parseInt(expression[i]) || parseFloat(expression[i]) === 0) {
            expression[i] = parseFloat(expression[i])
        }
    }
    console.log(expression)

    evaluate('*', multiply)
    evaluate('/', divide)
    evaluate('+', add)
    evaluate('-', subtract)

    // returns expression to strings
    expression[0].toString()
    console.log(expression)
})

// clear
const clearTag = document.querySelector('#clear')

clearTag.addEventListener('click', () => {
    expression = ['0']
    expressionTag.textContent = ''
    entryTag.textContent = expression[expression.length - 1]
    console.log(expression)
})

