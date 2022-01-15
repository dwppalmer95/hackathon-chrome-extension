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
      fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + selString)
        .then(response => response.json())
        .then(data => console.log(data))
      
      textBubble.style.top = mouseY + document.documentElement.scrollTop + 'px';
      textBubble.style.left = mouseX + 'px';
      textBubble.style.visibility = 'visible'
      text = document.createTextNode('DEFINITION TEXT STRING HERE')
      textBubble.appendChild(text);
      textBubble.style.fontSize = "16px"

    }
});