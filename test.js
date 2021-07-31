let SAR_appUrl = 'https://8374e2173854.ngrok.io'; //'https://rewards-backend.superassistant.io';

/* sentry set up */
sentry2tag = document.createElement('script');
sentry2tag.src = 'https://browser.sentry-cdn.com/6.10.0/bundle.min.js';
sentry2tag.integrity =
  'sha384-nsIkfmMh0uiqg+AwegHcT1SMiPNWnhZmjFDwTshLTxur6ZPNaGT8vwT+vHwI5Jag';
sentry2tag.crossOrigin = 'anonymous';
document.head.appendChild(sentry2tag);
setTimeout(function () {
  try {
    Sentry.init({
      dsn: 'https://8c07ef18176e421389fe0d2b972c7d43@o609888.ingest.sentry.io/5878036',
      release: 'rewards-script',
      tracesSampleRate: 1,
    });
    console.log('sentry loaded successfully');
  } catch (b) {
    console.log('Sentry error', b);
  }
}, 100);

/* globally set variables */
let userId;
if (meta.page) {
  userId = meta.page.customerId;
}

if (Shopify.Checkout) {
  userId = Shopify.Checkout.customer.customer_id;
}

let referrer = new URLSearchParams(location.search).get('ref');
let SA_rewards_shopDomain = Shopify.shop;

/* above variables set for local testing*/
// let userId = 5339222605995;
// let referrer = new URLSearchParams(location.search).get('ref'); //= 'SUPER20Neil';
// let SA_rewards_shopDomain = 'super-rewards-test.myshopify.com'; //'web-neil.myshopify.com';

referrer && localStorage.setItem('SA_rewards_ref', referrer);

/* variables initialized. These will be updated/re-assigned values from our API calls. */

let result = {}; /*our current logged in customer */
let merchant = {}; /*The merchant/store owner  */
let codes = []; /* An array of discount codes of the customer*/
let discountCode; /*generated discount code */
let showMessage = false; /*toggle the saved message */

/*Helper function to add css styles */
const css = function (element, styleObj) {
  for (let property in styleObj) element.style[property] = styleObj[property];
};

/* helper function to get the current customer and merchant details.
This API will update the above result and merchant variables. */
const getPointsData = async function () {
  if (userId) {
    const res = await fetch(
      `${SAR_appUrl}/points/${userId}?shopDomain=${SA_rewards_shopDomain}`
    );
    const data = await res.json();
    // console.log(data);
    result = data.customer;
    merchant = data.merchant;
  } else {
    const res = await fetch(
      `${SAR_appUrl}/merchant-info/?shopDomain=${SA_rewards_shopDomain}`
    );
    const data = await res.json();
    // console.log(data);
    merchant = data;
  }
};

/*helper function to get all the available discount codes of the customer.
This API will update the above codes array variable. */
const getDiscountCodes = async function () {
  if (userId) {
    const res = await fetch(
      `${SAR_appUrl}/rewards/${userId}?shopDomain=${SA_rewards_shopDomain}`
    );
    const data = await res.json();
    // console.log(data);
    codes = data;
  }
};

/*helper function to set the customer's birthday in the database. */
const updateUserBirthday = async function (day, month) {
  if (userId) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ day, month, shopDomain: SA_rewards_shopDomain }),
    };
    const res = await fetch(`${SAR_appUrl}/birthday/${userId}`, options);
    showMessage = true;
    // console.log(res);
  }
};

/*helper function to save the referrer code if a new customer has used
a referral link. */
const sendReferrerCode = async function () {
  const referrerCode = localStorage.getItem('SA_rewards_ref');
  if (referrerCode) {
    const res = await fetch(
      `${SAR_appUrl}/set-referrer?ref=${referrer}&shopDomain=${SA_rewards_shopDomain}`
    );
    const data = await res.json();
    // console.log(data);
  }
};

/*helper function to generate the fixed amount coupon code when customer
clicks on redeem. */
const getDiscountCode = async function () {
  const res = await fetch(
    `${SAR_appUrl}/discount/${userId}?shopDomain=${SA_rewards_shopDomain}`
  );
  const data = await res.json();
  discountCode = data;
  // console.log(data);
  localStorage.setItem('discount', data);
};

/*helper function to generate the free shipping coupon code when customer
clicks on redeem. */
const getFreeShippingCode = async function () {
  const res = await fetch(
    `${SAR_appUrl}/shipping/${userId}?shopDomain=${SA_rewards_shopDomain}`
  );
  const data = await res.json();
  discountCode = data;
  // console.log(data);
  localStorage.setItem('discount', data);
};

/*helper function to generate the percentage off coupon code when customer
clicks on redeem. */
const getPercentageCode = async function () {
  const res = await fetch(
    `${SAR_appUrl}/percentage-discount/${userId}?shopDomain=${SA_rewards_shopDomain}`
  );
  const data = await res.json();
  discountCode = data;
  // console.log(data);
  localStorage.setItem('discount', data);
};

/*helper function to hide the current page. */
const toggleCurrentPage = function (pageId) {
  if (pageId !== '') {
    let currentPage = document.getElementById(pageId);
    // currentPage.style.display = 'none';
    $(`#${pageId}`).fadeOut('slow');

    const mainPage = userId
      ? document.getElementById('div-3')
      : document.getElementById('div');
    mainPage.style.display = 'none';
  }
};

