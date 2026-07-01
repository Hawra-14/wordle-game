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

let currentGuess = []
// const word = ['G', 'R', 'E', 'E', 'N']
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
    } else if (label === 'ENTER') {
        enterClicked()
    } else if (label === 'DELETE') {
        deleteClicked()
    } else {
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
})

closeBtn.addEventListener('click', function (event) {
    info.classList.add('hidden')
})

restart.addEventListener('click', function () {
    for (let j = 0; j < sqr.length; j++) {
        sqr[j].textContent = ''
        sqr[j].style.backgroundColor = ''
        sqr[j].style.color = '#1c3f4c'
        sqr[j].classList.remove('flip')
    }

    currentGuess = []
    brdRowCounter = 0
    sqrCounter = 0
    message.textContent = ''
    kb.style.pointerEvents = 'all'


    for (let i = 0; i < key.length; i++) {

        key[i].style.backgroundColor = ''
        key[i].style.color = '#1c3f4c'
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
            kb.style.pointerEvents = 'auto' // makes sure keyboard stays usable

            const currentRow = brdRow[brdRowCounter]
            currentRow.classList.add('shake')
            currentRow.addEventListener('animationend', function () {
                currentRow.classList.remove('shake')
            })

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

            // determine color before the timeout
            let color
            if (currentGuess[i] === word[i]) {
                color = 'rgba(0, 120, 52, 0.88)'
            } else if (word.includes(currentGuess[i])) {
                color = 'rgba(181, 159, 59, 0.88)'
                allCorrect = false
            } else {
                color = 'rgba(128, 128, 128, 0.88)'
                allCorrect = false
            }

            setTimeout(function () {
                square.classList.add('flip')
                // halfway through the flip (at 350ms = half of 700ms) --> apply the color
                setTimeout(function () {
                    square.style.backgroundColor = color
                    square.style.color = 'white'
                    if (keyEl) {
                        keyEl.style.color = 'white'
                        keyEl.style.border = color
                        if (color === 'rgba(0, 120, 52, 0.88)') {
                            keyEl.style.backgroundColor = 'rgba(0, 120, 52, 0.88)'
                        } else if (color === 'rgba(181, 159, 59, 0.88)' && keyEl.style.backgroundColor !== 'rgba(0, 120, 52, 0.88)') {
                            keyEl.style.backgroundColor = 'rgba(181, 159, 59, 0.88)'
                        } else if (keyEl.style.backgroundColor !== 'rgba(0, 120, 52, 0.88)' && keyEl.style.backgroundColor !== 'rgba(181, 159, 59, 0.88)') {
                            keyEl.style.backgroundColor = 'rgba(128, 128, 128, 0.88)'
                        }
                    }
                }, 250)
            }, i * 400)
        }

        // wait for all flips before showing win/loss
        setTimeout(function () {
            if (allCorrect) {
                kb.style.pointerEvents = 'none'
                message.textContent = 'CORRECT 🎉'
            } else if (allCorrect === false && brdRow[5].children[4].textContent !== '') {
                kb.style.pointerEvents = 'none'
                message.textContent = `NOO, YOU LOSS 👎🏼 \n IT WAS ${word.join('')}`
            }
        }, 5 * 400)

        brdRowCounter++
        sqrCounter = 0
        currentGuess = []

    } else {
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
