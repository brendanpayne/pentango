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

// check to see if word is valid
function isValidWord(word) {
    const url = `https://api.datamuse.com/words?rel_jja=${word}`; // get words that are often described by the word to determine if it is a valid word
    const response = fetch(url);

    return response.then(response => response.json()).then(data => {
        if (data.length > 0) {
            return true;
        }
        return false;
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