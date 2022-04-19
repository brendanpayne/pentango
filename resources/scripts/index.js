let letters = getRandomLetters(5);

let selection = [];

let guesses = document.getElementById(`guesses`);

createPentagon(`polygon_0`, 50, 135, 140, 36, `pink`, letters[0]);

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
    var word = selection.join('');
    // check to see if the selection is valid
    if (word.length > 0) {
        isValidWord(word).then(function(result) {
            if (result) {
                //console.log(`${word} is a valid word`);
                guesses.textContent = ``;
                selection = [];
                storeWord(word);
            } else {
                //console.log(`${word} is not a valid word`);
                animateCSS(guesses, `shakeX`).then((result) => {
                    guesses.textContent = ``;
                    selection = [];                    
                });
            }
        });
    };
});

var reset = document.getElementById(`reset`);
let icon = document.createElement(`i`);
icon.classList.add('fa', 'fa-refresh');
reset.appendChild(icon);
reset.addEventListener(`click`, function() {
    letters = shuffleLetters(letters)
    for (var i = 0; i < document.getElementsByTagName(`g`).length; i++) {
        let polygon = document.getElementById(`polygon_${i}`);
        let letter = letters[i];
        animateCSS(polygon.lastChild, 'fadeOut').then((result) => {
            //polygon.lastChild.style.display = `none`;
            polygon.lastChild.textContent = `${letter}`;
            animateCSS(polygon.lastChild, 'fadeIn');
        });
    }
});

var remove = document.getElementById(`delete`);
remove.addEventListener(`click`, function() {
    // remove the last letter from the selection
    selection.pop();
    //console.log(`current guess: ${selection.join('')}`);
    guesses.textContent = `${selection.join(' ')}`;
});