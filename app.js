const kb = document.querySelector('.keyboard')
const brdRow = document.querySelectorAll('.board-row')
const sqr = document.querySelectorAll('.sqr')
const board = document.querySelectorAll('.board')

// console.log(brdRow[0].children[0]) 
// console.log(sqr)

let currentGuess = []
const word = ['B', 'U', 'I', 'L', 'D']
let brdRowCounter = 0
let sqrCounter = 0

kb.addEventListener('click', function (event) {
    // console.log(event.target)
    const clickedKey = event.target // This give the whole button tag
    const label = clickedKey.textContent // To store the content

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
        // check the matches
        for (i = 0; i < 5; i++) {
            for (j = 0; j < word.length; j++) {
                if (currentGuess[i].textContent === word[j].textContent) {
                    brdRow[brdRowCounter].sqr[i].style.backgroundcolor = green
                    console.log('hello')
                }
            }
        }

        // word.forEach(function (correctLetter, id) {
        //     currentGuess.forEach(function (letter, index) {
        //         if (letter[index] === correctLetter[id]) {
        //             console.log('hi')
        //             sqr[index].style.backgroundColor = 'yellow'
        //         }
        //     })
        // })

        // let i = 0
        // let j = 0

        // if (brdRow[brdRowCounter].sqr[i] === word[j]) {
        //     console.log('hi')
        //     sqr[index].style.backgroundColor = 'green'
        //     i++
        //     j++
        // }


        brdRowCounter++
        sqrCounter = 0
        currentGuess = []
        console.log(brdRowCounter);

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
