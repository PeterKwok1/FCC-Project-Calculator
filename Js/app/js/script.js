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
// redo 
// use regex to check for negatives instead of Number
// add a new script file and generalize case function 
// add rounding to 4 decimal places
// style - blink?
// remove console logs
// git default upstream 

// keys
let expression = ['0']
// html flexibility 
let numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3']
let operatorStrs = ['*', '/', '+']
// array defines the operations and their order 
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
// condenses repeptitive code
function input(exp, str, onlyZero, equal, zero, decimal, number, negative1, negative2, operator) {
    // only zero
    // equal
    // zero
    // decimal 
    // number 
    // negative case 1 
    // negative case 2 
    // operator 
    if (exp.length === 1 && exp[0] === '0') {
        exp = onlyZero(exp, str)
        console.log(exp, 'only zero')
    } else if (exp.includes('=')) {
        exp = equal(exp, str)
        console.log(exp, "equal")
    } else if (exp[exp.length - 1] === '0') {
        exp = zero(exp, str)
        console.log(exp, "zero")
    } else if (exp[exp.length - 1].includes('.')) {
        exp = decimal(exp, str)
        console.log(exp, 'decimal')
    } else if (Number(exp[exp.length - 1])) {
        exp = number(exp, str)
        console.log(exp, "number")
    } else if (exp.length === 1 && exp[0] === '-') {
        exp = negative1(exp, str)
        console.log(exp, 'negative1')
    } else if ((/^\D+$/.test(exp[exp.length - 2]) && exp[exp.length - 1] === '-')) {
        exp = negative2(exp, str)
        console.log(exp, 'negative2')
    } else {
        exp = operator(exp, str)
        console.log(exp, 'operator')
    }
    return exp
}
let functions = {
    // simplify and replace
    // simplify and push
    // replace
    // replace two
    // do nothing
    // append 
    // push
    // evaluate
    simplify_replace: ,
    simplify_push: (exp, str) => [exp[exp.length - 1], str],
    replace: (exp, str) => {
        exp[exp.length - 1] === str
        return exp
    },
    replace_two: ,
    nothing: (exp) => exp,
    append: ,
    push: (exp, str) => {
        exp.push(str)
        return exp
    },
    evaluate:
}

// display 
const expressionTag = document.querySelector('#expression')
const displayTag = document.querySelector('#display')
function display() {
    expressionTag.textContent = expression.join('')
    displayTag.textContent = expression[expression.length - 1]
}

// digits
function inputDigits(digitStr, exp) {
    // equal -> simplify and replace
    // zero -> replace
    // decimal -> append number
    // number -> append number
    // negative -> append number
    // operator -> push number
    if (exp.includes('=')) {
        exp = [digitStr]
        console.log(exp, 'equal')
    } else if (exp[exp.length - 1] === '0') {
        exp[exp.length - 1] = digitStr
        console.log(exp, 'zero')
    } else if (exp[exp.length - 1].includes('.')) {
        exp[exp.length - 1] += digitStr
        console.log(exp, 'decimal')
    } else if (Number(exp[exp.length - 1])) {
        exp[exp.length - 1] += digitStr
        console.log(exp, 'number')
    } else if ((exp.length === 1 && exp[0] === '-') || (/^\D+$/.test(exp[exp.length - 2]) && exp[exp.length - 1] === '-')) {
        // (!Number(exp[exp.length - 2]) || Number(exp[exp - 2] === 0))
        exp[exp.length - 1] += digitStr
        console.log(exp, 'negative')
    } else {
        exp.push(digitStr)
        console.log(exp, 'operator')
    }
    return exp
}

const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        expression = inputDigits(numbers[i], expression)
        display()
    })
    window.addEventListener('keyup', (e) => {
        if (e.key === digitsTags[i].textContent) {
            expression = inputDigits(numbers[i], expression)
            display()
        }
    })
}

