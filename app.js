const kb = document.querySelector('.keyboard')
const key = document.querySelector('.key')
const brdRow = document.querySelectorAll('.board-row')
const sqr = document.querySelectorAll('.sqr')
const board = document.querySelectorAll('.board')

// console.log(brdRow[0].children[0]) 
// console.log(sqr)

let currentGuess = []
const word = ['b', 'u', 'i', 'l', 'd']
let enterbtn = false
let brdRowCounter = 0
let sqrCounter = 0

kb.addEventListener('click', function (event) {
    // console.log(event.target)
    const clickedKey = event.target // This give the whole button tag
    const label = clickedKey.textContent // To store the content

    if (!event.target.classList.contains('key')) { // Allow clicking on key class only 
        return
    }

    if (label === 'ENTER') {
        if (currentGuess.length === 5) {
            enterbtn = true
            console.log('Enter')
            // check the matches
            brdRowCounter++
            console.log(brdRowCounter);

        }
        else {
            console.log('Not enough letters')
        }
    }
    else if (label === 'DELETE') {
        // currentGuess = currentGuess.length - 1 // it stores the length to the currentGuess as a number!
        currentGuess = currentGuess.slice(0, -1) // Delete the last letter on the currentGuess
        console.log('Delete')
        console.log(currentGuess)
        brdRow[brdRowCounter].children[sqrCounter].textContent = ''
    }
    else {
        if (currentGuess.length === 5) {
            // key.classList.add('.disable')
            // return
        }
        else {
            console.log(brdRow[brdRowCounter])
            console.log(sqr[sqrCounter])

            if (brdRow[brdRowCounter].sqr[sqrCounter].textContent === '') {
                currentGuess.push(label)
                console.log(currentGuess)
                brdRow[brdRowCounter].children[sqrCounter].textContent = label
                sqrCounter++
                console.log(brdRow[brdRowCounter]);
                
            }

        }
        // for (i = 0; i < board.length; i++) {
        //     for (j = 0; j < brdRow.length; j++) {
        //         if (currentGuess.length === 5) {
        //             key.classList.add('.disable')
        //             return
        //         }
        //         else {
        //             currentGuess = currentGuess.push(label)
        //             // brdRow[i].children[j].textContent = label
        //         }
        //     }
        // }
    }
})


// we have an array that represents the board
// user clicks button --> textContent is pushed into array
// index value of pushed letter is also the id of the square that needs updated
// update the square textContent with letter from array