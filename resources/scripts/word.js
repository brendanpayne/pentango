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
    const url = `https://api.datamuse.com/words?rel_jja=${word}`;
    const response = fetch(url);

    // get the score of the word from the response
    return response.then(response => response.json()).then(data => {
        if (data.length > 0) {
            score =(data[data.length].score)
            return score;
        }
        return 0;
    });
}

// store the word in the word bank
function storeWord(word, score) {
    if (isValidWord(word)) {
        wordbank.push({
            word: word,
            score: score
        });
        document.getElementById('word').textContent = wordbank.map(word => word.word).join(' ');
    }
};