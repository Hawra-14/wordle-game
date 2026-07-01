const kb = document.querySelector('.keyboard')
const key = document.querySelectorAll('.key') // gives me a NodeList not an array
const actionKey = document.querySelectorAll('.action')
const brdRow = document.querySelectorAll('.board-row')
const sqr = document.querySelectorAll('.sqr')
const board = document.querySelectorAll('.board')
const message = document.querySelector('.message')
const restart = document.querySelector('#restart')
const help = document.querySelector('#help')
const info = document.querySelector('.info')
const closeBtn = document.querySelector('.close-btn')
const body = document.querySelector('body')


let currentGuess = []
// const word = ['R', 'E', 'A', 'D', 'Y']
const word = validWords[Math.floor(Math.random() * validWords.length)].split('')
console.log(word)
let brdRowCounter = 0
let sqrCounter = 0
let allCorrect


kb.addEventListener('click', function (event) {
    const clickedKey = event.target // This give the whole button element
    const label = clickedKey.textContent // To store the content

    if (!event.target.classList.contains('key')) { // Allow clicking on key classes only 
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
                console.log(currentGuess, "current")
                brdRow[brdRowCounter].children[sqrCounter].textContent = label
                sqrCounter++
            }
        }
    }
})

help.addEventListener('click', function (event) {
    info.classList.remove('hidden')
    // body.style.backgroundColor = 'black'
    // key.style.backgroundColor = 'black'
})

closeBtn.addEventListener('click', function (event) {
    info.classList.add('hidden')
})

restart.addEventListener('click', function () {
    for (let j = 0; j < sqr.length; j++) {
        sqr[j].textContent = ''
        sqr[j].style.backgroundColor = ''
        sqr[j].style.color = 'black'
    }

    currentGuess = []
    brdRowCounter = 0
    sqrCounter = 0
    message.textContent = ''
    kb.style.pointerEvents = 'all'


    for (let i = 0; i < key.length; i++) {

        key[i].style.backgroundColor = ''
        key[i].style.color = 'black'
        actionKey[0].style.color = 'white'
        actionKey[1].style.color = 'white'
    }
})

function enterClicked() {
    if (currentGuess.length === 5) {
        allCorrect = true

        if (!validWords.includes(currentGuess.join(''))) {
            // message.classList.remove('hidden')
            message.textContent = 'Word not found'
            kb.style.pointerEvents = 'auto' // make sure keyboard stays usable
            return // stop here, don't color squares or move to next row
        }
        message.textContent = ''

        for (let i = 0; i < 5; i++) {
            const square = brdRow[brdRowCounter].children[i]
            const keyEl = [...key].find(function (k) { // key is the querySelectorAll('.key') result
                // [...key] convert the NodeList into a real array so I could use .find()
                // .find() handles the looping and stops when it hits the first match then return it
                // console.log(k.textContent)
                return k.textContent === currentGuess[i];
            })
            if (currentGuess[i] === word[i]) {
                square.style.backgroundColor = 'green'
                if (keyEl) {
                    keyEl.style.backgroundColor = 'green'
                }
            }
            else if (word.includes(currentGuess[i])) {
                square.style.backgroundColor = '#b59f3b'
                if (keyEl && keyEl.style.backgroundColor !== 'green') {
                    keyEl.style.backgroundColor = '#b59f3b'
                }
                allCorrect = false
            }
            else {
                square.style.backgroundColor = 'grey'
                if (keyEl) {
                    keyEl.style.backgroundColor = 'grey'
                }
                allCorrect = false
            }
            square.style.color = 'white'
            keyEl.style.color = 'white'

        }
        if (allCorrect) {
            kb.style.pointerEvents = 'none'
            message.textContent = 'CORRECT 🎉'
        }
        else if (allCorrect === false && brdRow[5].children[4].textContent !== '') {
            kb.style.pointerEvents = 'none'
            message.textContent = `NOO, YOU LOSS 👎🏼 \n IT WAS ${word.join('')}`
        }

        brdRowCounter++
        sqrCounter = 0
        currentGuess = []

    }

    else {
        message.textContent = 'Not enough letters'
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
