// logic:
// user input 
// parse input 
// evaluate using operations in order of operations

// breakdown:
//
// keys
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
// replace placeholder logic because multiple operators remove it from exp. the problem is that operators and subrtact remove placeholder during the negative case - solution: split the if statements so that one checks if the array is empty. 
// consider moving eval_syn and syn_rules to key, if so rename operators to key and group the operators into an operators property 
// style
// remove console logs
// check spacing in js

// keys
let expression = ['placeholder']
// array defines the operations and their order 
let key = [
    {
        '*': (num1, num2) => { return num1 * num2 },
        '/': (num1, num2) => { return num1 / num2 }
    },
    {
        '+': (num1, num2) => { return num1 + num2 },
        '-': (num1, num2) => { return num1 - num2 }
    }
]

// display 
const expressionTag = document.querySelector('#expression')
const displayTag = document.querySelector('#display')
function display() {
    if (expression[expression.length - 1] != 'placeholder') {
        expressionTag.textContent = expression.slice(1, expression.length).join('')
        displayTag.textContent = expression[expression.length - 1]
    }
}

// digits
function inputDigits(digitStr, exp) {
    // equal -> replace
    // decimal -> append number
    // zero -> replace
    // number or negative -> append number
    // not number -> push number
    if (exp.includes('=')) {
        exp = ['placeholder', digitStr]
        console.log(exp, 'equal')
    } else if (exp[exp.length - 1].includes('.')) {
        exp[exp.length - 1] += digitStr
        console.log(exp, 'decimal')
    } else if (Number(exp[exp.length - 1]) === 0) {
        exp[exp.length - 1] = digitStr
        console.log(exp, 'zero')
    } else if (Number(exp[exp.length - 1]) || (!Number(exp[exp.length - 2]) && exp[exp.length - 1] === '-')) {
        exp[exp.length - 1] += digitStr
        console.log(exp, 'number or negative')
    } else {
        exp.push(digitStr)
        console.log(exp, 'not number')
    }

    return exp
}

const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {

    digitsTags[i].addEventListener('click', () => {
        expression = inputDigits(digitsTags[i].textContent, expression)
        // display
        display()
    })

    window.addEventListener('keyup', (e) => {
        if (e.key === digitsTags[i].textContent) {
            expression = inputDigits(digitsTags[i].textContent, expression)
            // display
            display()
        }
    })
}

// zero
function inputZero(zeroStr, exp) {
    // equal -> replace
    // decimal -> append zero
    // zero -> do nothing
    // number or negative -> append zero
    // not number -> push zero
    if (exp.includes('=')) {
        exp = ['placeholder', zeroStr]
        console.log(exp, 'equal')
    } else if (exp[exp.length - 1].includes('.')) {
        exp[exp.length - 1] += zeroStr
        console.log(exp, 'decimal')
    } else if (Number(exp[exp.length - 1]) === 0) {
        console.log(exp, 'zero')
        return exp
    } else if (Number(exp[exp.length - 1]) || (!Number(exp[exp.length - 2]) && exp[exp.length - 1] === '-')) {
        exp[exp.length - 1] += zeroStr
        console.log(exp, 'number or negative')
    } else {
        exp.push(zeroStr)
        console.log(exp, 'not number')
    }

    return exp
}

const zeroTag = document.querySelector('#zero')

zeroTag.addEventListener('click', () => {
    expression = inputZero(zeroTag.textContent, expression)
    // display
    display()
})

window.addEventListener('keyup', (e) => {
    if (e.key === zeroTag.textContent) {
        expression = inputZero(zeroTag.textContent, expression)
        // display
        display()
    }
})

// decimal
function inputDecimal(decimalStr, exp) {
    // equal -> replace
    // decimal -> do nothing 
    // zero or number -> append decimal
    // negative -> append zero with decimal
    // not number -> push zero with decimal
    if (exp.includes('=')) {
        exp = ['placeholder', '0' + decimalStr]
        console.log(exp, 'equal')
    } else if (exp[exp.length - 1].includes('.')) {
        console.log(exp, 'decimal')
        return exp
    } else if (Number(exp[exp.length - 1]) === 0 || Number(exp[exp.length - 1])) {
        exp[exp.length - 1] += decimalStr
        console.log(exp, 'zero or number')
    } else if ((!Number(exp[exp.length - 2]) && exp[exp.length - 1] === '-')) {
        exp[exp.length - 1] += `0${decimalStr}`
        console.log(exp, 'negative')
    } else {
        exp.push(`0${decimalStr}`)
        console.log(exp, 'not number')
    }

    return exp
}

const decimalTag = document.querySelector('#decimal')

decimalTag.addEventListener('click', () => {
    expression = inputDecimal(decimalTag.textContent, expression)
    // display
    display()
})

window.addEventListener('keyup', (e) => {
    if (e.key === decimalTag.textContent) {
        expression = inputDecimal(decimalTag.textContent, expression)
        // display
        display()
    }
})

