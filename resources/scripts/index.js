const letters = getRandomLetters(5);

let selection = [];

let guesses = document.getElementById(`guesses`);

createPentagon(`polygon_0`, 50, 135, 140, 36, `white`, letters[0]);

for (var i = 0; i < 5;i++) {
    var curStep = i * (2 * Math.PI / 5) + ((Math.PI / 180.0) * -18);
    createPentagon(`polygon_${i+1}`, 50, 135+ (90 * Math.cos(curStep)), 140 + (90 * Math.sin(curStep)), 0, `red`, `${letters[i+1]}`);
}

for (var i=0; i < document.getElementsByTagName(`g`).length; i++) {
    let polygon = document.getElementById(`polygon_${i}`);
    polygon.addEventListener(`mousedown`, function() {
    });
    polygon.addEventListener('click', function(e) {
        e.preventDefault();
        // push the letter to the selection array
        selection.push(polygon.lastChild.textContent);
        console.log(`you clicked ${polygon.lastChild.textContent}`);
        console.log(`current guess: ${selection.join('')}`);
        guesses.textContent = `${selection.join(' ')}`;
    })
}

function popUp(message) {
    let popup = document.getElementById(`popup`);
    popup.textContent = message;
    popup.style.display = `inline-block`;
    setTimeout(function() {
        popup.style.display = `none`;
    }, 2000);
}

var submit = document.getElementById(`submit`);
submit.addEventListener(`click`, function() {
    // check to see if the selection is valid
    isValidWord(selection.join('')).then(function(result) {
        if (result) {
            console.log(`${selection.join('')} is a valid word`);
            guesses.textContent = ``;
            selection = [];
            storeWord(selection.join(''), calculateScore(selection.join('')));
        } else {
            console.log(`${selection.join('')} is not a valid word`);
            popUp(`${selection.join('')} is not a valid word`);
            guesses.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(function() {
                guesses.classList.remove('animate__animated', 'animate__shakeX');
            }, 500);
        }
    });
});

var remove = document.getElementById(`delete`);
remove.addEventListener(`click`, function() {
    // remove the last letter from the selection
    selection.pop();
    console.log(`current guess: ${selection.join('')}`);
    guesses.textContent = `${selection.join(' ')}`;
});