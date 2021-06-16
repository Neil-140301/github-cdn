let myDiv = document.getElementById('root');

let btn = document.createElement('button');
btn.classList.add('mybtn');
btn.addEventListener('click', () => {
  myDiv.classList.toggle('d-none');
})

document.body.appendChild(btn);