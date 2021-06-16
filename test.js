let myDiv = document.getElementById('myDiv');

let btn = document.createElement('button');
btn.classList.add('mybtn');
btn.addEventListener('click', () => {
  myDiv.classList.toggle('d-none');
})

document.getElementById('root').appendChild(btn);