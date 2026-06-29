const kb = document.querySelector('.keyboard')
const key = document.querySelector('.key')

let currentGuess = []
const word = ['b','u','i','l','d']
// console.log(word.length)

kb.addEventListener('click', function (event) {
    // console.log(event.target)
    const clickedKey = event.target // This give the whole button tag
    const label = clickedKey.textContent // To store the content

    if (!event.target.classList.contains('key')) { // Allow clicking on key class only 
        return
    }

    if (label === 'ENTER') {
        if (currentGuess.length === 5) {
            // check the matches
            console.log('Enter')
        }
        else {
            return 'Not enough letters'
        }
    }
    else if (label === 'DELETE') {
        // currentGuess = currentGuess.length - 1 // it stores the length to the currentGuess as a number
        currentGuess.slice(currentGuess.length, 1)
        console.log('Delete')
        console.log(currentGuess)
    }
    else {
        if (currentGuess.length === 5) {
            key.classList.add('.disable')
        }
        else {
            currentGuess += label
            console.log(currentGuess)
        }
    }
})