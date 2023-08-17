// logic:
// user input 
// parse input 
// evaluate using operations in order of operations

// breakdown:
//
// key
// expression 
// 
// digits
// zero
// decimal
// operators
// subtract
// 
// clear
// equal

// notes:
// *zero is falsey 

// todos:
// negatives - done: digits, zero, decimal
// add keyboard event listener
// style

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
let expression = ['placeholder']

const expressionTag = document.querySelector('#expression')
const displayTag = document.querySelector('#display')

// digits
const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        // equal -> replace
        // decimal -> append number
        // zero -> replace
        // number or negative -> append number
        // not number -> push number
        if (expression.includes('=')) {
            expression = [digitsTags[i].textContent]
            console.log(expression, 'equal')
        } else if (expression[expression.length - 1].includes('.')) {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'number')
        }
        else if (Number(expression[expression.length - 1]) === 0) {
            expression[expression.length - 1] = digitsTags[i].textContent
            console.log(expression, 'zero')
        } else if (Number(expression[expression.length - 1]) || (!Number(expression[expression.length - 2]) && expression[expression.length - 1] === '-')) {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'number or negative')
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
    // number or negative -> append zero
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
    } else if (Number(expression[expression.length - 1]) || (!Number(expression[expression.length - 2]) && expression[expression.length - 1] === '-')) {
        expression[expression.length - 1] += zeroTag.textContent
        console.log(expression, 'number or negative')
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
    // negative -> append zero with decimal
    // not number -> push zero with decimal
    if (expression.includes('=')) {
        expression = ['0' + decimalTag.textContent]
        console.log(expression, 'equal')
    } else if (expression[expression.length - 1].includes('.')) {
        console.log(expression, 'decimal')
        return
    } else if (Number(expression[expression.length - 1]) === 0 || Number(expression[expression.length - 1])) {
        expression[expression.length - 1] += decimalTag.textContent
        console.log(expression, 'number')
    } else if ((!Number(expression[expression.length - 2]) && expression[expression.length - 1] === '-')) {
        expression[expression.length - 1] += `0${decimalTag.textContent}`
        console.log(expression, 'negative')
    } else {
        expression.push(`0${decimalTag.textContent}`)
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

        // placeholder -> do nothing 
        // negative -> replace
        // not number -> replace
        if (expression.includes('=')) {
            expression.splice(1, expression.length - 2)
            expression.push(operatorTags[i].textContent)
            console.log(expression, "equal")
        } else if (Number(expression[expression.length - 1]) === 0 || Number(expression[expression.length - 1])) {
            expression.push(operatorTags[i].textContent)
            console.log(expression, "number")
        } else if (expression[expression.length - 1] === 'placeholder') {
            console.log(expression, 'negative or placeholder')
            return
        } else if (!Number(expression[expression.length - 2]) && expression[expression.length - 1] === '-') {
            expression.splice(expression.length - 2, 2, operatorTags[i].textContent)
        } else {
            expression[expression.length - 1] = operatorTags[i].textContent
            console.log(expression, 'not number')
        }
        // output expression and display
        expressionTag.textContent = expression.slice(1, expression.length).join('')
        displayTag.textContent = expression[expression.length - 1]
    })
}

const subtractTag = document.querySelector('#subtract')

subtractTag.addEventListener('click', () => {
    // equal -> simplify expression and push operator
    // zero or number -> push operator

    // placeholder or (number, not number) -> push negative
    // negative -> replace
    // not number -> replace
    if (expression.includes('=')) {
        expression.splice(1, expression.length - 2)
        expression.push(subtractTag.textContent)
        console.log(expression, "equal")
    } else if (Number(expression[expression.length - 1]) === 0 || Number(expression[expression.length - 1])) {
        expression.push(subtractTag.textContent)
        console.log(expression, "number")
    } else if (expression[expression.length - 1] === 'placeholder' || (Number(expression[expression.length - 2]) && !Number(expression[expression.length - 1]))) {
        expression.push(subtractTag.textContent)
        console.log(expression, 'negative')
    } else if (!Number(expression[expression.length - 2]) && expression[expression.length - 1] === '-') {
        expression.splice(expression[expression.length - 2], 2, subtractTag.textContent)
    } else {
        expression[expression.length - 1]
        console.log(expression, 'not number')
    }
    // output expression and display
    expressionTag.textContent = expression.slice(1, expression.length).join('')
    displayTag.textContent = expression[expression.length - 1]
})

// equal
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

        for (let i = 0; i < operators.length; i++) {
            let opKeys = Object.keys(operators[i])
            // while an element in the expression is also an operation, evaluate the first operation found
            while (expCp.some((e) => opKeys.includes(e))) {
                for (let k = 0; k < expCp.length; k++) {
                    if (opKeys.includes(expCp[k])) {
                        expCp[k] = operators[i][expCp[k]](expCp[k - 1], expCp[k + 1])
                        expCp.splice(k - 1, 1)
                        expCp.splice(k, 1)
                        break
                    }
                }
                console.log(expCp, 'expCp')
            }
        }

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

