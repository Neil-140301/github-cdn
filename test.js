function css(element, styleObj) {
  for (let property in styleObj) element.style[property] = styleObj[property];
}

let appUrl = 'https://4e9fd920656a.ngrok.io';
let userId = meta.page.customerId;
let referrer = Shopify.queryParams? Shopify.queryParams.ref : new URLSearchParams(location.search).get('ref');
let shopDomain = Shopify.shop;
// let userId = 5339239350443;
// let referrer; //= 'SUPER202114';
// let shopDomain = 'super-rewards-test.myshopify.com '; //'web-neil.myshopify.com';

let result = 0;
let merchant = '';
let codes = '';
let discountCode;
let showMessage = false;

const getPointsData = async () => {
  if (userId) {
    const res = await fetch(
      `${appUrl}/points/${userId}?shopDomain=${shopDomain}`
    );
    const data = await res.json();
    console.log(data);
    result = data.customer;
    merchant = data.merchant;
  } else {
    const res = await fetch(
      `${appUrl}/merchant-info/?shopDomain=${shopDomain}`
    );
    const data = await res.json();
    console.log(data);
    merchant = data;
  }
};

const getDiscountCodes = async () => {
  if (userId) {
    const res = await fetch(
      `${appUrl}/rewards/${userId}?shopDomain=${shopDomain}`
    );
    const data = await res.json();
    console.log(data);
    codes = data;
  }
};

const updateUserBirthday = async (day, month) => {
  if (userId) {
    //console.log(month);
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ day, month, shopDomain }),
    };
    console.log(options.body);
    const res = await fetch(`${appUrl}/birthday/${userId}`, options);
    showMessage = true;
    console.log(res);
  }
};

const sendReferrerCode = async () => {
  const res = await fetch(
    `${appUrl}/set-referrer?ref=${referrer}&shopDomain=${shopDomain}`
  );
  const data = await res.json();
  console.log(data);
};

const getDiscountCode = async () => {
  const res = await fetch(
    `${appUrl}/discount/${userId}?shopDomain=${shopDomain}`
  );
  const data = await res.json();
  discountCode = data;
  console.log(data);
  localStorage.setItem('discount', data);
};

const getFreeShippingCode = async () => {
  const res = await fetch(
    `${appUrl}/shipping/${userId}?shopDomain=${shopDomain}`
  );
  const data = await res.json();
  discountCode = data;
  console.log(data);
  localStorage.setItem('discount', data);
};

const getPercentageCode = async () => {
  const res = await fetch(
    `${appUrl}/percentage-discount/${userId}?shopDomain=${shopDomain}`
  );
  const data = await res.json();
  discountCode = data;
  console.log(data);
  localStorage.setItem('discount', data);
};

//fontawesome script
let script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/ccca1edeec.js';
script.crossOrigin = 'anonymous';
document.body.appendChild(script);

//tailwind cdn
// let tailwind = document.createElement('link');
// tailwind.href = 'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css';
// tailwind.rel = 'stylesheet';
// document.head.appendChild(tailwind);

