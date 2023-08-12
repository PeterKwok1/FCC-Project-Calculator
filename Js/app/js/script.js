// logic:
// user input 
// parse input 
// evaluate using operator functions in order of operations

// example 3 + 5 * 6 - 2 / 4 = 32.5

// parseFloat expression?
// add keyboard event listener

let expression = []
const expressionTag = document.querySelector('#expression')
const entryTag = document.querySelector('#entry')

// user input, parse input
const digitsTags = document.querySelectorAll('.digits')

for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
        // if the most recent entry is not a number push a number, else add a number
        if (!parseInt(expression[expression.length - 1])) {
            expression.push(digitsTags[i].textContent)
            console.log(expression, 'not number')
        } else {
            expression[expression.length - 1] += digitsTags[i].textContent
            console.log(expression, 'number')
        }
        // display expression and entry
        expressionTag.textContent = expression.join('')
        entryTag.textContent = expression[expression.length - 1]
    })
}

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

const equalsTag = document.querySelector('#equals')

equalsTag.addEventListener('click', () => {
    while (expression.includes('*')) {
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === '*') {
                expression[i] = multiply(expression[i - 1], expression[i + 1])
                expression.splice(i - 1, 1)
                expression.splice(i, 1)
                break
            }
        }
        console.log(expression)
    }
})

