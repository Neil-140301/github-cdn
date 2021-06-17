function css(element, styleObj) {
  for (const property in styleObj) element.style[property] = styleObj[property];
}

//console.log(meta.page);
let result = 0;
const getPointsData = async () => {
  const res = await fetch('https://0a0b1219bae1.ngrok.io/points/5313776713881');
  const data = await res.json();
  console.log(data);
  result = data[0];
};

//fontawesome script
let script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/ccca1edeec.js';
script.crossOrigin = 'anonymous';
document.body.appendChild(script);


const { customerId } = meta.page;
//let customerId = 5313776713881;



const myFunc = async () => {
  await getPointsData();
  

  let myDiv = document.createElement('div');
  let myDiv3 = document.createElement('div');

  let renderPage = customerId ? myDiv3 : myDiv;
  console.log(renderPage);

  //page 1
  const divClass = {
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    height: '550px',
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    display: 'none'
  };
  css(myDiv, divClass);

  //cardtop
  let div1 = document.createElement('div');
  let div1Class1 = {
    backgroundColor: '#6568FE',
    height: '150px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: '20px 20px 0px 20px',
    color: '#fff',
    fontFamily: 'Roboto',
  };

  let span = document.createElement('span');
  span.textContent = 'Welcome to';
  div1.appendChild(span);

  let p = document.createElement('p');
  p.textContent = 'Super Rewards';
  let pClass = {
    fontSize: '24px',
    fontWeight: '600',
    margin: ' 15px 0px',
  };
  css(p, pClass);
  div1.appendChild(p);

  css(div1, div1Class1);
  myDiv.appendChild(div1);

  //card
  let div2 = document.createElement('div');
  const div2Class = {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    borderRadius: '5px',
    height: '150px',
    position: 'relative',
    top: '-25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  };

  p = document.createElement('p');
  p.textContent = 'Become a member';
  pClass = {
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'Roboto',
  };
  css(p, pClass);
  div2.appendChild(p);

  span = document.createElement('span');
  const spanClass = {
    fontSize: '13px',
    fontFamily: 'Roboto',
    color: '#777474',
    textAlign: 'center',
    marginBottom: '10px',
  };
  css(span, spanClass);
  span.textContent =
    'With more ways to unlock exciting perks, this is your all access pass to exclusive rewards.';
  div2.appendChild(span);

  let button = document.createElement('button');
  const btnClass = {
    border: 'none',
    borderRadius: '8px',
    padding: '16px 24px',
    backgroundColor: '#6568fe',
    color: '#fff',
    fontSize: '12px',
    margin: '10px 0px',
  };
  css(button, btnClass);
  div2.appendChild(button);

  let a = document.createElement('a');
  a.textContent = 'Join Now';
  a.href = 'https://web-neil.myshopify.com/account/register';
  const aClass = {
    textDecoration: 'none',
    color: 'inherit',
  };
  css(a, aClass);
  button.appendChild(a);

  css(div2, div2Class);
  myDiv.appendChild(div2);

  //cardpoints
  let div3 = document.createElement('div');
  const div3Class = {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    borderRadius: '5px',
    height: '150px',
    position: 'relative',
    top: '-10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  };

  p = document.createElement('p');
  p.textContent = 'Points';
  pClass = {
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: 'Roboto',
  };
  css(p, pClass);
  div3.appendChild(p);

  span = document.createElement('span');
  const spanClass2 = {
    fontSize: '13px',
    fontFamily: 'Roboto',
    color: '#777474',
    textAlign: 'center',
    marginBottom: '10px',
  };
  css(span, spanClass2);
  span.textContent =
    ' Earn more Points for different actions, and turn those Points into awesome rewards!';
  div3.appendChild(span);

  css(div3, div3Class);

  let div4 = document.createElement('div');
  div4.addEventListener('click', () => {
    renderPage.style.display = 'none';
    myDiv2.style.display = 'block';
  });
  const class1 = {
    margin: '10px 0px',
    display: 'flex',
    alignItems: 'center',
    width: '75%',
    cursor: 'pointer',
  };
  css(div4, class1);
  div3.appendChild(div4);

  let icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-hand-holding-heart');
  const class2 = {
    fontSize: '20px',
    color: '#6568fe',
  };
  css(icon, class2);
  div4.appendChild(icon);

  let div5 = document.createElement('div');
  div5.style.cssText +=
    'display: flex;justify-content: space-between;align-items: center;margin-left: 15px;width: 100%;';
  div4.appendChild(div5);

  span = document.createElement('span');
  const class3 = {
    fontFamily: 'Roboto',
    color: '#777474',
    fontSize: '14px',
  };
  css(span, class3);
  span.textContent = 'Ways to earn';
  div5.appendChild(span);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-angle-right');
  const class4 = {
    color: '#777474',
    fontSize: '16px',
  };
  css(icon, class4);
  div5.appendChild(icon);

  myDiv.appendChild(div3);

  let btn = document.createElement('button');
  css(btn, {
    backgroundColor: '#6568FE',
    position: 'fixed',
    bottom: '10px',
    right: '20px',
    borderRadius: '50%',
    padding: '24px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  });

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-angle-up');
  btn.appendChild(icon);

  btn.addEventListener('click', () => {
    if (renderPage.style.display === 'none') {
      renderPage.style.display = 'block';
    } else {
      renderPage.style.display = 'none';
    }
    console.log('myDiv clicked');
  });

  document.body.appendChild(myDiv);
  document.body.appendChild(btn);

  // page 2

  let myDiv2 = document.createElement('div');
  const divClass2 = {
    backgroundColor: '#fff',
    position: 'fixed',
    bottom: '100px',
    right: '20px',
    height: '550px',
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    display: 'none',
  };
  css(myDiv2, divClass2);
  document.body.appendChild(myDiv2);

  //top
  div1 = document.createElement('div');
  div1Class = {
    backgroundColor: ' #6568FE',
    height: '40px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: ' 20px 20px 0px 20px',
    color: '#fff',
    fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', () => {
    myDiv2.style.display = 'none';
    renderPage.style.display = 'block';
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText +=
    "font-family: 'Roboto';font-size: 14px; margin-left: 10px;";
  span.textContent = 'Super Rewards';
  div1.appendChild(span);

  css(div1, div1Class);
  myDiv2.appendChild(div1);

  //center
  let center = document.createElement('div');
  center.style.cssText +=
    "margin-top: 20px;padding: 10px;font-family: 'Roboto';  font-weight: 500;";

  span = document.createElement('span');
  span.textContent = 'Ways to earn';
  center.appendChild(span);

  let div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 75%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = '#6568fe';
  icon.classList.add('fas', 'fa-store');
  div.appendChild(icon);

  let newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: center;
  width: 100%;`;
  div.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = 'Signup';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = '200 points';
  newDiv.appendChild(span);

  let hr = document.createElement('hr');
  hr.style.cssText += `background-color: #e5e5e5;
  width: 100%;
  height: 1px;
  border: none;`;
  newDiv.appendChild(hr);

  myDiv2.appendChild(center);

  //btncontainer
  let btnC = document.createElement('div');
  btnC.style.cssText += 'text-align: center;';
  myDiv2.appendChild(btnC);

  button = document.createElement('button');
  const btnClass2 = {
    border: 'none',
    borderRadius: '8px',
    padding: '18px 34px',
    backgroundColor: '#6568fe',
    color: '#fff',
    fontSize: '12px',
    margin: '10px 0px',
  };
  css(button, btnClass2);
  customerId?null : btnC.appendChild(button);

  a = document.createElement('a');
  a.textContent = 'Join Now';
  a.href = 'https://web-neil.myshopify.com/account/register';
  const aClass2 = {
    textDecoration: 'none',
    color: 'inherit',
  };
  css(a, aClass2);
  button.appendChild(a);

  // page 3

  
  css(myDiv3, divClass);

  //cardtop
  div1 = document.createElement('div');

  span = document.createElement('span');
  span.textContent = 'Welcome to';
  div1.appendChild(span);

  p = document.createElement('p');
  p.style.cssText += `font-size: 24px;
  font-weight: 600;
  margin: 15px 0px;`;
  p.textContent = 'Super Rewards';

  div1.appendChild(p);

  css(div1, div1Class1);
  myDiv3.appendChild(div1);

  //card
  div2 = document.createElement('div');
  const div2Class2 = {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    borderRadius: '12px',
    position: 'relative',
    top: '-25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    height: '50px',
    cursor: 'pointer',
  };

  let text = document.createElement('div');
  text.style.cssText += `display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  width: 90%;`;
  div2.appendChild(text);

  span = document.createElement('span');
  span.textContent = 'Your Rewards';
  text.appendChild(span);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-angle-right');

  css(icon, class4);
  text.appendChild(icon);

  css(div2, div2Class2);
  myDiv3.appendChild(div2);

  //cardpoints
  div3 = document.createElement('div');
  const div3Class2 = {
    backgroundColor: '#fff',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    borderRadius: '12px',
    position: 'relative',
    top: '-10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  };

  let pd = document.createElement('div');
  pd.style.cssText += `display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  color: #777474;
  font-size: 16px;
  margin: 15px 0px;`;
  div3.appendChild(pd);

  span = document.createElement('span');
  span.textContent = `${result.points} points`;
  console.log(result);
  pd.appendChild(span);

  icon = document.createElement('i');
  icon.classList.add('fas', 'fa-sync-alt');
  pd.appendChild(icon);

  css(div3, div3Class2);

  div4 = document.createElement('div');
  div4.addEventListener('click', () => {
    renderPage.style.display = 'none';
    myDiv2.style.display = 'block';
  });

  css(div4, class1);
  div3.appendChild(div4);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-hand-holding-heart');

  css(icon, class2);
  div4.appendChild(icon);

  div5 = document.createElement('div');
  div5.style.cssText +=
    'display: flex;justify-content: space-between;align-items: center;margin-left: 15px;width: 100%;';
  div4.appendChild(div5);

  span = document.createElement('span');

  css(span, class3);
  span.textContent = 'Ways to earn';
  div5.appendChild(span);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-angle-right');

  css(icon, class4);
  div5.appendChild(icon);

  myDiv3.appendChild(div3);

  document.body.appendChild(myDiv3);
};

myFunc();