// zero
function inputZero(zeroStr, exp) {
    // equal -> simplify and replace
    // zero -> do nothing
    // decimal -> append zero
    // number -> append zero
    // negative -> append zero
    // operator -> push zero
    if (exp.includes('=')) {
        exp = [zeroStr]
        console.log(exp, 'equal')
    } else if (exp[exp.length - 1] === '0') {
        console.log(exp, 'zero')
        return exp
    } else if (exp[exp.length - 1].includes('.')) {
        exp[exp.length - 1] += zeroStr
        console.log(exp, 'decimal')
    } else if (Number(exp[exp.length - 1])) {
        exp[exp.length - 1] += zeroStr
        console.log(exp, 'number')
    } else if ((exp.length === 1 && exp[0] === '-') || ((!Number(exp[exp.length - 2]) || Number(exp[exp - 2] === 0)) && exp[exp.length - 1] === '-')) {
        exp[exp.length - 1] += zeroStr
        console.log(exp, 'negative')
    } else {
        exp.push(zeroStr)
        console.log(exp, 'operator')
    }
    return exp
}

const zeroTag = document.querySelector('#zero')
zeroTag.addEventListener('click', () => {
    expression = inputZero('0', expression)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === zeroTag.textContent) {
        expression = inputZero('0', expression)
        display()
    }
})

// decimal
function inputDecimal(decimalStr, exp) {
    // equal -> simplify and replace
    // zero -> append decimal
    // decimal -> do nothing
    // number -> append decimal
    // negative -> append decimal 
    // operator -> push decimal 
    if (exp.includes('=')) {
        exp = [decimalStr]
        console.log(exp, 'equal')
    } else if (exp[exp.length - 1] === '0') {
        exp[exp.length - 1] += decimalStr
        console.log(exp, 'zero')
    } else if (exp[exp.length - 1].includes('.')) {
        console.log(exp, 'decimal')
        return exp
    } else if (Number(exp[exp.length - 1])) {
        exp[exp.length - 1] += decimalStr
        console.log(exp, 'number')
    } else if ((exp.length === 1 && exp[0] === '-') || ((!Number(exp[exp.length - 2]) || Number(exp[exp - 2] === 0)) && exp[exp.length - 1] === '-')) {
        exp[exp.length - 1] += decimalStr
        console.log(exp, 'negative')
    } else {
        exp.push(decimalStr)
        console.log(exp, 'operator')
    }

    return exp
}

const decimalTag = document.querySelector('#decimal')
decimalTag.addEventListener('click', () => {
    expression = inputDecimal('.', expression)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === decimalTag.textContent) {
        expression = inputDecimal('.', expression)
        display()
    }
})

// operators
function inputOperators(operatorStr, exp) {
    // equal -> simplify and push operator 
    // zero -> push operator
    // decimal -> push operator
    // number -> push operator
    // negative case 1 -> do nothing
    // negative case 2 -> replace two
    // operator -> replace 
    if (exp.includes('=')) {
        exp = [exp[exp.length - 1], operatorStr]
        console.log(exp, "equal")
    } else if (exp[exp.length - 1] === '0') {
        exp.push(operatorStr)
        console.log(exp, "zero")
    } else if (exp[exp.length - 1].includes('.')) {
        exp.push(operatorStr)
        console.log(exp, "zero")
    } else if (Number(exp[exp.length - 1])) {
        exp.push(operatorStr)
        console.log(exp, "number")
    } else if (exp.length === 1 && exp[0] === '-') {
        console.log(exp, 'negative case 1')
        return exp
    } else if ((!Number(exp[exp.length - 2]) || Number(exp[exp - 2] === 0)) && exp[exp.length - 1] === '-') {
        exp.splice(expression.length - 2, 2, operatorStr)
        console.log(exp, 'negative case 2')
    } else {
        exp[exp.length - 1] = operatorStr
        console.log(exp, 'operator')
    }
    return exp
}
const operatorTags = document.querySelectorAll('.operators')
for (let i = 0; i < operatorTags.length; i++) {
    operatorTags[i].addEventListener('click', () => {
        expression = inputOperators(operatorStrs[i], expression)
        display()
    })
    window.addEventListener('keyup', (e) => {
        if (e.key === operatorTags[i].textContent) {
            expression = inputOperators(operatorStrs[i], expression)
            display()
        }
    })
}

