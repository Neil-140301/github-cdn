let myDiv = document.getElementById('myDiv');

let btn = document.createElement('button');
btn.classList.add('mybtn');
btn.addEventListener('click', () => {
  myDiv.classList.toggle('d-none');
  console.log('myDiv clicked');
})

document.getElementById('root').appendChild(btn);