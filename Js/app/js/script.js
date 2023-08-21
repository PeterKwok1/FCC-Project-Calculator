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
// generalize case function 
// add rounding to 4 decimal places
// style - blink?
// remove console logs
// git default upstream 

// keys
let expression = ['0']
// keys > textcontent gives html flexibility 
let numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.']
let operatorStrs = ['*', '/', '+', '-', '=']
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
// buttons must pass similar tests using similar functions so this condenses repeptitive code
function input(onlyZero, equal, decimal, zero, number, negative1, negative2, operator, exp, str, ops) {
    // only zero
    // equal
    // decimal 
    // zero
    // number 
    // negative case 1 
    // negative case 2 
    // operator 
    if (exp.length === 1 && exp[0] === '0') {
        console.log('only zero')
        exp = onlyZero(exp, str, ops)
        console.log(exp)
    } else if (exp.includes('=')) {
        console.log("equal")
        exp = equal(exp, str, ops)
        console.log(exp)
    } else if (exp[exp.length - 1].includes('.')) {
        console.log('decimal')
        exp = decimal(exp, str, ops)
        console.log(exp)
    } else if (exp[exp.length - 1] === '0') {
        console.log("zero")
        exp = zero(exp, str, ops)
        console.log(exp)
    } else if (/\d/.test(exp[exp.length - 1])) {
        console.log("number")
        exp = number(exp, str, ops)
        console.log(exp)
    } else if (exp.length === 1 && exp[0] === '-') {
        console.log('negative1')
        exp = negative1(exp, str, ops)
        console.log(exp)
    } else if ((/^\D+$/.test(exp[exp.length - 2]) && exp[exp.length - 1] === '-')) {
        console.log('negative2')
        exp = negative2(exp, str, ops)
        console.log(exp)
    } else {
        console.log('operator')
        exp = operator(exp, str, ops)
        console.log(exp)
    }
    return exp
}
let functions = {
    // simplify and replace
    // simplify and push
    // replace
    // replace two
    // nothing
    // append 
    // push
    // evaluate
    // clear
    simplify_replace: (exp, str) => {
        console.log('simplify and replace')
        return [str]
    },
    simplify_push: (exp, str) => {
        console.log('simplify and push')
        return [exp[exp.length - 1], str]
    },
    replace: (exp, str) => {
        console.log('replace')
        exp[exp.length - 1] = str
        return exp
    },
    replace_two: (exp, str) => {
        console.log('replace two')
        exp.splice(exp.length - 2, 2, str)
        return exp
    },
    nothing: (exp) => {
        console.log('nothing')
        return exp
    },
    append: (exp, str) => {
        console.log('append')
        exp[exp.length - 1] += str
        return exp
    },
    push: (exp, str) => {
        console.log('push')
        exp.push(str)
        return exp
    },
    evaluate: (exp, str, ops) => {
        console.log('evaluate')
        let expCp = [...exp]
        for (let i = 0; i < expCp.length; i++) {
            if (/\d/.test(expCp[i])) {
                expCp[i] = Number(expCp[i])
            }
        }
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
        exp = exp.concat([str, expCp[0]])
        return exp
    },
    clear: () => {
        console.log('clear')
        return ['0']
    }
}
// display 
const expressionTag = document.querySelector('#expression')
const displayTag = document.querySelector('#display')
function display() {
    expressionTag.textContent = expression.join('')
    displayTag.textContent = expression[expression.length - 1]
}

// digits
const digitsTags = document.querySelectorAll('.digits')
// only zero -> replace
// equal -> simplify and replace
// decimal - append
// zero - replace
// number - append
// negative case 1 - append
// negative case 2 - append
// operator - push
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        expression = input(functions.replace, functions.simplify_replace, functions.append, functions.replace, functions.append, functions.append, functions.append, functions.push, expression, numbers[i], operators)
        display()
    })
    window.addEventListener('keyup', (e) => {
        if (e.key === digitsTags[i].textContent) {
            expression = input(functions.replace, functions.simplify_replace, functions.append, functions.replace, functions.append, functions.append, functions.append, functions.push, expression, numbers[i], operators)
            display()
        }
    })
}