//fontawesome script
let script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/ccca1edeec.js';
script.crossOrigin = 'anonymous';
document.body.appendChild(script);

//jquery scripts
script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js';
script.crossOrigin = 'anonymous';
document.body.appendChild(script);

/* Main function that will append all the elements and make API calls. */
const appendWidget = async function () {
  await getPointsData();
  await getDiscountCodes();
  await sendReferrerCode();

  let widgetPage_1 = document.createElement('div');
  let widgetPage_2 = document.createElement('div');
  let widgetPage_3 = document.createElement('div');
  let widgetPage_4 = document.createElement('div');
  let widgetPage_5 = document.createElement('div');
  let widgetPage_6 = document.createElement('div');
  let widgetPage_7 = document.createElement('div');
  let widgetPage_8 = document.createElement('div');

  widgetPage_1.id = 'div';
  widgetPage_2.id = 'div-2';
  widgetPage_3.id = 'div-3';
  widgetPage_4.id = 'div-4';
  widgetPage_5.id = 'div-5';
  widgetPage_6.id = 'div-6';
  widgetPage_7.id = 'div-7';
  widgetPage_8.id = 'div-8';

  let homePage = userId
    ? widgetPage_3
    : widgetPage_1; /* main page to display when user is logged in or not */
  let currentPage = '';

  /* page 1: This is the main page before logging in.*/

  let bottomPosition =
    window.innerWidth > 768
      ? 70
      : 0; /* controls the relative position of the widget based on merchant settings.*/

  let isMobile = window.innerWidth <= 768;

  const divClass = {
    backgroundColor: '#fff',
    position: 'fixed',
    boxSizing: 'border-box',
    bottom: parseInt(merchant.theme.positionBottom) + bottomPosition + 'px',
    [merchant.theme.placement]: `${merchant.theme.positionSide}px`,
    minHeight: '550px',
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    display: 'none',
    zIndex: '999',
    //fontFamily: 'roboto',
    // transition: 'display 2s',
  };

  if (isMobile) {
    divClass.bottom = '20px';
    divClass[[merchant.theme.placement]] = '20px';
  }

  css(widgetPage_1, divClass);

  //cardtop
  let div1 = document.createElement('div');
  let div1Class1 = {
    backgroundColor: merchant.theme.color,
    height: '140px',
    margin: '-10px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    padding: '20px 20px 0px 20px',
    color: merchant.theme.font,
    //fontFamily: 'Roboto',
  };

  let closeBox = document.createElement('div');
  closeBox.style.cssText += `
  display: flex;
  margin: 0;
  justify-content: space-between;
  align-items: center;
  `;
  div1.appendChild(closeBox);

  let span = document.createElement('span');
  span.textContent = 'Welcome to';
  closeBox.appendChild(span);

  let cross = document.createElement('icon');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;`;
  cross.onclick = function () {
    // homePage.style.display = 'none';
    let sa_homePage = userId ? '#div-3' : '#div';
    $(sa_homePage).fadeOut('slow');
    currentPage = '';
  };
  closeBox.appendChild(cross);

  let p = document.createElement('p');
  p.textContent = merchant?.theme?.title; //'Super Rewards';
  let pClass = {
    fontSize: '24px',
    fontWeight: '600',
    margin: '8px 0px', //' 15px 0px',
    color: merchant.theme.font,
  };
  css(p, pClass);
  div1.appendChild(p);

  css(div1, div1Class1);
  widgetPage_1.appendChild(div1);

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
    margin: 8px;
    margin-top: 0px;
  `;
  div2.appendChild(p);

  span = document.createElement('span');
  const spanClass = {
    fontSize: '11px',
    //fontFamily: 'Roboto',
    color: '#777474',
    textAlign: 'center',
  };
  css(span, spanClass);
  span.textContent =
    'With more ways to unlock exciting perks, this is your all access pass to exclusive rewards.';
  div2.appendChild(span);

  let a = document.createElement('a');
  a.href =
    `https://${SA_rewards_shopDomain}/account/register` +
    (referrer ? `?ref=${referrer}` : '');
  const aClass = {
    textDecoration: 'none',
    color: 'inherit',
  };
  css(a, aClass);
  div2.appendChild(a);

  let button = document.createElement('button');
  const btnClass = {
    border: 'none',
    borderRadius: '8px',
    padding: '16px 24px',
    backgroundColor: merchant.theme.color,
    color: merchant.theme.font,
    fontSize: '12px',
    margin: '8px 0px',
    //fontFamily: 'Roboto',
  };
  button.textContent = 'Join Now';
  css(button, btnClass);
  a.appendChild(button);

  css(div2, div2Class);
  widgetPage_1.appendChild(div2);

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
    margin: 8px;
    margin-top: 0;`;
  div3.appendChild(p);

  span = document.createElement('span');
  const spanClass2 = {
    fontSize: '13px',
    //fontFamily: 'Roboto',
    color: '#777474',
    textAlign: 'center',
    marginBottom: '10px',
  };
  // css(span, spanClass2);
  span.style.cssText += `font-size: 11px;
    color: rgb(119, 116, 116);
    text-align: center;
    margin-bottom: 8px;`;
  span.textContent =
    ' Earn more Points for different actions, and turn those Points into awesome rewards!';
  div3.appendChild(span);

  css(div3, div3Class);

  let div4 = document.createElement('div');
  div4.addEventListener('click', function () {
    homePage.style.display = 'none';
    // widgetPage_2.style.display = 'block';
    $('#div-2').fadeIn('slow');
    currentPage = 'div-2';
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
    //fontFamily: 'Roboto',
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
  div4.addEventListener('click', function () {
    homePage.style.display = 'none';
    // widgetPage_5.style.display = 'block';
    $('#div-5').fadeIn('slow');
    currentPage = 'div-5';
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

  merchant.isPointsActive && widgetPage_1.appendChild(div3);

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
  
  margin: 0px;
  `;
  refBox.appendChild(para);

  let refDescp = document.createElement('span');
  refDescp.textContent =
    'Give your friends a reward and claim your own when they make a purchase.';
  refDescp.style.cssText += `
  font-size: 11px;
  
  color: #777474;
  margin: 5px 0px;
  margin-bottom:0px;
  `;
  refBox.appendChild(refDescp);

  merchant.isReferralsActive && widgetPage_1.appendChild(refBox);

  let btn = document.createElement('button');
  css(btn, {
    backgroundColor: merchant.theme.color,
    position: 'fixed',
    bottom: `${merchant.theme.positionBottom}px`,
    [merchant.theme.placement]: `${merchant.theme.positionSide}px`,
    borderRadius: '50%',
    padding: '18px',
    border: 'none',
    color: merchant.theme.font,
    cursor: 'pointer',
    zIndex: '998',
    // transform: 'rotate(-360deg)',
    // transition: 'transform 4s',
  });

  if (isMobile) {
    btn.style.bottom = '20px';
    btn.style[[merchant.theme.placement]] = '20px';
  }

  icon = document.createElement('i');
  icon.style.fontSize = '20px';
  icon.classList.add('fas', 'fa-gift');
  btn.appendChild(icon);

  btn.id = 'toggle_page_btn';
  btn.addEventListener('click', function () {
    let page_btn = document.getElementById('toggle_page_btn');
    let sa_homePage = userId ? '#div-3' : '#div';
    if (homePage.style.display === 'none') {
      // homePage.style.display = 'block';
      $(sa_homePage).fadeIn('slow');
      // page_btn.style.transform = 'rotate(360deg)';
    } else {
      // homePage.style.display = 'none';
      $(sa_homePage).fadeOut('slow');
      // page_btn.style.transform = 'rotate(-360deg)';
    }
    toggleCurrentPage(currentPage);
    currentPage = '';
  });

  let showAppOnPage = true;
  if (merchant.theme.pages === 'thank_you') {
    showAppOnPage = Shopify.Checkout !== undefined;
  }

  document.body.appendChild(widgetPage_1);
  (merchant.isPointsActive || merchant.isReferralsActive) &&
    showAppOnPage &&
    document.body.appendChild(btn);

  /* Page 1 ends */

  /* Page 2: This page shows all the ways to earn points */

  const divClass2 = {
    backgroundColor: '#fff',
    position: 'fixed',
    boxSizing: 'border-box',
    bottom: parseInt(merchant.theme.positionBottom) + bottomPosition + 'px',
    [merchant.theme.placement]: `${merchant.theme.positionSide}px`,
    height: '550px',
    width: '320px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
    display: 'none',
    zIndex: '999',
  };

  if (isMobile) {
    divClass2.bottom = '20px';
    divClass2[[merchant.theme.placement]] = '20px';
  }

  css(widgetPage_2, divClass2);
  document.body.appendChild(widgetPage_2);

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
    display: 'flex',
    alignItems: 'baseline',
    //fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', function () {
    widgetPage_2.style.display = 'none';
    // homePage.style.display = 'block';
    let sa_homePage = userId ? '#div-3' : '#div';
    $(sa_homePage).fadeIn('slow');
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon, (style = merchant.theme.font);
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  //font-roboto
  span.style.cssText += 'font-size: 14px; margin-left: 10px;';
  span.textContent = merchant?.theme?.title; //'Super Rewards';
  div1.appendChild(span);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;
  margin-left: auto`;
  cross.onclick = function () {
    // widgetPage_2.style.display = 'none';
    $('#div-2').fadeOut('slow');
    currentPage = '';
  };
  div1.appendChild(cross);

  css(div1, div1Class);
  widgetPage_2.appendChild(div1);

  //center
  let center = document.createElement('div');
  center.style.cssText += 'margin-top: 28px;padding: 10px;font-weight: 500;';

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
  dateBtn.id = 'edit-date-btn';
  dateBtn.textContent = 'Edit date';
  dateBtn.addEventListener('click', function () {
    widgetPage_2.style.display = 'none';
    // widgetPage_4.style.display = 'block';
    $('#div-4').fadeIn('slow');
    currentPage = 'div-4';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color:${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  `;

  let allowedToUpdate = result.birthday_updated_at
    ? (new Date() - result.birthday_updated_at) / 86400000 > 30
    : true;
  dateBtn.style.opacity = allowedToUpdate ? '100%' : '40%';
  dateBtn.disabled = !allowedToUpdate;
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

  widgetPage_2.appendChild(center);

  //btncontainer
  let btnC = document.createElement('div');
  btnC.style.cssText += 'text-align: center;';
  widgetPage_2.appendChild(btnC);

  a = document.createElement('a');
  a.href =
    `https://${SA_rewards_shopDomain}/account/register` +
    (referrer ? `?ref=${referrer}` : '');
  const aClass2 = {
    textDecoration: 'none',
    color: 'inherit',
  };
  css(a, aClass2);
  userId ? null : btnC.appendChild(a);

  button = document.createElement('button');
  button.textContent = 'Join Now';
  const btnClass2 = {
    border: 'none',
    borderRadius: '8px',
    padding: '18px 34px',
    backgroundColor: merchant.theme.color,
    color: merchant.theme.font,
    fontSize: '12px',
    margin: '10px 0px',
    //fontFamily: 'Roboto',
  };
  css(button, btnClass2);
  a.appendChild(button);

  /* Page 2 ends */

  /* Page 3: This is the main page after logging in */

  css(widgetPage_3, divClass);

  //cardtop
  div1 = document.createElement('div');

  closeBox = document.createElement('div');
  closeBox.style.cssText += `
  display: flex;
  margin: 0;
  justify-content: space-between;
  align-items: center;
  `;
  div1.appendChild(closeBox);

  span = document.createElement('span');
  span.textContent = 'Welcome to';
  closeBox.appendChild(span);

  cross = document.createElement('icon');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;`;
  cross.onclick = function () {
    // homePage.style.display = 'none';
    let sa_homePage = userId ? '#div-3' : '#div';
    $(sa_homePage).fadeOut('slow');
  };
  closeBox.appendChild(cross);

  p = document.createElement('p');
  p.style.cssText += `font-size: 24px;
  font-weight: 600;
  margin: 10px 0px;
  color: ${merchant.theme.font};
  `;
  // console.log(p);
  p.textContent = merchant?.theme?.title; //'Super Rewards';

  div1.appendChild(p);

  css(div1, div1Class1);
  widgetPage_3.appendChild(div1);

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

  let text = document.createElement('button');
  text.id = 'rewards-button';
  text.addEventListener('click', async function () {
    text.disabled = true;
    $.ajax({
      url: `${SAR_appUrl}/rewards/${userId}?shopDomain=${SA_rewards_shopDomain}`,
      type: 'GET',
      success: function (data) {
        console.log('hi im in ajax codes');
        console.log($('#rewards-button'));
        document.getElementById('rewards-button').disabled = false;
        codes = data;
        homePage.style.display = 'none'; //
        // widgetPage_7.style.display = 'block';
        $('#div-7').fadeIn('slow');
        currentPage = 'div-7';
      },
    });
  });
  text.style.cssText += `display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
  width: 90%;
  border: none;
  outline:none;
  background-color: inherit;`;
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
  widgetPage_3.appendChild(div2);

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
  margin: 12px 0px;
  margin-top: 8px;`;
  div3.appendChild(pd);

  span = document.createElement('span');
  span.id = 'customer-points';
  span.textContent = `${result.points} points`;
  span.style.cssText += `font-weight: 600;`;
  pd.appendChild(span);

  icon = document.createElement('i');
  icon.classList.add('fas', 'fa-sync-alt');
  //pd.appendChild(icon);

  css(div3, div3Class2);

  div4 = document.createElement('div');
  div4.addEventListener('click', function () {
    homePage.style.display = 'none';
    // widgetPage_2.style.display = 'block';
    $('#div-2').fadeIn('slow');
    currentPage = 'div-2';
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
  div4.addEventListener('click', function () {
    homePage.style.display = 'none';
    // widgetPage_5.style.display = 'block';
    $('#div-5').fadeIn('slow');
    currentPage = 'div-5';
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

  merchant.isPointsActive && widgetPage_3.appendChild(div3);

  let refContainer = document.createElement('div');
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);`;
  merchant.isReferralsActive && widgetPage_3.appendChild(refContainer);

  span = document.createElement('span');
  span.textContent = 'Refer your friends';
  span.style.cssText += `
  font-size: 14px;
  font-weight: 300;
  display:flex;
  justify-content:space-between;
  width:95%;
  cursor:pointer;
`;

  span.addEventListener('click', function () {
    homePage.style.display = 'none';
    // widgetPage_8.style.display = 'block';
    $('#div-8').fadeIn('slow');
    currentPage = 'div-8';
  });

  icon = document.createElement('i');
  icon.style.fontSize = '14px';
  icon.style.color = '#777474';
  icon.classList.add('fas', 'fa-angle-right');
  span.appendChild(icon);
  refContainer.appendChild(span);

  let refDesc = document.createElement('p');
  const couponValue = merchant.currency.symbol.replace(
    /{{amount}}/g,
    merchant.friendAmt
  );

  const couponValue_advocate = merchant.currency.symbol.replace(
    /{{amount}}/g,
    merchant.advocateAmt
  );

  let referralMessage = `${couponValue} off coupon`;
  if (merchant.friendType === 'percentage') {
    referralMessage = `${merchant.friendAmt} % off coupon`;
  }

  let referralMessage_advocate = `${couponValue_advocate} off coupon`;
  if (merchant.advocateType === 'percentage') {
    referralMessage_advocate = `${merchant.advocateAmt} % off coupon`;
  }

  refDesc.textContent = `Share this URL to give your friends the reward ${referralMessage} and you will get ${referralMessage_advocate} on their first order.`;
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
  span.textContent = `https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  refLink.appendChild(span);

  let copy = document.createElement('icon');
  copy.style.cssText += `font-size: 13px;`;
  copy.classList.add('far', 'fa-clipboard');
  copy.addEventListener('click', function (event) {
    document.execCommand('copy');
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener('copy', function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData(
        'text/plain',
        `https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`
      );
    }
  });
  refLink.appendChild(copy);

  document.body.appendChild(widgetPage_3);

  /* Page 3 ends */

  /*Page 4: On this page the customer can add their birthday. */

  css(widgetPage_4, divClass);
  document.body.appendChild(widgetPage_4);

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
    display: 'flex',
    alignItems: 'baseline',
    //fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', function () {
    $.ajax({
      url: `${SAR_appUrl}/points/${userId}?shopDomain=${SA_rewards_shopDomain}`,
      type: 'GET',
      success: function (data) {
        // console.log('hi this is ajax 2');

        let editDateBtn = document.getElementById('edit-date-btn');
        let allowedToUpdate = data.customer.birthday_updated_at
          ? (new Date() - data.customer.birthday_updated_at) / 86400000 > 30
          : true;

        editDateBtn.style.opacity = allowedToUpdate ? '100%' : '40%';
        editDateBtn.disabled = !allowedToUpdate;

        widgetPage_4.style.display = 'none';
        // widgetPage_2.style.display = 'block';
        $('#div-2').fadeIn('slow');
        currentPage = 'div-2';
        let p = document.getElementById('successMsg');
        p.style.display = 'none';
      },
    });
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText += 'font-size: 14px; margin-left: 10px;';
  span.textContent = merchant?.theme?.title; // 'Super Rewards';
  div1.appendChild(span);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;
  margin-left: auto`;
  cross.onclick = function () {
    // widgetPage_4.style.display = 'none';
    $('#div-4').fadeOut('slow');
    currentPage = '';
  };
  div1.appendChild(cross);

  css(div1, div1Class);
  widgetPage_4.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText += 'margin-top: 20px;padding: 10px; font-weight: 500;';

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
  centerDesc.textContent = `We want to celebrate your birthday!
  Make sure you let us know at least 30 days in
          advance — otherwise, you'll have to wait until next year.`;
  centerDesc.style.cssText += `font-size: 14px;
  font-weight: 300;
  color: #000;
  text-align: center`;
  center.appendChild(centerDesc);

  widgetPage_4.appendChild(center);

  //btncontainer
  let dateContainer = document.createElement('div');
  dateContainer.style.cssText += `padding: 10px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`;
  widgetPage_4.appendChild(dateContainer);

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
  font-weight: 400;
  background-color: #f5f6fa`;
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
  margin: 15px 0px;
  `;
  button.textContent = 'save date';
  dateContainer.appendChild(button);

  button.addEventListener('click', function () {
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
  
  display: none;
  `;
  dateContainer.appendChild(successMsg);

  /* Page 4 ends */

  /* Page 5: This page shows all the wayd to redeem points. */

  css(widgetPage_5, divClass2);
  document.body.appendChild(widgetPage_5);

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
    display: 'flex',
    alignItems: 'baseline',
    //fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', function () {
    widgetPage_5.style.display = 'none';
    // homePage.style.display = 'block';
    let sa_homePage = userId ? '#div-3' : '#div';
    $(sa_homePage).fadeIn('slow');
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText += 'font-size: 14px; margin-left: 10px;';
  span.textContent = merchant?.theme?.title; // 'Super Rewards';
  div1.appendChild(span);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;
  margin-left: auto`;
  cross.onclick = function () {
    // widgetPage_5.style.display = 'none';
    $('#div-5').fadeOut('slow');
    currentPage = '';
  };
  div1.appendChild(cross);

  css(div1, div1Class);
  widgetPage_5.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText += 'margin-top: 20px;padding: 10px;font-weight: 500;';

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
  dateBtn.id = 'coupon-btn';
  dateBtn.addEventListener('click', async function () {
    //add function call
    await getDiscountCode();
    let span = document.getElementById('discount');
    span.textContent = discountCode;
    let couponDesc = document.getElementById('discount-coupon-value');
    couponDesc.textContent = `${value3} off coupon`;
    let couponPoints = document.getElementById('discount-points-spent');
    couponPoints.textContent = `Spent ${merchant.redeemPoints} points`;
    widgetPage_5.style.display = 'none';
    // widgetPage_6.style.display = 'block';
    $('#div-6').fadeIn('slow');
    currentPage = 'div-6';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  `;
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
  dateBtn.id = 'shipping-btn';
  dateBtn.textContent = 'Redeem';
  dateBtn.addEventListener('click', async function () {
    //add function call
    await getFreeShippingCode();
    let span = document.getElementById('discount');
    span.textContent = discountCode;
    let couponDesc = document.getElementById('discount-coupon-value');
    couponDesc.textContent = `Free shipping coupon`;
    let couponPoints = document.getElementById('discount-points-spent');
    couponPoints.textContent = `Spent ${merchant.shippingPoints} points`;
    widgetPage_5.style.display = 'none';
    // widgetPage_6.style.display = 'block';
    $('#div-6').fadeIn('slow');
    currentPage = 'div-6';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  `;
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
  dateBtn.id = 'percentage-btn';
  dateBtn.textContent = 'Redeem';
  dateBtn.addEventListener('click', async function () {
    //add function call
    await getPercentageCode();
    let span = document.getElementById('discount');
    span.textContent = discountCode;
    let couponDesc = document.getElementById('discount-coupon-value');
    couponDesc.textContent = `${merchant.percentageAmt}% off coupon`;
    let couponPoints = document.getElementById('discount-points-spent');
    couponPoints.textContent = `Spent ${merchant.percentagePoints} points`;
    widgetPage_5.style.display = 'none';
    widgetPage_6.style.display = 'block';
    $('#div-6').fadeIn('slow');
    currentPage = 'div-6';
  });
  dateBtn.style.cssText += `border: none;
  border-radius: 8px;
  padding: 10px 18px;
  background-color: ${merchant.theme.color};
  color: ${merchant.theme.font};
  font-size: 12px;
  margin-left: auto;
  cursor: pointer;
  `;
  dateBtn.style.opacity =
    result.points < merchant.percentagePoints ? '40%' : '100%';
  dateBtn.disabled = result.points < merchant.percentagePoints;
  userId ? textGrp3.appendChild(dateBtn) : null;

  //--

  widgetPage_5.appendChild(center);

  //btncontainer
  btnC = document.createElement('div');
  btnC.style.cssText += 'text-align: center;';
  widgetPage_5.appendChild(btnC);

  a = document.createElement('a');
  a.href =
    `https://${SA_rewards_shopDomain}/account/register` +
    (referrer ? `?ref=${referrer}` : '');
  css(a, aClass2);
  userId ? null : btnC.appendChild(a);

  button = document.createElement('button');
  button.textContent = 'Join Now';
  a.appendChild(button);
  css(button, btnClass2);

  /* Page 5 ends */

  /* Page 6: This page will display the generated discount coupon when you click on the redeem button.*/

  css(widgetPage_6, divClass2);
  document.body.appendChild(widgetPage_6);

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
    display: 'flex',
    alignItems: 'baseline',
    //fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', function () {
    $.ajax({
      url: `${SAR_appUrl}/points/${userId}?shopDomain=${SA_rewards_shopDomain}`,
      type: 'GET',
      success: function (data) {
        // console.log('hi this is ajax');

        let couponBtn = document.getElementById('coupon-btn');
        couponBtn.style.opacity =
          data.customer.points < data.merchant.redeemPoints ? '40%' : '100%';
        couponBtn.disabled = data.customer.points < data.merchant.redeemPoints;

        let shippingBtn = document.getElementById('shipping-btn');
        shippingBtn.style.opacity =
          data.customer.points < data.merchant.shippingPoints ? '40%' : '100%';
        shippingBtn.disabled =
          data.customer.points < data.merchant.shippingPoints;

        let percentageBtn = document.getElementById('percentage-btn');
        percentageBtn.style.opacity =
          data.customer.points < data.merchant.percentagePoints
            ? '40%'
            : '100%';
        percentageBtn.disabled =
          data.customer.points < data.merchant.percentagePoints;

        let customerPoints = document.getElementById('customer-points');
        customerPoints.textContent = data.customer.points + ` points`;

        widgetPage_6.style.display = 'none';
        // widgetPage_5.style.display = 'block';
        $('#div-5').fadeIn('slow');
        currentPage = 'div-5';
      },
    });
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText += 'font-size: 14px; margin-left: 10px;';
  span.textContent = merchant?.theme?.title; // 'Super Rewards';
  div1.appendChild(span);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;
  margin-left: auto`;
  cross.onclick = function () {
    // widgetPage_6.style.display = 'none';
    $('#div-6').fadeOut('slow');
    currentPage = '';
  };
  div1.appendChild(cross);

  css(div1, div1Class);
  widgetPage_6.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText += 'margin-top: 20px;padding: 10px;font-weight: 500;';

  span = document.createElement('span');
  span.textContent = 'Discount code';
  center.appendChild(span);

  //--

  widgetPage_6.appendChild(center);
  //--ref container

  refContainer = document.createElement('div');
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);`;
  widgetPage_6.appendChild(refContainer);

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
  justify-content: center;`;
  userId ? refContainer.appendChild(refLink) : null;

  span = document.createElement('span');
  span.id = 'discount';
  span.textContent = ` ${discountCode} `;
  refLink.appendChild(span);

  copy = document.createElement('icon');
  copy.style.cssText += `font-size: 13px;margin-left: 10px;`;
  copy.classList.add('far', 'fa-clipboard');
  copy.addEventListener('click', function (event) {
    document.execCommand('copy');
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener('copy', function (event) {
    event.preventDefault();
    let span = document.getElementById('discount');
    if (event.clipboardData) {
      event.clipboardData.setData('text/plain', span.textContent);
    }
  });
  refLink.appendChild(copy);

  /* Page 6 ends */

  /* Page 7: This page shows the list of all available coupon codes.*/

  css(widgetPage_7, divClass);
  document.body.appendChild(widgetPage_7);

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
    display: 'flex',
    alignItems: 'baseline',
    //fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', function () {
    widgetPage_7.style.display = 'none';
    // homePage.style.display = 'block';
    let sa_homePage = userId ? '#div-3' : '#div';
    $(sa_homePage).fadeIn('slow');
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon.style.color = merchant.theme.font;
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  span.style.cssText += 'font-size: 14px; margin-left: 10px;';
  span.textContent = merchant?.theme?.title; // 'Super Rewards';
  div1.appendChild(span);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;
  margin-left: auto`;
  cross.onclick = function () {
    // widgetPage_7.style.display = 'none';
    $('#div-7').fadeOut('slow');
    currentPage = '';
  };
  div1.appendChild(cross);

  css(div1, div1Class);
  widgetPage_7.appendChild(div1);

  //center
  center = document.createElement('div');
  center.style.cssText += 'margin-top: 20px;padding: 10px;font-weight: 500;';

  span = document.createElement('span');
  span.textContent = 'Your Coupons';
  codes.length !== 0 && center.appendChild(span);

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
    copy.addEventListener('click', function (event) {
      document.execCommand('copy');
      event.target.style.cssText += `color: black;
    font-size: 15px;`;
    });
    copy.addEventListener('copy', function (event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData('text/plain', codeObj.code);
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
  
  `;
  imgContainer.appendChild(noRewardsText);

  widgetPage_7.appendChild(center);

  /*Page 7 ends*/

  /* Page 8: This page is to display social sharing options */

  css(widgetPage_8, divClass2);
  document.body.appendChild(widgetPage_8);

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
    display: 'flex',
    alignItems: 'baseline',
    //fontFamily: 'Roboto',
  };

  icon = document.createElement('i');
  icon.addEventListener('click', function () {
    widgetPage_8.style.display = 'none';
    // homePage.style.display = 'block';
    let sa_homePage = userId ? '#div-3' : '#div';
    $(sa_homePage).fadeIn('slow');
  });
  icon.style.fontSize = '16px';
  icon.style.cursor = 'pointer';
  icon, (style = merchant.theme.font);
  icon.classList.add('fas', 'fa-angle-left');
  div1.appendChild(icon);

  span = document.createElement('span');
  //font-roboto
  span.style.cssText += 'font-size: 14px; margin-left: 10px;';
  span.textContent = merchant?.theme?.title; // 'Super Rewards';
  div1.appendChild(span);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: ${merchant.theme.font};
  font-size:12px;
  cursor: pointer;
  margin-left: auto`;
  cross.onclick = function () {
    // widgetPage_8.style.display = 'none';
    $('#div-8').fadeOut('slow');
    currentPage = '';
  };
  div1.appendChild(cross);

  css(div1, div1Class);
  widgetPage_8.appendChild(div1);

  //-- social sharing card

  refContainer = document.createElement('div');
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-top:25px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;`;
  widgetPage_8.appendChild(refContainer);

  let reward_img = document.createElement('img');
  reward_img.src = `https://res.cloudinary.com/dl3nzdely/image/upload/v1626161385/gift-img_v4kmed.jpg`;
  reward_img.alt = `reward_img`;
  reward_img.style.cssText += `
  width:60px;`;
  refContainer.appendChild(reward_img);

  let social_p1 = document.createElement('p');
  social_p1.textContent =
    merchant.referralNudge.title || 'Refer friends and get rewarded';
  social_p1.style.cssText += `
  font-size: 14px;
  color:#000;
  font-weight: 500;
  margin:8px 0px;
  text-align: center`;
  refContainer.appendChild(social_p1);

  let social_p2 = document.createElement('span');
  social_p2.textContent =
    merchant.referralNudge.desc ||
    `Share this link to give your friends ${referralMessage}. We'll send you ${referralMessage_advocate}
  when they make a purchase.`;
  social_p2.style.cssText += `
  font-size: 11px;
  text-align: center;
  margin:8px 0px;
  font-weight:300;`;
  refContainer.appendChild(social_p2);

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
  justify-content: center;`;
  userId ? refContainer.appendChild(refLink) : null;

  span = document.createElement('span');
  span.textContent = `https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  span.style.textAlign = 'left';
  refLink.appendChild(span);

  copy = document.createElement('icon');
  copy.style.cssText += `font-size: 13px;margin-left: 10px;`;
  copy.classList.add('far', 'fa-clipboard');
  copy.addEventListener('click', function (event) {
    document.execCommand('copy');
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener('copy', function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData(
        'text/plain',
        `https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`
      );
    }
  });
  refLink.appendChild(copy);

  let socialIconsContainer = document.createElement('div');
  socialIconsContainer.style.cssText += `
  display:flex;
  justify-content:center;
  align-items: center;
  width:100%;
  margin-top:12px;`;
  refContainer.appendChild(socialIconsContainer);

  let iconLink_f = document.createElement('a');
  iconLink_f.href = `https://facebook.com/sharer/sharer.php?u=https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  iconLink_f.target = '_blank';
  iconLink_f.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_f);

  let icon_f = document.createElement('i');
  icon_f.classList.add('fab', 'fa-facebook-square');
  icon_f.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_f.appendChild(icon_f);

  let iconLink_t = document.createElement('a');
  iconLink_t.href = `https://twitter.com/share?text=Visit ${merchant.name} using my link and get a special coupon.
  &url=https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  iconLink_t.target = '_blank';
  iconLink_t.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_t);

  let icon_t = document.createElement('i');
  icon_t.classList.add('fab', 'fa-twitter');
  icon_t.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_t.appendChild(icon_t);

  let iconLink_w = document.createElement('a');
  iconLink_w.href = `https://wa.me?text=Visit ${merchant.name} using my link and get a special coupon. https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  iconLink_w.target = '_blank';
  iconLink_w.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_w);

  let icon_w = document.createElement('i');
  icon_w.classList.add('fab', 'fa-whatsapp-square');
  icon_w.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_w.appendChild(icon_w);

  // social sharing --//

  /* Page 8 ends */

  /* set timeout nudge */
  //-- social sharing card

  refContainer = document.createElement('div');
  refContainer.id = 'social-sharing';
  refContainer.style.cssText += `padding: 18px;
  border-radius: 8px;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin-top:25px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  position:fixed;
  bottom:50px;
  right: 50px;
  z-index:1000;
  width: 300px;
  display:none;`;
  document.body.appendChild(refContainer);

  cross = document.createElement('i');
  cross.classList.add('fas', 'fa-times');
  cross.style.cssText += `
  color: #777474;
  font-size:12px;
  cursor: pointer;
  align-self:flex-end;`;
  cross.onclick = function () {
    let box = document.getElementById('social-sharing');
    // box.style.display = 'none';
    $('#social-sharing').fadeOut('slow');
    localStorage.setItem('sa_nudge_shown', 'true');
  };
  refContainer.appendChild(cross);

  reward_img = document.createElement('img');
  reward_img.src = `https://res.cloudinary.com/dl3nzdely/image/upload/v1626161385/gift-img_v4kmed.jpg`;
  reward_img.alt = `reward_img`;
  reward_img.style.cssText += `
  width:60px;`;
  refContainer.appendChild(reward_img);

  social_p1 = document.createElement('p');
  social_p1.textContent =
    merchant.referralNudge.title || 'Refer friends and get rewarded';
  social_p1.style.cssText += `
  font-size: 14px;
  color:#000;
  font-weight: 500;
  margin:8px 0px;
  text-align: center`;
  refContainer.appendChild(social_p1);

  social_p2 = document.createElement('span');
  social_p2.textContent =
    merchant.referralNudge.desc ||
    `Share this link to give your friends ${referralMessage}. We'll send you ${referralMessage_advocate}
  when they make a purchase.`;
  social_p2.style.cssText += `
  font-size: 11px;
  text-align: center;
  margin:8px 0px;
  font-weight:300;`;
  refContainer.appendChild(social_p2);

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
  justify-content: center;`;
  userId ? refContainer.appendChild(refLink) : null;

  span = document.createElement('span');
  span.textContent = `https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  span.style.textAlign = 'left';
  refLink.appendChild(span);

  copy = document.createElement('icon');
  copy.style.cssText += `font-size: 13px;margin-left: 10px;`;
  copy.classList.add('far', 'fa-clipboard');
  copy.addEventListener('click', function (event) {
    document.execCommand('copy');
    event.target.style.cssText += `color: black;
    font-size: 15px;`;
  });
  copy.addEventListener('copy', function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData(
        'text/plain',
        `https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`
      );
    }
  });
  refLink.appendChild(copy);

  socialIconsContainer = document.createElement('div');
  socialIconsContainer.style.cssText += `
  display:flex;
  justify-content:center;
  align-items: center;
  width:100%;
  margin-top:12px;`;
  refContainer.appendChild(socialIconsContainer);

  iconLink_f = document.createElement('a');
  iconLink_f.href = `https://facebook.com/sharer/sharer.php?u=https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  iconLink_f.target = '_blank';
  iconLink_f.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_f);

  icon_f = document.createElement('i');
  icon_f.classList.add('fab', 'fa-facebook-square');
  icon_f.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_f.appendChild(icon_f);

  iconLink_t = document.createElement('a');
  iconLink_t.href = `https://twitter.com/share?text=Visit ${merchant.name} using my link and get a special coupon.
  &url=https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  iconLink_t.target = '_blank';
  iconLink_t.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_t);

  icon_t = document.createElement('i');
  icon_t.classList.add('fab', 'fa-twitter');
  icon_t.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_t.appendChild(icon_t);

  iconLink_w = document.createElement('a');
  iconLink_w.href = `https://wa.me?text=Visit ${merchant.name} using my link and get a special coupon. https://${SA_rewards_shopDomain}/?ref=${result.referralCode}`;
  iconLink_w.target = '_blank';
  iconLink_w.style.cssText += `
  text-decoration:none;
  margin: 0px 15px;`;
  socialIconsContainer.appendChild(iconLink_w);

  icon_w = document.createElement('i');
  icon_w.classList.add('fab', 'fa-whatsapp-square');
  icon_w.style.cssText += `
  color:#000;
  font-size:18px;`;
  iconLink_w.appendChild(icon_w);

  let nudgeTimeout;
  if (merchant.referralNudgeTime === 'instant') {
    nudgeTimeout = 1000;
  } else {
    nudgeTimeout = parseInt(merchant.referralNudgeTime)
      ? parseInt(merchant.referralNudgeTime) * 1000
      : 1000;
  }

  let showNudgeOnPage;
  if (merchant.referralNudge.pages === 'all') {
    showNudgeOnPage = userId && true;
  } else {
    showNudgeOnPage = Shopify.Checkout !== undefined;
  }

  let showNudge = localStorage.getItem('sa_nudge_shown')
    ? !JSON.parse(localStorage.getItem('sa_nudge_shown'))
    : true;

  merchant.isReferralsActive &&
    showNudge &&
    showNudgeOnPage &&
    setTimeout(function () {
      let box = document.getElementById('social-sharing');
      box.style.display = 'flex';
    }, nudgeTimeout);
};

appendWidget();
