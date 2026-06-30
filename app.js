const kb = document.querySelector('.keyboard')
const key = document.querySelectorAll('.key')
const brdRow = document.querySelectorAll('.board-row')
const sqr = document.querySelectorAll('.sqr')
const board = document.querySelectorAll('.board')
const message = document.querySelector('.message')

// console.log(brdRow[0].children[0]) 
// console.log(sqr)

let currentGuess = []
const word = ['R', 'E', 'A', 'D', 'Y']
let brdRowCounter = 0
let sqrCounter = 0
let allCorrect
let keyClicked = []


kb.addEventListener('click', function (event) {
    // console.log(event.target)
    const clickedKey = event.target // This give the whole button tag
    const label = clickedKey.textContent // To store the content
    keyClicked.push(clickedKey)
    console.log(keyClicked)

    if (!event.target.classList.contains('key')) { // Allow clicking on key class only 
        return
    }

    else if (label === 'ENTER') {
        enterClicked()
    }

    else if (label === 'DELETE') {
        deleteClicked()
    }

    else {
        if (currentGuess.length < 5) {
            console.log(brdRow[brdRowCounter].children[sqrCounter])

            if (brdRow[brdRowCounter].children[sqrCounter].textContent === '') {
                currentGuess.push(label)
                console.log(currentGuess)
                brdRow[brdRowCounter].children[sqrCounter].textContent = label
                sqrCounter++
            }
        }
    }
})

function enterClicked() {
    if (currentGuess.length === 5) {
        console.log('Enter')
        console.log(keyClicked)
        for (let i = 0; i < 5; i++) {
            allCorrect = true
            const square = brdRow[brdRowCounter].children[i]
            if (JSON.stringify(currentGuess) === JSON.stringify(word)) {
                square.style.backgroundColor = 'green'
            }
            else if (currentGuess[i] === word[i]) {
                square.style.backgroundColor = 'green'
                // keyClicked.style.backgroundColor = 'green'
                allCorrect = false
            }
            else if (word.includes(currentGuess[i])) {
                square.style.backgroundColor = '#b59f3b'
                allCorrect = false
            }
            else {
                square.style.backgroundColor = 'grey'
                allCorrect = false
            }
            square.style.color = 'white'
        }
        if (allCorrect) {
            kb.style.pointerEvents = 'none'
            message.textContent = 'CORRECT 🎉'
        }
        else if (allCorrect === false && brdRow[5].children[4].textContent !== '') {
            kb.style.pointerEvents = 'none'
            message.textContent = `NOO, YOU LOSS 👎🏼 \n IT WAS ${word.join('')}`
        }

        // if (word[0] === currentGuess[0]) {
        //     console.log('matched!')
        //     sqr[0].style.backgroundColor = 'green'
        // }

        brdRowCounter++
        sqrCounter = 0
        currentGuess = []
    }

    else {
        console.log('Not enough letters')
    }
}

function deleteClicked() {
    currentGuess = currentGuess.slice(0, -1) // Delete the last letter on the currentGuess
    console.log('Delete')
    console.log(currentGuess)
    // delete from the array
    sqrCounter--
    brdRow[brdRowCounter].children[sqrCounter].textContent = ''
}
