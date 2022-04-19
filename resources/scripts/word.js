let wordbank = [];

// get random letters from the alphabet
function getRandomLetters(numberOfLetters) {
    let letters = [];
    // get a random vowel
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const vowel = vowels[Math.floor(Math.random() * vowels.length)];
    letters.push(vowel);
    // get a random letter without a vowel or duplicates
    for (let i = 0; i < numberOfLetters; i++) {
        let letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        if (letters.includes(letter)) {
            i--;
        } else {
            letters.push(letter);
        }
    }
    return letters;
}

function shuffleLetters(letters) {
    // shuffles the letters except for the first one
    let shuffled = [letters[0]];
    letters.splice(0, 1);
    console.log(letters);
    while (letters.length > 0) {
        let index = Math.floor(Math.random() * letters.length);
        shuffled.push(letters[index]);
        letters.splice(index, 1);
    }
    console.log(shuffled);
    return shuffled;
}

// check to see if word is valid
function isValidWord(word) {
    const url = `https://wagon-dictionary.herokuapp.com/${word}`;
    const response = fetch(url);

    const wb = [];
    wordbank.forEach(w => wb.push(w.word));

    return response.then(function(response) {
        return response.json().then(function(json) {
            if (!json.found) {
                popUp(`${word} is not a valid word.`);
                return false;
            } else if (wb.includes(word)) {
                popUp(`${word} has already been used.`);
                return false;
            } else if (word.length <= 2) {
                popUp(`Word is too short.`);
                return false;
            }
            return true;
        });
    });
};

// calculate the score for a word
function calculateScore(word) {
    let score = 0;
    word.split(``).forEach(function(letter) {
        score += letter.charCodeAt(0) - 64; // A = 1, B = 2, etc.
    });
    return score;
}

// store the word in the word bank and update the word bank display
function storeWord(word) {
    wordbank.push({
        word: word,
        score: calculateScore(word)
    });
    updateWordBank();
};

function updateWordBank() {
    let wb = document.getElementById(`word`);
    wb.textContent = ``;
    
    // sort the word bank by score
    wordbank.sort(function(a, b) {
        return b.score - a.score;
    });

    // display the word bank
    wordbank.forEach(function(word) {
        wb.innerText += `${word.word} - ${word.score}\n`;
    });

    // update the total score
    let total = document.getElementById(`total`);
    total.textContent = wordbank.reduce(function(total, word) {
        return total + word.score;
    }, 0);

}