// zero
const zeroTag = document.querySelector('#zero')
// only zero -> nothing
// equal -> simplify and replace 
// decimal -> append
// zero -> nothing
// number -> append
// negative case 1 -> append
// negative case 2 -> append
// operator -> push
zeroTag.addEventListener('click', () => {
    expression = input(functions.nothing, functions.simplify_replace, functions.append, functions.nothing, functions.append, functions.append, functions.append, functions.push, expression, numbers[9], operators)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === zeroTag.textContent) {
        expression = input(functions.nothing, functions.simplify_replace, functions.append, functions.nothing, functions.append, functions.append, functions.append, functions.push, expression, numbers[9], operators)
        display()
    }
})

// decimal
const decimalTag = document.querySelector('#decimal')
// only zero -> append
// equal -> simplify and replace
// decimal -> nothing
// zero -> append
// number -> append
// negative case 1 -> append
// negative case 2 -> append
// operator -> push
decimalTag.addEventListener('click', () => {
    expression = input(functions.append, functions.simplify_replace, functions.nothing, functions.append, functions.append, functions.append, functions.append, functions.push, expression, numbers[10], operators)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === decimalTag.textContent) {
        expression = input(functions.append, functions.simplify_replace, functions.nothing, functions.append, functions.append, functions.append, functions.append, functions.push, expression, numbers[10], operators)
        display()
    }
})

// operators
const operatorTags = document.querySelectorAll('.operators')
// only zero -> push
// equal -> simplify and push
// decimal -> push
// zero -> push
// number -> push
// negative case 1 -> nothing
// negative case 2 -> replace two
// operator -> replace
for (let i = 0; i < operatorTags.length; i++) {
    operatorTags[i].addEventListener('click', () => {
        expression = input(functions.push, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.replace, expression, operatorStrs[i], operators)
        display()
    })
    window.addEventListener('keyup', (e) => {
        if (e.key === operatorTags[i].textContent) {
            expression = input(functions.push, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.replace, expression, operatorStrs[i], operators)
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

    // only zero -> replace
    // equal -> simplify and push
    // decimal -> push
    // zero -> push
    // number -> push
    // negative case 1 -> nothing
    // negative case 2 -> replace two
    // operator -> push
    if (exp.length === 1 && exp[0] === '0') {
        exp[exp.length - 1] = '-'
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
// only zero -> replace
// equal -> simplify and push
// decimal -> push
// zero -> push
// number -> push
// negative case 1 -> nothing
// negative case 2 -> replace two
// operator -> push
subtractTag.addEventListener('click', () => {
    expression = input(functions.replace, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.push, expression, operatorStrs[3], operators)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === subtractTag.textContent) {
        expression = input(functions.replace, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.push, expression, operatorStrs[3], operators)
        display()
    }
})

// equal
function inputEquals(equalsStr, exp, ops) {
    // equal -> simplify 
    // ... -> evaluate
    // negative case 1 -> do nothing
    // negative case 2 -> do nothing 
    // operator -> do nothing

    // only zero -> 
    // equal
    // zero
    // decimal 
    // number 
    // negative case 1 
    // negative case 2 
    // operator 
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
        exp = exp.concat([equalsStr, expCp[0]])
        console.log(exp, 'exp')
    }
    return exp
}
const equalsTag = document.querySelector('#equals')
equalsTag.addEventListener('click', () => {
    expression = inputEquals(operatorStrs[4], expression, operators)
    display()
})
window.addEventListener('keyup', (e) => {
    if (e.key === equalsTag.textContent || e.key === 'Enter') {
        expression = inputEquals(operatorStrs[4], expression, operators)
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
    if (e.key === 'Delete' || e.key === 'Backspace') {
        expression = inputClear(expression)
        console.log(expression, 'clear')
        display()
    }
})