function inputSubtract(subtractStr, exp) {
    // only zero -> replace 
    // equal -> simplify and push operator
    // zero -> push operator
    // decimal -> push operator
    // number -> push operator
    // negative case 1 -> do nothing
    // negative case 2 -> replace two
    // operator -> push 
    if (exp.length === 1 && exp[0] === '0') {
        exp[exp.length - 1] === '-'
        console.log(exp, 'empty')
    } else if (exp.includes('=')) {
        exp = [exp[exp.length - 1], subtractStr]
        console.log(exp, "equal")
    } else if (exp[exp.length - 1] === '0') {
        exp.push(subtractStr)
        console.log(exp, "zero")
    } else if (exp[exp.length - 1].includes('.')) {
        exp.push(subtractStr)
        console.log(exp, 'decimal')
    } else if (Number(exp[exp.length - 1])) {
        exp.push(subtractStr)
        console.log(exp, "number")
    } else if (exp.length === 1 && exp[0] === '-') {
        console.log(exp, 'negative case 1')
        return exp
    } else if ((!Number(exp[exp.length - 2]) || Number(exp[exp - 2] === 0)) && exp[exp.length - 1] === '-') {
        exp.splice(expression.length - 2, 2, subtractStr)
        console.log(exp, 'negative case 2')
    } else {
        exp.push(subtractStr)
        console.log(exp, 'operator')
    }
    return exp
}
const subtractTag = document.querySelector('#subtract')
subtractTag.addEventListener('click', () => {
    expression = inputSubtract('-', expression)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === subtractTag.textContent) {
        expression = inputSubtract('-', expression)
        display()
    }
})

// equal
function inputEquals(equalsStr, exp, ops) {
    // equal -> simplify 
    // negative case 1 -> do nothing
    // else -> evaluate 
    if (exp.includes('=')) {
        exp = [exp[exp.length - 1]]
        console.log(exp, 'equal')
    } else if (exp.length === 1 && exp[0] === '-') {
        console.log(exp, 'negative case 1')
        return exp
    } else {
        let expCp = [...exp]
        for (let i = 0; i < expCp.length; i++) {
            if (Number(expCp[i]) || Number(expCp[i]) === 0) {
                expCp[i] = Number(expCp[i])
            }
        }
        console.log(expCp, 'expCp')
        for (let i = 0; i < ops.length; i++) {
            let opKeys = Object.keys(ops[i])
            // while an element in expCp is also an operation, evaluate the first operation found
            while (expCp.some((e) => opKeys.includes(e))) {
                for (let k = 0; k < expCp.length; k++) {
                    if (opKeys.includes(expCp[k])) {
                        expCp[k] = ops[i][expCp[k]](expCp[k - 1], expCp[k + 1])
                        expCp.splice(k - 1, 1)
                        expCp.splice(k, 1)
                        break
                    }
                }
                console.log(expCp, 'expCp')
            }
        }
        expCp[0] = String(expCp[0])
        console.log(expCp, 'expCp')
        exp.push(equalsStr)
        exp.push(expCp[0])
        console.log(exp, 'exp')
    }
    return exp
}
const equalsTag = document.querySelector('#equals')
equalsTag.addEventListener('click', () => {
    expression = inputEquals(equalsTag.textContent, expression, operators)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === equalsTag.textContent || e.key === 'Enter') {
        expression = inputEquals('=', expression, operators)
        display()
    }
})

// clear
function inputClear(exp) {
    exp = ['0']
    return exp
}
const clearTag = document.querySelector('#clear')
clearTag.addEventListener('click', () => {
    expression = inputClear(expression)
    console.log(expression, 'clear')
    expressionTag.textContent = '0'
    displayTag.textContent = '0'
})
window.addEventListener('keyup', (e) => {
    if (e.key === 'Delete') {
        expression = inputClear(expression)
        console.log(expression, 'clear')
        display()
    }
})


