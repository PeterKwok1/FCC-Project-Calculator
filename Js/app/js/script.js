// logic:
// user input 
// parse input 
// evaluate using operator functions in order of operations

// notes:
// *zero is falsey 

// todos:
// after evaluation, if number, overrwite - completed digits
// after evaluation, if equal, do nothing
// prevent multiple operators
// negatives
// add keyboard event listener

let expression = ['0']
const expressionTag = document.querySelector('#expression')
const displayTag = document.querySelector('#display')

// digits
const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        // equal -> reset
        // decimal -> add number
        // zero -> replace
        // number -> add number
        // not number -> push number

        if (expression.includes('=')) {
            expression = [digitsTags[i].textContent]
            console.log(expression, 'equals')
        } else if (expression[expression.length - 1].includes('.')) {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'number')
        }
        else if (Number(expression[expression.length - 1]) === 0) {
            expression[expression.length - 1] = digitsTags[i].textContent
            console.log(expression, 'zero')
        } else if (Number(expression[expression.length - 1])) {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'number')
        } else {
            expression.push(digitsTags[i].textContent)
            console.log(expression, 'not number')
        }
        // ouput expression and display
        expressionTag.textContent = expression.join('')
        displayTag.textContent = expression[expression.length - 1]
    })
}

// zero
const zeroTag = document.querySelector('#zero')
zeroTag.addEventListener('click', () => {
    // decimal -> add zero
    // zero -> do nothing
    // number -> add zero
    // not number -> push zero
    if (expression[expression.length - 1].includes('.')) {
        expression[expression.length - 1] += zeroTag.textContent
        console.log(expression, 'number')
    } else if (Number(expression[expression.length - 1]) === 0) {
        console.log(expression, 'zero')
    } else if (Number(expression[expression.length - 1])) {
        expression[expression.length - 1] += zeroTag.textContent
        console.log(expression, 'number')
    } else {
        expression.push(zeroTag.textContent)
        console.log(expression, 'not number')
    }
    // output expression and display
    expressionTag.textContent = expression.join('')
    displayTag.textContent = expression[expression.length - 1]
})

// decimal
const decimalTag = document.querySelector('#decimal')
decimalTag.addEventListener('click', () => {
    // decimal -> do nothing 
    // number -> add decimal
    // not number -> push zero with a decimal
    if (expression[expression.length - 1].includes('.')) {
        console.log(expression, 'decimal')
    } else if (Number(expression[expression.length - 1]) || Number(expression[expression.length - 1]) === 0) {
        expression[expression.length - 1] += decimalTag.textContent
        console.log(expression, 'number')
    } else {
        expression.push('0' + decimalTag.textContent)
        console.log(expression, 'not number')
    }
    // output expression and display
    expressionTag.textContent = expression.join('')
    displayTag.textContent = expression[expression.length - 1]
})

const operatorTags = document.querySelectorAll('.operators')

for (let i = 0; i < operatorTags.length; i++) {
    operatorTags[i].addEventListener('click', () => {
        expression.push(operatorTags[i].textContent)
        console.log(expression, "operator")
        // output expression and display
        expressionTag.textContent = expression.join('')
        displayTag.textContent = expression[expression.length - 1]
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

function evalOps(exp, OpsObj) {
    let OpsStrings = Object.keys(OpsObj)
    // while an element in exp is also in OpsStrings, evaluate the first operation found
    while (exp.some((e) => OpsStrings.includes(e))) {
        for (let i = 0; i < exp.length; i++) {
            if (OpsStrings.includes(exp[i])) {
                exp[i] = OpsObj[exp[i]](exp[i - 1], exp[i + 1])
                exp.splice(i - 1, 1)
                exp.splice(i, 1)
                break
            }
        }
        console.log(exp, 'expCp')
    }

    return exp
}

function evalOrd(exp) {
    exp = evalOps(exp, { '*': multiply, '/': divide })
    exp = evalOps(exp, { '+': add, '-': subtract })

    return exp
}

const equalsTag = document.querySelector('#equals')

equalsTag.addEventListener('click', () => {
    // copy expression and stringify numbers 
    let expCp = [...expression]
    for (let i = 0; i < expCp.length; i++) {
        if (Number(expCp[i]) || Number(expCp[i]) === 0) {
            expCp[i] = Number(expCp[i])
        }
    }
    console.log(expCp, 'expCp')

    expCp = evalOrd(expCp)
    expCp[0] = String(expCp[0])

    console.log(expCp, 'expCp')

    console.log(expression, 'expression')

    expression.push('=')
    expression.push(expCp[0])

    console.log(expression, 'expression')

    // output expression and display
    expressionTag.textContent = expression.join('')
    displayTag.textContent = expression[expression.length - 1]
})

// clear
const clearTag = document.querySelector('#clear')

clearTag.addEventListener('click', () => {
    expression = ['0']

    // output expression and display
    expressionTag.textContent = '0'
    displayTag.textContent = '0'

    console.log(expression)
})


