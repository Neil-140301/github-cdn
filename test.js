alert('This is neil Alvares');

let myDiv = document.createElement('div');
myDiv.style.backgroundColor = 'purple';
myDiv.style.position = 'fixed';
myDiv.style.right = '20px';
myDiv.style.bottom = '100px';
myDiv.style.width = '300px';
myDiv.style.height = '250px';
myDiv.style.borderRadius = '5px';

let btn = document.createElement('button');
btn.style.backgroundColor = 'purple';
btn.style.position = 'fixed';
btn.style.right = '20px';
btn.style.bottom = '10px';
btn.style.padding = '30px';
btn.style.borderRadius = '50%';

btn.textContent = 'this is a button';
btn.addEventListener('click', () => {
  if (myDiv.style.display === 'none') {
    myDiv.style.display = 'block';
  } else {
    myDiv.style.display = 'none';
  }
  console.log('myDiv clicked');
});

document.body.appendChild(btn);
