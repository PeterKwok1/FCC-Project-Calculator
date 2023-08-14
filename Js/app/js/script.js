// logic:
// user input 
// parse input 
// evaluate using operator functions in order of operations

// notes:
// *zero is falsey 

// todos:
// add keyboard event listener


let expression = ['0']
const expressionTag = document.querySelector('#expression')
const entryTag = document.querySelector('#entry')

// digits
const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        // decimal -> add number
        // zero -> replace
        // number -> add number
        // not number -> push number
        if (/[.]/.test(expression[expression.length - 1])) {
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
        // display expression and entry
        expressionTag.textContent = expression.join('')
        entryTag.textContent = expression[expression.length - 1]
    })
}

// zero
const zeroTag = document.querySelector('#zero')
zeroTag.addEventListener('click', () => {
    // decimal -> add zero
    // zero -> do nothing
    // number -> add zero
    // not number -> push zero
    if (/[.]/.test(expression[expression.length - 1])) {
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
    // display expression and entry
    expressionTag.textContent = expression.join('')
    entryTag.textContent = expression[expression.length - 1]
})

// decimal
const decimalTag = document.querySelector('#decimal')
decimalTag.addEventListener('click', () => {
    // decimal -> do nothing 
    // number -> add decimal
    // not number -> push zero with a decimal
    if (/[.]/.test(expression[expression.length - 1])) {
        console.log(expression, 'decimal')
    } else if (Number(expression[expression.length - 1]) || Number(expression[expression.length - 1]) === 0) {
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
function evaluate(exp) {

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

    function evalOp(exp, operator, func) {
        while (exp.includes(operator)) {
            for (let i = 0; i < exp.length; i++) {
                if (exp[i] === operator) {
                    exp[i] = func(exp[i - 1], exp[i + 1])
                    exp.splice(i - 1, 1)
                    exp.splice(i, 1)
                    break
                }
            }
            console.log(exp)
        }
    }

    evalOp(exp, '*', multiply)
    evalOp(exp, '/', divide)
    evalOp(exp, '+', add)
    evalOp(exp, '-', subtract)

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

    expCp = evaluate(expCp)
    expCp[0] = String(expCp[0])

    console.log(expCp, 'expCp')

    console.log(expression, 'expression')

    expression.push('=')
    expression.push(expCp[0])

    console.log(expression, 'expression')

    // display expression and entry
    expressionTag.textContent = expression.join('')
    entryTag.textContent = expression[expression.length - 1]

    // simplify evaluation history 
    expression.splice(0, expression.length - 1)

    console.log(expression, 'expression')
})

// clear
const clearTag = document.querySelector('#clear')

clearTag.addEventListener('click', () => {
    expression = ['0']

    // display expression and entry
    expressionTag.textContent = '0'
    entryTag.textContent = '0'

    console.log(expression)
})

console.log(
    // Number('-0.3')
    // Number('*')
)


