document.addEventListener('selectionchange', () => { // event listener to check for highlighted text
  
  const selString = document.getSelection().toString();
  if (selString.length > 0){

    let parseError = null;
    let firstWord;
    try {
      firstWord = parseWords(selString)[0];
    } catch (e) {
      console.log(e); //TODO - error hanlding
    }

    console.log(firstWord);
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + firstWord)
      .then(response => response.json())
      .then(parsedResponse => getDictionaryEntry(parsedResponse[0]))
      .then(dictionaryEntry => console.log(dictionaryEntry))
      .catch(e => console.log(e));
  }

});

function getDictionaryEntry(definitionResponse) { //TODO - move to DictionaryEntry.Create()
      
  const word = definitionResponse.word;
  const meaningsResponse = definitionResponse.meanings;

  const wordMeanings = [];

  meaningsResponse.forEach(meaningResponse => {

    const partOfSpeech = meaningResponse.partOfSpeech;
    const definitions = [];
    meaningResponse.definitions.forEach(definitionResponse => {
      const definition = definitionResponse.definition;
      const example = definitionResponse.example;
      definitions.push(new Definition(definition, example));
    });

    wordMeanings.push(new WordMeaning(partOfSpeech, definitions));

  });

  return new DictionaryEntry(word, wordMeanings);

}

function parseWords(searchString) {

  const accentedCharacters = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";
  const pattern = `([-'A-Za-z${accentedCharacters}]+)\\s*`;
  const regex = new RegExp(pattern, 'g');
  const matches = [...searchString.matchAll(regex)];

  if (matches.length === 0) throw 'Please select a word';

  const parsedWords = [];
  matches.forEach(el => parsedWords.push(el[1]));

  return parsedWords;

}

class DictionaryEntry {
  constructor(word, wordMeanings) {
    this.word = word;
    this.wordMeanings = wordMeanings;
  }
}

class WordMeaning {
  constructor(partOfSpeech, definitions) {
    this.partOfSpeech = partOfSpeech;
    this.definitions = definitions;
  }
}

class Definition {
  constructor(definition, example) {
    this.definition = definition;
    this.example = example
  }
}

// Jonathan
// display the legible string in an html element

// David
// retrieve legible string from API data
// data validate the selection string as one word
// implement try-catch to pass the error to the user
// limit the runs per second

// use regex to create an array of all highlighted words