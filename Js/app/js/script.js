// logic:
// user input 
// parse input 
// set expression using operator functions in order of operations

// example 3 + 5 * 6 - 2 / 4 = 32.5

// add keyboard event listener

let expression = []
const expressionTag = document.querySelector('#expression')
const entryTag = document.querySelector('#entry')

// parse input
const digitsTags = document.querySelectorAll('.digits')
for (let i = 0; i < digitsTags.length; i++) {
    digitsTags[i].addEventListener('click', () => {
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
        console.log(expression)
        // display expression and entry
        expressionTag.textContent = expression.join('')
        entryTag.textContent = expression[expression.length - 1]
    })
}

const equalsTag = document.querySelector('#equals')

