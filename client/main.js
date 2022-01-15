let textBubble = document.createElement('div');
textBubble.setAttribute('class', 'bubble');
document.body.appendChild(textBubble);
let mouseX;
let mouseY;
let text = document.createTextNode('');

document.addEventListener('mousedown', (e) => {
  textBubble.style.visibility = 'hidden';
  mouseX = e.clientX;
  mouseY = e.clientY;
  while (textBubble.firstChild){
  textBubble.removeChild(textBubble.firstChild)
  console.log('Removed child')
  };
  console.log(mouseX);
  console.log(mouseY);
  console.log(document.documentElement.scrollTop);
})

document.addEventListener('mouseup', () => { 
    const selString = document.getSelection().toString();
    if (selString.length > 0){

      let parseError = null;
      let firstWord;
      try {
        firstWord = parseWords(selString)[0];
      } catch (e) {
        console.log(e); //TODO - error hanlding
      }

      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + firstWord)
        .then(response => response.json())
        .then(parsedResponse => getDictionaryEntry(parsedResponse[0]))
        .then(dictionaryEntry => showTextBubble(dictionaryEntry))
        .catch(e => console.log(e));

    }
});

function showTextBubble(dictionaryEntry) {
  textBubble.style.top = mouseY + document.documentElement.scrollTop + 'px';
  textBubble.style.left = mouseX + 'px';
  textBubble.style.visibility = 'visible'
  console.log(dictionaryEntry);
  text = document.createTextNode(dictionaryEntry.toString(dictionaryEntry));
  textBubble.appendChild(text);
  textBubble.style.fontSize = "16px"
}

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

DictionaryEntry.prototype.toString = (dictionaryEntry) => {
  let string = dictionaryEntry.word + '\n\n';
  
  console.log(dictionaryEntry["wordMeanings"]);
  const firstMeaning = dictionaryEntry.wordMeanings[0];
  const firstDef = firstMeaning[0];
  string += `Part of speech: ${firstMeaning.partOfSpeech}\n\n`;
  
  firstMeaning.definitions.forEach(definition => {
    string += `Definition: ${definition.definition}\nExample: ${definition.example}`;
  });
  return string;
};

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