// operators
function inputOperators(operatorStr, exp) {
    // equal -> simplify exp and push operator
    // zero or number -> push operator // new layer
    // negative -> replace
    // placeholder -> do nothing 
    // not number -> replace
    if (exp.includes('=')) {
        exp = ['placeholder', exp[exp.length - 1]]
        exp.push(operatorStr)
        console.log(exp, "equal")
    } else if (Number(exp[exp.length - 1]) === 0 || Number(exp[exp.length - 1])) {
        exp.push(operatorStr)
        console.log(exp, "zero or number")
    } else if (exp[exp.length - 1] === 'placeholder') {
        console.log(exp, 'placeholder')
        return exp
    } else if (!Number(exp[exp.length - 2]) && exp[exp.length - 1] === '-') {
        exp.splice(exp.length - 2, 2, operatorStr)
        console.log(exp, 'negative')
    } else {
        exp[exp.length - 1] = operatorStr
        console.log(exp, 'not number')
    }

    return exp
}
const operatorTags = document.querySelectorAll('.operators')
for (let i = 0; i < operatorTags.length; i++) {
    operatorTags[i].addEventListener('click', () => {
        expression = inputOperators(operatorTags[i].textContent, expression)
        // display
        display()
    })
    window.addEventListener('keyup', (e) => {
        if (e.key === operatorTags[i].textContent) {
            expression = inputOperators(operatorTags[i].textContent, expression)
            // display
            display()
        }
    })
}

function inputSubtract(subtractStr, exp) {
    // equal -> simplify exp and push operator
    // zero or number -> push operator // new layer
    // placeholder or (number, not number) -> push negative
    // negative -> replace
    // not number -> replace
    if (exp.includes('=')) {
        exp = ['placeholder', exp[exp.length - 1]]
        exp.splice(1, exp.length - 2)
        exp.push(subtractStr)
        console.log(exp, "equal")
    } else if (Number(exp[exp.length - 1]) === 0 || Number(exp[exp.length - 1])) {
        exp.push(subtractStr)
        console.log(exp, "zero or number")
    } else if (exp[exp.length - 1] === 'placeholder' || (Number(exp[exp.length - 2]) && !Number(exp[exp.length - 1]))) {
        exp.push(subtractStr)
        console.log(exp, 'placeholder or (number, not number)')
    } else if (!Number(exp[exp.length - 2]) && exp[exp.length - 1] === '-') {
        exp.splice(exp.length - 2, 2, subtractStr)
        console.log(exp, 'negative')
    } else {
        exp[exp.length - 1]
        console.log(exp, 'not number')
    }

    return exp
}
const subtractTag = document.querySelector('#subtract')
subtractTag.addEventListener('click', () => {
    expression = inputSubtract(subtractTag.textContent, expression)
    // display
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === subtractTag.textContent) {
        expression = inputSubtract(subtractTag.textContent, expression)
        // display
        display()
    }
})

// equal
function inputEquals(equalsStr, exp, key) {
    // equal -> simplify exp
    // else -> evaluate 
    if (exp.includes('=')) {
        exp = ['placeholder', exp[exp.length - 1]]
        console.log(exp, 'equal')
    } else {
        let expCp = [...exp]
        for (let i = 0; i < expCp.length; i++) {
            if (Number(expCp[i]) || Number(expCp[i]) === 0) {
                expCp[i] = Number(expCp[i])
            }
        }
        console.log(expCp, 'expCp')

        for (let i = 0; i < key.length; i++) {
            let opKeys = Object.keys(key[i])
            // while an element in expCp is also an operation, evaluate the first operation found
            while (expCp.some((e) => opKeys.includes(e))) {
                for (let k = 0; k < expCp.length; k++) {
                    if (opKeys.includes(expCp[k])) {
                        expCp[k] = key[i][expCp[k]](expCp[k - 1], expCp[k + 1])
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

        exp.push(equalsStr)
        exp.push(expCp[1])
        console.log(exp, 'exp')
    }
    return exp
}
const equalsTag = document.querySelector('#equals')
equalsTag.addEventListener('click', () => {
    expression = inputEquals(equalsTag.textContent, expression, key)
    // display
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === equalsTag.textContent || e.key === 'Enter') {
        expression = inputEquals(equalsTag.textContent, expression, key)
        // display
        display()
    }
})

// clear
function inputClear(exp) {
    exp = ['placeholder']
    return exp
}
const clearTag = document.querySelector('#clear')
clearTag.addEventListener('click', () => {
    expression = inputClear(expression)
    console.log(expression, 'clear')
    // display
    expressionTag.textContent = '0'
    displayTag.textContent = '0'
})
window.addEventListener('keyup', (e) => {
    if (e.key === 'Delete') {
        expression = inputClear(expression)
        console.log(expression, 'clear')
        // display
        expressionTag.textContent = '0'
        displayTag.textContent = '0'
    }
})

