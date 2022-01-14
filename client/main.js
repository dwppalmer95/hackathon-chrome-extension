// const contents = document.getElementById('contents');
// contents.parentNode.removeChild(contents);
// console.log('hackathon test one')


document.addEventListener('selectionchange', () => { // event listener to check for highlighted text
    const selString = document.getSelection().toString();
    if (selString.length > 0){
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + selString)
        .then(response => response.json())
        .then(data => console.log(data));
    }
});

// Jonathan
// display the legible string in an html element

// David
// retrieve legible string from API data
// set manifest.json to work on any URL
// data validate the selection string as one word