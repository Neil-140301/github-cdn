alert('This is neil Alvares');

let myDiv = document.createElement('div');
myDiv.classList.add('mydiv');

let btn = document.createElement('button');
btn.classList.add('mybtn');
btn.textContent = 'this is a button';
btn.addEventListener('click', () => {
  myDiv.classList.toggle('d-none');
  console.log('myDiv clicked');
})

document.body.appendChild(btn);