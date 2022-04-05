const letters = getRandomLetters(5);

let selection = [];

createPentagon(`polygon_0`, 50, 135, 140, 36, `white`, letters[0]);

for (var i = 0; i < 5;i++) {
    var curStep = i * (2 * Math.PI / 5) + ((Math.PI / 180.0) * -18);
    createPentagon(`polygon_${i+1}`, 50, 135+ (90 * Math.cos(curStep)), 140 + (90 * Math.sin(curStep)), 0, `white`, `${letters[i+1]}`);
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
        document.getElementById(`guesses`).textContent = `${selection.join(' ')}`;
    })
}
