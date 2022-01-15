// const contents = document.getElementById('contents');
// contents.parentNode.removeChild(contents);
// console.log('hackathon test one')

// Create and append bubble to be shown 
let textBubble = document.createElement('div');
textBubble.setAttribute('class', 'bubble');
document.body.appendChild(textBubble);
let mouseX;
let mouseY;
let text = document.createTextNode('');
// event listener to hide our bubble and also grab current mouse position
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

document.addEventListener('mouseup', () => { // event listener to check for highlighted text
    const selString = document.getSelection().toString();
    if (selString.length > 0){
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + selString)
        .then(response => response.json())
        .then(data => console.log(data))
      // move textbubble to selection location and assign text value
      textBubble.style.top = mouseY + document.documentElement.scrollTop + 'px';
      textBubble.style.left = mouseX + 'px';
      textBubble.style.visibility = 'visible'
      text = document.createTextNode('DEFINITION TEXT STRING HERE')
      textBubble.appendChild(text);
      textBubble.style.fontSize = "16px"

    }
});

// Jonathan
// display the legible string in an html element


// click down -> drag -> click up -> display
//    event      selectionchange     event 


// David
// retrieve legible string from API data
// set manifest.json to work on any URL
// data validate the selection string as one word