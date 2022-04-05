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
    const url = `https://api.datamuse.com/words?rel_jja=${word}`;
    const response = fetch(url);

    return response.then(response => response.json()).then(data => {
        if (data.length > 0) {
            return true;
        }
        return false;
    });
}