const myFunc = async () => {
  await getPointsData();
  await getDiscountCodes();
  await sendReferrerCode();

  let myDiv = document.createElement('div');
  let myDiv3 = document.createElement('div');
  let myDiv4 = document.createElement('div');
  let myDiv5 = document.createElement('div');
  let myDiv6 = document.createElement('div');
  let myDiv7 = document.createElement('div');

  let renderPage = userId ? myDiv3 : myDiv;
  console.log(renderPage);

  //page 1
  const divClass = {
    backgroundColor: '#fff',
    position: 'fixed',
    boxSizing: 'border-box',
    bottom: parseInt(merchant.theme.positionBottom) + 85 + 'px',
    [merchant.theme.placement]: `${merchant.theme.positionSide}px`,
    minHeight: '550px',
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    display: 'none',
    zIndex: '999',
    fontFamily: 'roboto',
  };
  css(myDiv, divClass);

  //cardtop
  let div1 = document.createElement('div');
  let div1Class1 = {
    backgroundColor: merchant.theme.color,
    height: '150px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: '20px 20px 0px 20px',
    color: merchant.theme.font,
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
    margin: '8px 0px', //' 15px 0px',
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
    // height: '150px',
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
  // pClass = {
  //   fontSize: '15px',
  //   fontWeight: '600',
  //   fontFamily: 'Roboto',
  // };
  // css(p, pClass);
  p.style.cssText += `
  font-size: 15px;
    font-weight: 600;
    font-family: Roboto;
    margin: 8px;
    margin-top: 0px;
  `;
  div2.appendChild(p);

  span = document.createElement('span');
  const spanClass = {
    fontSize: '11px',
    fontFamily: 'Roboto',
    color: '#777474',
    textAlign: 'center',
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
    backgroundColor: merchant.theme.color,
    color: merchant.theme.font,
    fontSize: '12px',
    margin: '8px 0px',
    fontFamily: 'Roboto',
  };
  css(button, btnClass);
  div2.appendChild(button);

  let a = document.createElement('a');
  a.textContent = 'Join Now';
  a.href =
    `https://${shopDomain}/account/register` +
    (referrer ? `?ref=${referrer}` : '');
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
    // height: '150px',
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
  // pClass = {
  //   fontSize: '15px',
  //   fontWeight: '600',
  //   fontFamily: 'Roboto',

  // };
  // css(p, pClass);
  p.style.cssText += `font-size: 15px;
    font-weight: 600;
    font-family: Roboto;
    margin: 8px;
    margin-top: 0;`;
  div3.appendChild(p);

  span = document.createElement('span');
  const spanClass2 = {
    fontSize: '13px',
    fontFamily: 'Roboto',
    color: '#777474',
    textAlign: 'center',
    marginBottom: '10px',
  };
  // css(span, spanClass2);
  span.style.cssText += `font-size: 11px;
    font-family: Roboto;
    color: rgb(119, 116, 116);
    text-align: center;
    margin-bottom: 8px;`;
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
  // css(div4, class1);
  div4.style.cssText += `margin: 5px 0px;
    display: flex;
    align-items: center;
    width: 75%;
    cursor: pointer;`;
  div3.appendChild(div4);

  let icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-hand-holding-heart');
  const class2 = {
    fontSize: '20px',
    color: merchant.theme.color,
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

  div4 = document.createElement('div');
  div4.addEventListener('click', () => {
    renderPage.style.display = 'none';
    myDiv5.style.display = 'block';
  });

  // css(div4, class1);
  div4.style.cssText += `margin: 5px 0px;
    display: flex;
    align-items: center;
    width: 75%;
    cursor: pointer;`;
  div3.appendChild(div4);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-gift');

  css(icon, class2);
  div4.appendChild(icon);

  div5 = document.createElement('div');
  div5.style.cssText +=
    'display: flex;justify-content: space-between;align-items: center;margin-left: 15px;width: 100%;';
  div4.appendChild(div5);

  span = document.createElement('span');

  css(span, class3);
  span.textContent = 'Ways to redeem';
  div5.appendChild(span);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-angle-right');

  css(icon, class4);
  div5.appendChild(icon);

  merchant.isPointsActive && myDiv.appendChild(div3);

  //referral box
  let refBox = document.createElement('div');
  refBox.style.cssText += `box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 8px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center; 
  `;
  let para = document.createElement('p');
  para.textContent = 'Referrals';
  para.style.cssText += `
  font-size: 15px;
  font-weight: 600;
  font-family: roboto;
  margin: 0px;
  `;
  refBox.appendChild(para);

  let refDescp = document.createElement('span');
  refDescp.textContent =
    'Give your friends a reward and claim your own when they make a purchase.';
  refDescp.style.cssText += `
  font-size: 11px;
  font-family: roboto;
  color: #777474;
  margin: 5px 0px;
  margin-bottom:0px;
  `;
  refBox.appendChild(refDescp);

  merchant.isReferralsActive && myDiv.appendChild(refBox);

  let btn = document.createElement('button');
  css(btn, {
    backgroundColor: merchant.theme.color,
    position: 'fixed',
    bottom: `${merchant.theme.positionBottom}px`,
    [merchant.theme.placement]: `${merchant.theme.positionSide}px`,
    borderRadius: '50%',
    padding: '22px',
    border: 'none',
    color: merchant.theme.font,
    cursor: 'pointer',
    zIndex: '999',
  });

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-gift');
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
  (merchant.isPointsActive || merchant.isReferralsActive) &&
    document.body.appendChild(btn);

  // page 2

  let myDiv2 = document.createElement('div');
  const divClass2 = {
    backgroundColor: '#fff',
    position: 'fixed',
    boxSizing: 'border-box',
    bottom: parseInt(merchant.theme.positionBottom) + 85 + 'px',
    [merchant.theme.placement]: `${merchant.theme.positionSide}px`,
    height: '550px',
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    display: 'none',
    zIndex: '999',
  };
  css(myDiv2, divClass2);
  document.body.appendChild(myDiv2);

  //top
  div1 = document.createElement('div');
  div1Class = {
    backgroundColor: merchant.theme.color,
    height: '55px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: ' 20px 20px 0px 20px',
    color: merchant.theme.font,
    fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', () => {
    myDiv2.style.display = 'none';
    renderPage.style.display = 'block';
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon, (style = merchant.theme.font);
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
    "margin-top: 28px;padding: 10px;font-family: 'Roboto';  font-weight: 500;";

  span = document.createElement('span');
  span.textContent = 'Ways to earn';
  center.appendChild(span);

  let div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-store');
  div.appendChild(icon);

  let newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: center;
  border-bottom: 1px solid #e5e5e5;
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
  span.textContent = merchant.signupPoints + ' points';
  newDiv.appendChild(span);

  // let hr = document.createElement('hr');
  // hr.style.cssText += `background-color: #e5e5e5;
  // width: 100%;
  // height: 1px;
  // border: none;`;
  // newDiv.appendChild(hr);

  div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-birthday-cake');
  div.appendChild(icon);

  let textGrp3 = document.createElement('div');
  textGrp3.style.cssText += `display: flex;
  margin-left: 15px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;`;
  div.appendChild(textGrp3);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 0px;
  justify-content: center;
  width: 100%;`;
  textGrp3.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = 'Celebrate a birthday';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = merchant.birthdayPoints + ' points';
  newDiv.appendChild(span);

  let dateBtn = document.createElement('button');
  dateBtn.textContent = 'Edit date';
  dateBtn.addEventListener('click', () => {
    myDiv2.style.display = 'none';
    myDiv4.style.display = 'block';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color:${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;`;
  userId ? textGrp3.appendChild(dateBtn) : null;

  div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-shopping-bag');
  div.appendChild(icon);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  justify-content: center;
  border-bottom: 1px solid #e5e5e5;
  width: 100%;`;
  div.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = 'Place an order';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  const value2 = merchant.currency.symbol.replace(/{{amount}}/g, '1');
  span.textContent = merchant.orderPoints + ` points for every ${value2} spent`;
  newDiv.appendChild(span);

  // hr = document.createElement('hr');
  // hr.style.cssText += `background-color: #e5e5e5;
  // width: 100%;
  // height: 1px;
  // border: none;`;
  // newDiv.appendChild(hr);

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
    backgroundColor: merchant.theme.color,
    color: merchant.theme.font,
    fontSize: '12px',
    margin: '10px 0px',
    fontFamily: 'Roboto'
  };
  css(button, btnClass2);
  userId ? null : btnC.appendChild(button);

  a = document.createElement('a');
  a.textContent = 'Join Now';
  a.href =
    `https://${shopDomain}/account/register` +
    (referrer ? `?ref=${referrer}` : '');
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
  margin: 10px 0px;
  `;
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
  text.addEventListener('click', async () => {
    renderPage.style.display = 'none'; //
    myDiv7.style.display = 'block';
  });
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

  div4 = document.createElement('div');
  div4.addEventListener('click', () => {
    renderPage.style.display = 'none';
    myDiv5.style.display = 'block';
  });

  css(div4, class1);
  div3.appendChild(div4);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-gift');

  css(icon, class2);
  div4.appendChild(icon);

  div5 = document.createElement('div');
  div5.style.cssText +=
    'display: flex;justify-content: space-between;align-items: center;margin-left: 15px;width: 100%;';
  div4.appendChild(div5);

  span = document.createElement('span');

  css(span, class3);
  span.textContent = 'Ways to redeem';
  div5.appendChild(span);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-angle-right');

  css(icon, class4);
  div5.appendChild(icon);

  merchant.isPointsActive && myDiv3.appendChild(div3);

  let refContainer = document.createElement('div');
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);`;
  merchant.isReferralsActive && myDiv3.appendChild(refContainer);

  span = document.createElement('span');
  span.textContent = 'Refer your friends';
  span.style.cssText += `font-family: 'Roboto';
  font-size: 14px;
  font-weight: 300;
}`;
  refContainer.appendChild(span);

  let refDesc = document.createElement('p');
  const couponValue = merchant.currency.symbol.replace(
    /{{amount}}/g,
    merchant.friendAmt
  );
  refDesc.textContent = `Share this URL to give your friends the reward ${couponValue} off coupon`;
  refDesc.style.cssText += `color: #637381;
  font-size: 11px;
  font-weight: 400;
  margin: 8px 0px`;
  refContainer.appendChild(refDesc);

  let refLink = document.createElement('div');
  refLink.style.cssText += `padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  font-size: 11px;
  cursor: pointer;
  color: #637381;
  display:flex;
  align-items: center;`;
  userId ? refContainer.appendChild(refLink) : null;

  span = document.createElement('span');
  span.textContent = `https://${shopDomain}/?ref=${result.referralCode}`;
  refLink.appendChild(span);

  let copy = document.createElement('icon');
  copy.style.cssText += `font-size: 13px;`;
  copy.classList.add('far', 'fa-clipboard');
  copy.addEventListener('click', (event) => {
    document.execCommand('copy');
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener('copy', function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData(
        'text/plain',
        `https://${shopDomain}/?ref=${result.referralCode}`
      );
      console.log(event.clipboardData.getData('text'));
    }
  });
  refLink.appendChild(copy);

  document.body.appendChild(myDiv3);

  // page 4

  css(myDiv4, divClass);
  document.body.appendChild(myDiv4);

  //top
  div1 = document.createElement('div');
  div1Class = {
    backgroundColor: merchant.theme.color,
    height: '55px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: ' 20px 20px 0px 20px',
    color: merchant.theme.font,
    fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', () => {
    myDiv4.style.display = 'none';
    myDiv2.style.display = 'block';
    let p = document.getElementById('successMsg');
    p.style.display = 'none';
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText +=
    "font-family: 'Roboto';font-size: 14px; margin-left: 10px;";
  span.textContent = 'Super Rewards';
  div1.appendChild(span);

  css(div1, div1Class);
  myDiv4.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText +=
    "margin-top: 20px;padding: 10px;font-family: 'Roboto';  font-weight: 500;";

  span = document.createElement('span');
  span.textContent = 'Birthday reward';
  center.appendChild(span);

  div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-birthday-cake');
  div.appendChild(icon);

  textGrp3 = document.createElement('div');
  textGrp3.style.cssText += `display: flex;
  margin-left: 15px;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;`;
  div.appendChild(textGrp3);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 0px;
  justify-content: center;
  width: 100%;`;
  textGrp3.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = 'Celebrate a birthday';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = merchant.birthdayPoints + ' points';
  newDiv.appendChild(span);

  let centerDesc = document.createElement('span');
  centerDesc.textContent = `We want to celebrate your birthday! Make sure you let us know at least one month in
          advance — otherwise, you'll have to wait until next year.`;
  centerDesc.style.cssText += `font-size: 14px;
  font-weight: 300;
  color: #000;`;
  center.appendChild(centerDesc);

  myDiv4.appendChild(center);

  //btncontainer
  let dateContainer = document.createElement('div');
  dateContainer.style.cssText += `padding: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`;
  myDiv4.appendChild(dateContainer);

  span = document.createElement('span');
  span.style.cssText += `font-weight: 400;`;
  span.textContent = 'Select your birthday';
  dateContainer.appendChild(span);

  let input = document.createElement('input');
  input.style.cssText += `width: 130px;
  margin: 10px 0px;
  border: 1px solid #e5e5e5;
  padding: 5px 12px;
  border-radius:8px; 
  cursor: pointer;
  outline: none;
  color: #c3c2c2;
  font-weight: 400;`;
  input.type = 'date';
  input.name = 'birthday';
  input.id = 'date';
  dateContainer.appendChild(input);

  button = document.createElement('button');
  button.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  cursor: pointer;
  margin: 15px 0px;`;
  button.textContent = 'save date';
  dateContainer.appendChild(button);

  button.addEventListener('click', () => {
    let birthday = new Date(document.getElementById('date').value);
    updateUserBirthday(birthday.getDate(), birthday.getMonth() + 1);
    let p = document.getElementById('successMsg');
    p.style.display = 'block';
  });

  let successMsg = document.createElement('p');
  successMsg.textContent = 'Date saved successfully';
  successMsg.id = 'successMsg';
  successMsg.style.cssText += `
  color: green;
  font-family: Roboto;
  display: none;
  `;
  dateContainer.appendChild(successMsg);

  // page 5

  css(myDiv5, divClass2);
  document.body.appendChild(myDiv5);

  //top
  div1 = document.createElement('div');
  div1Class = {
    backgroundColor: merchant.theme.color,
    height: '55px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: ' 20px 20px 0px 20px',
    color: merchant.theme.font,
    fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', () => {
    myDiv5.style.display = 'none';
    renderPage.style.display = 'block';
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText +=
    "font-family: 'Roboto';font-size: 14px; margin-left: 10px;";
  span.textContent = 'Super Rewards';
  div1.appendChild(span);

  css(div1, div1Class);
  myDiv5.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText +=
    "margin-top: 20px;padding: 10px;font-family: 'Roboto';  font-weight: 500;";

  span = document.createElement('span');
  span.textContent = 'Ways to redeem';
  center.appendChild(span);

  //-- fixed amount coupon
  div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-money-bill-wave');
  div.appendChild(icon);

  textGrp3 = document.createElement('div');
  textGrp3.style.cssText += `display: flex;
  margin-left: 15px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;`;
  div.appendChild(textGrp3);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 0px;
  justify-content: center;
  width: 100%;`;
  textGrp3.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  const value3 = merchant.currency.symbol.replace(
    /{{amount}}/g,
    merchant.couponAmt
  );
  span.textContent = value3 + ' Off coupon';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = merchant.redeemPoints + ' points';
  newDiv.appendChild(span);

  dateBtn = document.createElement('button');
  dateBtn.textContent = 'Redeem';
  dateBtn.addEventListener('click', async () => {
    //add function call
    await getDiscountCode();
    let span = document.getElementById('discount');
    span.textContent = discountCode;
    let couponDesc = document.getElementById('discount-coupon-value');
    couponDesc.textContent = `${value3} off coupon`;
    let couponPoints = document.getElementById('discount-points-spent');
    couponPoints.textContent = `Spent ${merchant.redeemPoints} points`;
    myDiv5.style.display = 'none';
    myDiv6.style.display = 'block';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  font-family: Roboto;`;
  dateBtn.style.opacity =
    result.points < merchant.redeemPoints ? '40%' : '100%';
  dateBtn.disabled = result.points < merchant.redeemPoints;
  userId ? textGrp3.appendChild(dateBtn) : null;

  //--
  //-- shipping coupon
  div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-shipping-fast');
  div.appendChild(icon);

  textGrp3 = document.createElement('div');
  textGrp3.style.cssText += `display: flex;
  margin-left: 15px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;`;
  div.appendChild(textGrp3);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 0px;
  justify-content: center;
  width: 100%;`;
  textGrp3.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = 'Free shipping coupon';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = merchant.shippingPoints + ' points';
  newDiv.appendChild(span);

  dateBtn = document.createElement('button');
  dateBtn.textContent = 'Redeem';
  dateBtn.addEventListener('click', async () => {
    //add function call
    await getFreeShippingCode();
    let span = document.getElementById('discount');
    span.textContent = discountCode;
    let couponDesc = document.getElementById('discount-coupon-value');
    couponDesc.textContent = `Free shipping coupon`;
    let couponPoints = document.getElementById('discount-points-spent');
    couponPoints.textContent = `Spent ${merchant.shippingPoints} points`;
    myDiv5.style.display = 'none';
    myDiv6.style.display = 'block';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  font-family: Roboto;`;
  dateBtn.style.opacity =
    result.points < merchant.shippingPoints ? '40%' : '100%';
  dateBtn.disabled = result.points < merchant.shippingPoints;
  userId ? textGrp3.appendChild(dateBtn) : null;

  //--
  //-- percentage coupon
  div = document.createElement('div');
  div.style.cssText +=
    'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  center.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-percent');
  div.appendChild(icon);

  textGrp3 = document.createElement('div');
  textGrp3.style.cssText += `display: flex;
  margin-left: 15px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 10px;`;
  div.appendChild(textGrp3);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 0px;
  justify-content: center;
  width: 100%;`;
  textGrp3.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = merchant.percentageAmt + ' % Off coupon';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = merchant.percentagePoints + ' points';
  newDiv.appendChild(span);

  dateBtn = document.createElement('button');
  dateBtn.textContent = 'Redeem';
  dateBtn.addEventListener('click', async () => {
    //add function call
    await getPercentageCode();
    let span = document.getElementById('discount');
    span.textContent = discountCode;
    let couponDesc = document.getElementById('discount-coupon-value');
    couponDesc.textContent = `${merchant.percentageAmt}% off coupon`;
    let couponPoints = document.getElementById('discount-points-spent');
    couponPoints.textContent = `Spent ${merchant.percentagePoints} points`;
    myDiv5.style.display = 'none';
    myDiv6.style.display = 'block';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  font-family: Roboto;`;
  dateBtn.style.opacity =
    result.points < merchant.percentagePoints ? '40%' : '100%';
  dateBtn.disabled = result.points < merchant.percentagePoints;
  userId ? textGrp3.appendChild(dateBtn) : null;

  //--

  myDiv5.appendChild(center);

  //btncontainer
  btnC = document.createElement('div');
  btnC.style.cssText += 'text-align: center;';
  myDiv5.appendChild(btnC);

  button = document.createElement('button');

  css(button, btnClass2);
  userId ? null : btnC.appendChild(button);

  a = document.createElement('a');
  a.textContent = 'Join Now';
  a.href =
    `https://${shopDomain}/account/register` +
    (referrer ? `?ref=${referrer}` : '');
  css(a, aClass2);
  button.appendChild(a);

  // page 6

  css(myDiv6, divClass2);
  document.body.appendChild(myDiv6);

  //top
  div1 = document.createElement('div');
  div1Class = {
    backgroundColor: merchant.theme.color,
    height: '55px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: ' 20px 20px 0px 20px',
    color: merchant.theme.font,
    fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', () => {
    myDiv6.style.display = 'none';
    myDiv5.style.display = 'block';
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText +=
    "font-family: 'Roboto';font-size: 14px; margin-left: 10px;";
  span.textContent = 'Super Rewards';
  div1.appendChild(span);

  css(div1, div1Class);
  myDiv6.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText +=
    "margin-top: 20px;padding: 10px;font-family: 'Roboto';  font-weight: 500;";

  span = document.createElement('span');
  span.textContent = 'Discount code';
  center.appendChild(span);

  //--

  myDiv6.appendChild(center);
  //--ref container

  refContainer = document.createElement('div');
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);`;
  myDiv6.appendChild(refContainer);

  //--
  div = document.createElement('div');
  div.style.cssText +=
    'display: flex;  align-items: center;  width: 100%;  cursor: pointer;';
  refContainer.appendChild(div);

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.style.color = merchant.theme.color;
  icon.classList.add('fas', 'fa-money-bill-wave');
  div.appendChild(icon);

  textGrp3 = document.createElement('div');
  textGrp3.style.cssText += `display: flex;
  margin-left: 15px;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;`;
  div.appendChild(textGrp3);

  newDiv = document.createElement('div');
  newDiv.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 0px;
  justify-content: center;
  width: 100%;`;
  textGrp3.appendChild(newDiv);

  span = document.createElement('span');
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;`;
  span.textContent = '₹20 Off coupon';
  span.id = 'discount-coupon-value';
  newDiv.appendChild(span);

  span = document.createElement('span');
  span.id = 'discount-points-spent';
  span.style.cssText += `font-size: 14px;
  font-weight: 300;
  margin-bottom: 5px;
  color: #777474;
  font-weight: 400;`;
  span.textContent = 'Spent 100 points';
  newDiv.appendChild(span);
  //--

  refDesc = document.createElement('p');
  refDesc.textContent = 'Use this discount code on your next order!';
  refDesc.style.cssText += `color: #637381;
  font-size: 13px;
  font-weight: 400;`;
  refContainer.appendChild(refDesc);

  refLink = document.createElement('div');
  refLink.style.cssText += `padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  font-size: 11px;
  cursor: pointer;
  color: #637381;
  text-align: center;
  display: flex;
  align-items: center;
  justifu-content: center;`;
  userId ? refContainer.appendChild(refLink) : null;

  span = document.createElement('span');
  span.id = 'discount';
  span.textContent = ` ${discountCode} `;
  refLink.appendChild(span);

  copy = document.createElement('icon');
  copy.style.cssText += `font-size: 13px;margin-left: 10px;`;
  copy.classList.add('far', 'fa-clipboard');
  copy.addEventListener('click', (event) => {
    document.execCommand('copy');
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener('copy', function (event) {
    event.preventDefault();
    let span = document.getElementById('discount');
    if (event.clipboardData) {
      event.clipboardData.setData('text/plain', span.textContent);
      console.log(event.clipboardData.getData('text'));
    }
  });
  refLink.appendChild(copy);

  // page 7

  css(myDiv7, divClass);
  document.body.appendChild(myDiv7);

  //top
  div1 = document.createElement('div');
  div1Class = {
    backgroundColor: merchant.theme.color,
    height: '55px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: ' 20px 20px 0px 20px',
    color: merchant.theme.font,
    fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', () => {
    myDiv7.style.display = 'none';
    renderPage.style.display = 'block'; //
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText +=
    "font-family: 'Roboto';font-size: 14px; margin-left: 10px;";
  span.textContent = 'Super Rewards';
  div1.appendChild(span);

  css(div1, div1Class);
  myDiv7.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText +=
    "margin-top: 20px;padding: 10px;font-family: 'Roboto';  font-weight: 500;";

  span = document.createElement('span');
  span.textContent = 'Your Coupons';
  codes.length !== 0 && center.appendChild(span);

  //---
  // div = document.createElement('div');
  // div.style.cssText +=
  //   'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
  // center.appendChild(div);

  // icon = document.createElement('i');
  // icon.style.fontSize = '20px';
  // icon.style.color = merchant.theme.color;
  // icon.classList.add('fas', 'fa-user-tag');
  // div.appendChild(icon);

  // textGrp3 = document.createElement('div');
  // textGrp3.style.cssText += `display: flex;
  // margin-left: 15px;
  // align-items: center;
  // width: 100%;
  // padding-bottom: 10px;
  // border-bottom: 1px solid #e5e5e5;`;
  // div.appendChild(textGrp3);

  // newDiv = document.createElement('div');
  // newDiv.style.cssText += `display: flex;
  // flex-direction: column;
  // margin-left: 0px;
  // justify-content: center;
  // width: 100%;`;
  // textGrp3.appendChild(newDiv);

  // span = document.createElement('span');
  // span.style.cssText += `font-size: 14px;
  // font-weight: 300;
  // `;
  // span.textContent = codes[0]; //coupon code
  // textGrp3.appendChild(span);
  //newDiv.appendChild(span);

  for (const codeObj of codes) {
    div = document.createElement('div');
    div.style.cssText +=
      'margin: 10px 0px; display: flex;  align-items: center;  width: 100%;  cursor: pointer;margin-top: 20px;';
    center.appendChild(div);

    icon = document.createElement('i');
    icon.style.fontSize = '20px';
    icon.style.color = merchant.theme.color;
    icon.classList.add('fas', 'fa-user-tag');
    div.appendChild(icon);

    textGrp3 = document.createElement('div');
    textGrp3.style.cssText += `display: flex;
      margin-left: 15px;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;`;
    div.appendChild(textGrp3);

    newDiv = document.createElement('div');
    newDiv.style.cssText += `display: flex;
    flex-direction: column;
    margin-left: 0px;
    justify-content: center;
    width: 100%;`;
    textGrp3.appendChild(newDiv);

    let discountDesc = document.createElement('span');
    discountDesc.textContent = codeObj.desc;
    discountDesc.style.cssText += `
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: 400;
    `;
    newDiv.appendChild(discountDesc);

    span = document.createElement('span');
    span.style.cssText += `font-size: 14px;
    font-weight: 300;
    color: #777474;
    `;
    span.textContent = codeObj.code; //coupon code
    newDiv.appendChild(span);

    copy = document.createElement('icon');
    copy.style.cssText += `font-size: 13px; margin-left: 10px;`;
    copy.classList.add('far', 'fa-clipboard');
    copy.addEventListener('click', (event) => {
      document.execCommand('copy');
      event.target.style.cssText += `color: black;
    font-size: 15px;`;
    });
    copy.addEventListener('copy', function (event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData('text/plain', codeObj.code);
        console.log(event.clipboardData.getData('text'));
      }
    });
    textGrp3.appendChild(copy);
  }
  //--

  // illustration
  let imgContainer = document.createElement('div');
  imgContainer.style.cssText += `
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;`;
  codes.length === 0 && center.appendChild(imgContainer);

  const img = document.createElement('img');
  img.src =
    'https://res.cloudinary.com/dl3nzdely/image/upload/v1625033697/1_sxsjlc.jpg';
  img.alt = 'no rewards';
  imgContainer.appendChild(img);

  const noRewardsText = document.createElement('span');
  noRewardsText.textContent = 'No rewards yet';
  noRewardsText.style.cssText += `
  margin: 15px 0px;
  font-size: 14px
  font-family: Roboto;
  `;
  imgContainer.appendChild(noRewardsText);

  myDiv7.appendChild(center);
};

myFunc();
