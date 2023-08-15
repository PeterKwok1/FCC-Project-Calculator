// logic:
// user input 
// parse input 
// evaluate using operations in order of operations

// breakdown:
//
// expression 
// key
// 
// digits
// zero
// decimal
// operators
// subtract
// 
// equal
// clear

// notes:
// *zero is falsey 

// todos:
// negatives - done: digits, 
// add keyboard event listener
// style

let expression = ['placeholder']
// the array defines the operations and their order 
let operators = [
    {
        '*': (num1, num2) => { return num1 * num2 },
        '/': (num1, num2) => { return num1 / num2 }
    },
    {
        '+': (num1, num2) => { return num1 + num2 },
        '-': (num1, num2) => { return num1 - num2 }
    }
]

const expressionTag = document.querySelector('#expression')
const displayTag = document.querySelector('#display')

// digits
const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        // equal -> replace
        // not number, negative -> append number
        // decimal -> append number
        // zero -> replace
        // number -> append number
        // not number -> push number
        if (expression.includes('=')) {
            expression = [digitsTags[i].textContent]
            console.log(expression, 'equal')
        } else if (!Number(expression[expression.length - 2]) && expression[expression.length - 1] === '-') {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'negative')
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
        // output expression and display
        expressionTag.textContent = expression.slice(1, expression.length).join('')
        displayTag.textContent = expression[expression.length - 1]
    })
}

// zero
const zeroTag = document.querySelector('#zero')
zeroTag.addEventListener('click', () => {
    // equal -> replace
    // decimal -> append zero
    // zero -> do nothing
    // number -> append zero
    // not number -> push zero
    if (expression.includes('=')) {
        expression = [zeroTag.textContent]
        console.log(expression, 'equal')
    } else if (expression[expression.length - 1].includes('.')) {
        expression[expression.length - 1] += zeroTag.textContent
        console.log(expression, 'number')
    } else if (Number(expression[expression.length - 1]) === 0) {
        console.log(expression, 'zero')
        return
    } else if (Number(expression[expression.length - 1])) {
        expression[expression.length - 1] += zeroTag.textContent
        console.log(expression, 'number')
    } else {
        expression.push(zeroTag.textContent)
        console.log(expression, 'not number')
    }
    // output expression and display
    expressionTag.textContent = expression.slice(1, expression.length).join('')
    displayTag.textContent = expression[expression.length - 1]
})

// decimal
const decimalTag = document.querySelector('#decimal')
decimalTag.addEventListener('click', () => {
    // equal -> replace
    // decimal -> do nothing 
    // zero or number -> append decimal
    // not number -> push zero with a decimal
    if (expression.includes('=')) {
        expression = ['0' + decimalTag.textContent]
        console.log(expression, 'equal')
    } else if (expression[expression.length - 1].includes('.')) {
        console.log(expression, 'decimal')
        return
    } else if (Number(expression[expression.length - 1]) === 0 || Number(expression[expression.length - 1])) {
        expression[expression.length - 1] += decimalTag.textContent
        console.log(expression, 'number')
    } else {
        expression.push('0' + decimalTag.textContent)
        console.log(expression, 'not number')
    }
    // output expression and display
    expressionTag.textContent = expression.slice(1, expression.length).join('')
    displayTag.textContent = expression[expression.length - 1]
})

// operators
const operatorTags = document.querySelectorAll('.operators')

for (let i = 0; i < operatorTags.length; i++) {
    operatorTags[i].addEventListener('click', () => {
        // equal -> simplify expression and push operator
        // zero or number -> push operator
        // not number -> do nothing
        if (expression.includes('=')) {
            expression.splice(1, expression.length - 2)
            expression.push(operatorTags[i].textContent)
            console.log(expression, "equal")
        } else if (Number(expression[expression.length - 1]) === 0 || Number(expression[expression.length - 1])) {
            expression.push(operatorTags[i].textContent)
            console.log(expression, "number")
        } else {
            console.log(expression, 'not number')
            return
        }
        // output expression and display
        expressionTag.textContent = expression.slice(1, expression.length).join('')
        displayTag.textContent = expression[expression.length - 1]
    })
}

const subtractTag = document.querySelector('#subtract')

subtractTag.addEventListener('click', () => {
    // equal -> simplify expression and push operator
    // placeholder or (number, not number) -> push negative
    // zero or number -> push operator
    // not number -> do nothing
    if (expression.includes('=')) {
        expression.splice(1, expression.length - 2)
        expression.push(subtractTag.textContent)
        console.log(expression, "equal")
    } else if (expression[expression.length - 1] === 'placeholder' || (Number(expression[expression.length - 2]) && !Number(expression[expression.length - 1]))) {
        expression.push(subtractTag.textContent)
        console.log(expression, 'negative')
    } else if (Number(expression[expression.length - 1]) === 0 || Number(expression[expression.length - 1])) {
        expression.push(subtractTag.textContent)
        console.log(expression, "number")
    } else {
        console.log(expression, 'not number')
        return
    }
    // output expression and display
    expressionTag.textContent = expression.slice(1, expression.length).join('')
    displayTag.textContent = expression[expression.length - 1]
})

// equal
function evaluate(exp, ops) {
    for (let i = 0; i < ops.length; i++) {
        let opStrings = Object.keys(ops[i])
        // while an element in the expression is also an operation, evaluate the first operation found
        while (exp.some((e) => opStrings.includes(e))) {
            for (let k = 0; k < exp.length; k++) {
                if (opStrings.includes(exp[k])) {
                    exp[k] = ops[i][exp[k]](exp[k - 1], exp[k + 1])
                    exp.splice(k - 1, 1)
                    exp.splice(k, 1)
                    break
                }
            }
            console.log(exp, 'expCp')
        }
    }

    return exp
}

const equalsTag = document.querySelector('#equals')

equalsTag.addEventListener('click', () => {
    // equal -> simplify expression 
    // else -> evaluate 
    if (expression.includes('=')) {
        expression.splice(1, expression.length - 2)
        console.log(expression, 'equal')
    } else {
        let expCp = [...expression]
        for (let i = 0; i < expCp.length; i++) {
            if (Number(expCp[i]) || Number(expCp[i]) === 0) {
                expCp[i] = Number(expCp[i])
            }
        }
        console.log(expCp, 'expCp')

        expCp = evaluate(expCp, operators)
        expCp[1] = String(expCp[1])

        console.log(expCp, 'expCp')

        console.log(expression, 'expression')

        expression.push('=')
        expression.push(expCp[1])

        console.log(expression, 'expression')
    }
    // output expression and display
    expressionTag.textContent = expression.slice(1, expression.length).join('')
    displayTag.textContent = expression[expression.length - 1]
})

// clear
const clearTag = document.querySelector('#clear')

clearTag.addEventListener('click', () => {
    expression = ['placeholder']
    // output expression and display
    expressionTag.textContent = '0'
    displayTag.textContent = '0'

    console.log(expression)
})

let test = [1]
console.log(
    // test[-1]
)