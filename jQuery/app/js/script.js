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
    // zero 
    // decimal 
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
    // simplify
    // simplify and replace
    // simplify and push
    // replace
    // replace two
    // nothing
    // append 
    // push
    // evaluate
    // clear
    simplify: (exp) => {
        console.log('simplify')
        return [exp[exp.length - 1]]
    },
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
        expCp[0] = String((Math.round(expCp[0] * 10000)) / 10000)
        exp = exp.concat([str, expCp[0]])
        return exp
    },
    clear: () => {
        console.log('clear')
        return ['0']
    }
}
// display 
const expressionTag = $('#expression')
const displayTag = $('#display')
function display() {
    expressionTag.text(expression.join(''))
    displayTag.text(expression[expression.length - 1])
}
// toggle pressed style
function togglePressed(tag, classsHoverStr, classPressedStr) {
    tag.toggleClass([classsHoverStr, classPressedStr])
    setTimeout(() => { tag.toggleClass([classsHoverStr, classPressedStr]) }, 100)
}

// digits
const digitsTags = $('.digit')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags.eq(i).click(() => {
        togglePressed(digitsTags.eq(i), 'num-hover', 'num-pressed')
        expression = input(functions.replace, functions.simplify_replace, functions.append, functions.replace, functions.append, functions.append, functions.append, functions.push, expression, numbers[i], operators)
        display()
    })
    $(window).keyup((e) => {
        if (e.key === digitsTags.eq(i).text()) {
            togglePressed(digitsTags.eq(i), 'num-hover', 'num-pressed')
            expression = input(functions.replace, functions.simplify_replace, functions.append, functions.replace, functions.append, functions.append, functions.append, functions.push, expression, numbers[i], operators)
            display()
        }
    })
}

// zero
const zeroTag = $('#zero')
zeroTag.click(() => {
    togglePressed(zeroTag, 'num-hover', 'num-pressed')
    expression = input(functions.nothing, functions.simplify_replace, functions.append, functions.nothing, functions.append, functions.append, functions.append, functions.push, expression, numbers[9], operators)
    display()
})
$(window).keyup((e) => {
    if (e.key === zeroTag.text()) {
        togglePressed(zeroTag, 'num-hover', 'num-pressed')
        expression = input(functions.nothing, functions.simplify_replace, functions.append, functions.nothing, functions.append, functions.append, functions.append, functions.push, expression, numbers[9], operators)
        display()
    }
})

// decimal
const decimalTag = $('#decimal')
decimalTag.click(() => {
    togglePressed(decimalTag, 'num-hover', 'num-pressed')
    expression = input(functions.append, functions.simplify_replace, functions.nothing, functions.append, functions.append, functions.append, functions.append, functions.push, expression, numbers[10], operators)
    display()
})
$(window).keyup((e) => {
    if (e.key === decimalTag.text()) {
        togglePressed(decimalTag, 'num-hover', 'num-pressed')
        expression = input(functions.append, functions.simplify_replace, functions.nothing, functions.append, functions.append, functions.append, functions.append, functions.push, expression, numbers[10], operators)
        display()
    }
})

// operators
const nonSubOpTags = $('.non-sub-op')
for (let i = 0; i < nonSubOpTags.length; i++) {
    nonSubOpTags.eq(i).click(() => {
        togglePressed(nonSubOpTags.eq(i), 'operator-hover', 'operator-pressed')
        expression = input(functions.push, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.replace, expression, operatorStrs[i], operators)
        display()
    })
    $(window).keyup((e) => {
        if (e.key === nonSubOpTags.eq(i).text()) {
            togglePressed(nonSubOpTags.eq(i), 'operator-hover', 'operator-pressed')
            expression = input(functions.push, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.replace, expression, operatorStrs[i], operators)
            display()
        }
    })
}

// subtract
const subtractTag = $('#subtract')
subtractTag.click(() => {
    togglePressed(subtractTag, 'operator-hover', 'operator-pressed')
    expression = input(functions.replace, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.push, expression, operatorStrs[3], operators)
    display()
})
$(window).keyup((e) => {
    if (e.key === subtractTag.text()) {
        togglePressed(subtractTag, 'operator-hover', 'operator-pressed')
        expression = input(functions.replace, functions.simplify_push, functions.push, functions.push, functions.push, functions.nothing, functions.replace_two, functions.push, expression, operatorStrs[3], operators)
        display()
    }
})

// equal
const equalsTag = $('#equals')
equalsTag.click(() => {
    togglePressed(equalsTag, 'equals-hover', 'equals-pressed')
    expression = input(functions.evaluate, functions.simplify, functions.evaluate, functions.evaluate, functions.evaluate, functions.nothing, functions.nothing, functions.nothing, expression, operatorStrs[4], operators)
    display()
})
$(window).keyup((e) => {
    if (e.key === equalsTag.text() || e.key === 'Enter') {
        togglePressed(equalsTag, 'equals-hover', 'equals-pressed')
        expression = input(functions.evaluate, functions.simplify, functions.evaluate, functions.evaluate, functions.evaluate, functions.nothing, functions.nothing, functions.nothing, expression, operatorStrs[4], operators)
        display()
    }
})

// clear
const clearTag = $('#clear')
clearTag.click(() => {
    togglePressed(clearTag, 'clear-hover', 'clear-pressed')
    expression = functions.clear()
    display()
})
$(window).keyup((e) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
        togglePressed(clearTag, 'clear-hover', 'clear-pressed')
        expression = functions.clear()
        display()
    }
})


