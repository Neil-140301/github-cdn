console.log('Superassistant script loaded');
/* Backend Url */
const SA_APP_URL = 'https://656202a9ab3d.ngrok.io';

/*fontawesome script*/
let SA_script = document.createElement('script');
SA_script.src = 'https://kit.fontawesome.com/ccca1edeec.js';
SA_script.crossOrigin = 'anonymous';
document.body.appendChild(SA_script);

/*jquery script*/
SA_script = document.createElement('script');
SA_script.src =
  'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
SA_script.crossOrigin = 'anonymous';
document.head.appendChild(SA_script);

SA_script = document.createElement('script');
SA_script.src = 'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js';
SA_script.crossOrigin = 'anonymous';
document.head.appendChild(SA_script);

/* location script */
function callback(data) {
  localStorage.setItem('superAssistant-ipInfo', JSON.stringify(data));
  customerInfo = data;
  console.log(data);
}

var super_assistant_push_script_2 = document.createElement('script');
super_assistant_push_script_2.type = 'text/javascript';
super_assistant_push_script_2.src = 'https://geolocation-db.com/jsonp';
var h = document.getElementsByTagName('script')[0];
h.parentNode.insertBefore(super_assistant_push_script_2, h);

/* roboto font */
let SA_link = document.createElement('link');
SA_link.href =
  'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap';
SA_link.rel = 'stylesheet';
document.head.appendChild(SA_link);

const SA_Shop_Domain = Shopify.shop;
const SA_product_id = meta.product.id;
// const SA_Shop_Domain = 'super-pops-test.myshopify.com';
// let SA_product_id = 40190205591749;

const LIVE_VISIT_DELAY = 0.1; //in hours (6 min)
const RECENT_VISIT_DELAY = 24; //in hours

const newLiveVisit = async function (time) {
  console.log('new live visit at ' + time);
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        shopDomain: SA_Shop_Domain,
        currentVisit: time,
      }),
    };
    await fetch(`${SA_APP_URL}/api/popData/live-visits`, options);
  } catch (error) {
    console.log(error);
  }
};

const newRecentVisit = async function (time) {
  console.log('new Recent visit at ' + time);
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        shopDomain: SA_Shop_Domain,
        currentVisit: time,
      }),
    };
    await fetch(`${SA_APP_URL}/api/popData/recent-visits`, options);
  } catch (error) {
    console.log(error);
  }
};

const getLiveVisits = async function () {
  try {
    const response = await fetch(
      `${SA_APP_URL}/api/popData/live-visits/${SA_Shop_Domain}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRecentVisits = async function () {
  try {
    const response = await fetch(
      `${SA_APP_URL}/api/popData/recent-visits/${SA_Shop_Domain}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderPops = async function () {
  try {
    const response = await fetch(
      `${SA_APP_URL}/api/popData/orders/${SA_Shop_Domain}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAddToCartPops = async function () {
  try {
    const response = await fetch(
      `${SA_APP_URL}/api/popData/add-to-carts/${SA_Shop_Domain}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getLatestPopData = async function () {
  try {
    const response = await fetch(`${SA_APP_URL}/api/popData/${SA_Shop_Domain}`);
    const data = await response.json();
    console.log(data);
    localStorage.setItem('SA_latest_popData', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const checkCart = async function () {
  try {
    const response = await fetch(`https://${SA_Shop_Domain}/cart.js`);
    const data = await response.json();
    const location = JSON.parse(localStorage.getItem('superAssistant-ipInfo'));
    let customer = {};

    if (data.items.length > 0) {
      //check for customer
      if (meta.page.customerId) {
        customer = { id: meta.page.customerId, tag: 'shopify' };
      } else {
        let newId = localStorage.getItem('SA_customer_temp_id')
          ? localStorage.getItem('SA_customer_temp_id')
          : Date.now();
        localStorage.setItem('SA_customer_temp_id', newId);
        customer = { id: newId, tag: 'temporary' };
      }

      let product = data.items[0];

      if (
        product.id !== parseInt(localStorage.getItem('SA_last_product_added'))
      ) {
        console.log('sending data...');
        let payload = {
          shopDomain: SA_Shop_Domain,
          location: {
            country: location.country_name,
            city: location.city,
            province: location.state,
          },
          customer: customer,
          product: {
            id: product.id,
            title: product.title,
            added_at: new Date(),
          },
        };

        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        };

        await fetch(`${SA_APP_URL}/api/popData/add-to-carts`, options);

        localStorage.setItem('SA_last_product_added', product.id);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getMerchantDetails = async function () {
  try {
    const response = await fetch(
      `${SA_APP_URL}/api/merchant/settings/${SA_Shop_Domain}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

let leave = new Date(localStorage.getItem('SuperAssistant-leaveTimestamp'));
let current = new Date();

console.log(
  'Visit after ',
  (current.valueOf() - leave.valueOf()) / 1000,
  ' seconds'
);

window.onbeforeunload = () => {
  localStorage.setItem('SuperAssistant-leaveTimestamp', new Date());
};

setInterval(checkCart, 2000);

if (localStorage.getItem('SA_customer_temp_id') && meta.page.customerId) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      shopDomain: SA_Shop_Domain,
      tempId: localStorage.getItem('SA_customer_temp_id'),
      shopifyId: meta.page.customerId,
    }),
  };

  fetch(`${SA_APP_URL}/api/popData/update-ids`, options)
    .then(() => console.log('success'))
    .catch((err) => console.log(err));

  localStorage.removeItem('SA_customer_temp_id');
}

/* create pop ui */
const createLiveVisitorPop = function (count, settings) {
  let topMessage = settings.popContent.top;
  topMessage = topMessage.replace(/{{live_visitors}}/g, count);

  let pop = document.createElement('div');
  pop.id = 'live-pop-1';
  pop.style.cssText += `padding: 12px;
  border-radius: ${settings.borderRadius}px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  background-color: ${settings.colors.backgroundColor};
  border: #e5e5e5 solid 1px;
  min-width: 320px;`;

  let popIcon = document.createElement('div');
  popIcon.style.cssText += `border-radius: 50%;
  background-color: #555;
  color: white;
  padding: 16px;`;
  pop.appendChild(popIcon);

  let i = document.createElement('i');
  i.classList.add('fas', 'fa-project-diagram');
  popIcon.appendChild(i);

  let popText = document.createElement('div');
  popText.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  font-size: 12px;
  color: ${settings.colors.textColor}`;
  pop.appendChild(popText);

  let popTextMain = document.createElement('span');
  popTextMain.style.cssText += `font-weight: bold;`;
  popTextMain.textContent = topMessage;
  popText.appendChild(popTextMain);

  let popTextSub = document.createElement('span');
  popTextSub.textContent = settings.popContent.bottom;
  popText.appendChild(popTextSub);

  return pop;
};

const createRecentVisitorPop = function (count, settings) {
  let topMessage = settings.popContent.top;
  topMessage = topMessage.replace(/{{recent_visitors}}/g, count);

  let pop = document.createElement('div');
  pop.style.cssText += `padding: 12px;
  border-radius: ${settings.borderRadius}px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  background-color: ${settings.colors.backgroundColor};
  border: #e5e5e5 solid 1px;
  min-width: 320px;`;

  let popIcon = document.createElement('div');
  popIcon.style.cssText += `border-radius: 50%;
  background-color: #555;
  color: white;
  padding: 16px;`;
  pop.appendChild(popIcon);

  let i = document.createElement('i');
  i.classList.add('fas', 'fa-user-friends');
  popIcon.appendChild(i);

  let popText = document.createElement('div');
  popText.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  font-size: 12px;
  color: ${settings.colors.textColor}`;
  pop.appendChild(popText);

  let popTextMain = document.createElement('span');
  popTextMain.style.cssText += `font-weight: bold;`;
  popTextMain.textContent = topMessage;
  popText.appendChild(popTextMain);

  let popTextSub = document.createElement('span');
  popTextSub.textContent = settings.popContent.bottom;
  popText.appendChild(popTextSub);

  return pop;
};

const createAddToCartsPop = function (
  firstName,
  location,
  productTitle,
  settings
) {
  let { anonymizer } = settings;

  let personName = anonymizer.status ? anonymizer.name : firstName;
  let city = location.city !== null ? location.city : '';
  let province = location.province !== null ? location.province : '';

  let topMessage = settings.popContent.top;
  topMessage = topMessage.replace(/{{first_name}}/g, personName);
  topMessage = topMessage.replace(/{{city}}/g, city);
  topMessage = topMessage.replace(/{{province}}/g, province);
  topMessage = topMessage.replace(/{{country}}/g, location.country);

  let bottomMessage = settings.popContent.bottom;
  bottomMessage = bottomMessage.replace(/{{product_title}}/g, productTitle);

  let pop = document.createElement('div');
  pop.style.cssText += `padding: 12px;
  border-radius: ${settings.borderRadius}px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  background-color: ${settings.colors.backgroundColor};
  border: #e5e5e5 solid 1px;
  min-width: 320px;`;

  let popIcon = document.createElement('div');
  popIcon.style.cssText += `border-radius: 50%;
  background-color: #555;
  color: white;
  padding: 16px;`;
  pop.appendChild(popIcon);

  let i = document.createElement('i');
  i.classList.add('fas', 'fa-cart-plus');
  popIcon.appendChild(i);

  let popText = document.createElement('div');
  popText.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  font-size: 12px;
  color: ${settings.colors.textColor}`;
  pop.appendChild(popText);

  let popTextMain = document.createElement('span');
  popTextMain.style.cssText += `font-weight: bold;`;
  popTextMain.textContent = topMessage;
  popText.appendChild(popTextMain);

  let popTextSub = document.createElement('span');
  popTextSub.textContent = bottomMessage;
  popText.appendChild(popTextSub);

  return pop;
};

const createOrdersPop = function (firstName, location, productTitle, settings) {
  let { anonymizer } = settings;

  let personName = anonymizer.status ? anonymizer.name : firstName;
  let city = location.city !== null ? location.city : '';
  let province = location.province !== null ? location.province : '';

  let topMessage = settings.popContent.top;
  topMessage = topMessage.replace(/{{first_name}}/g, personName);
  topMessage = topMessage.replace(/{{city}}/g, city);
  topMessage = topMessage.replace(/{{province}}/g, province);
  topMessage = topMessage.replace(/{{country}}/g, location.country);

  let bottomMessage = settings.popContent.bottom;
  bottomMessage = bottomMessage.replace(/{{product_title}}/g, productTitle);

  let pop = document.createElement('div');
  pop.style.cssText += `padding: 12px;
  border-radius: ${settings.borderRadius}px;
  display: flex;
  align-items: center;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  background-color: ${settings.colors.backgroundColor};
  border: #e5e5e5 solid 1px;
  min-width: 320px;`;

  let popIcon = document.createElement('div');
  popIcon.style.cssText += `border-radius: 50%;
  background-color: #555;
  color: white;
  padding: 16px;`;
  pop.appendChild(popIcon);

  let i = document.createElement('i');
  i.classList.add('fas', 'fa-box-open');
  popIcon.appendChild(i);

  let popText = document.createElement('div');
  popText.style.cssText += `display: flex;
  flex-direction: column;
  margin-left: 15px;
  font-size: 12px;
  color: ${settings.colors.textColor}`;
  pop.appendChild(popText);

  let popTextMain = document.createElement('span');
  popTextMain.style.cssText += `font-weight: bold;`;
  popTextMain.textContent = topMessage;
  popText.appendChild(popTextMain);

  let popTextSub = document.createElement('span');
  popTextSub.textContent = bottomMessage;
  popText.appendChild(popTextSub);

  return pop;
};

/* */
const firstTierPop = function (merchant, liveVisits, recentVisits) {
  const { lastHour, last6Hour, last24Hour, last48Hour, lastWeek } = JSON.parse(
    localStorage.getItem('SA_latest_popData')
  );

  console.log('first tier pop');

  let orderPop =
    lastHour.orders.pop() ||
    last6Hour.orders.pop() ||
    last24Hour.orders.pop() ||
    last48Hour.orders.pop() ||
    lastWeek.orders.pop();

  if (orderPop) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createOrdersPop(
      orderPop.firstName,
      orderPop.location,
      orderPop.order.products[0].title,
      merchant.orders
    );
  }

  let addToCartsPop =
    lastHour.addToCarts.pop() ||
    last6Hour.addToCarts.pop() ||
    last24Hour.addToCarts.pop() ||
    last48Hour.addToCarts.pop() ||
    lastWeek.addToCarts.pop();

  if (addToCartsPop) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createAddToCartsPop(
      addToCartsPop.firstName,
      addToCartsPop.location,
      addToCartsPop.product.title,
      merchant.addToCarts
    );
  }

  if (liveVisits > 0) {
    return createLiveVisitorPop(liveVisits, merchant.liveVisitors);
  }

  if (recentVisits > 0) {
    return createRecentVisitorPop(recentVisits, merchant.recentVisitors);
  }
};

const secondTierPop = function (merchant, liveVisits, recentVisits) {
  const { lastHour, last6Hour, last24Hour, last48Hour, lastWeek } = JSON.parse(
    localStorage.getItem('SA_latest_popData')
  );

  console.log('second tier pop');

  if (liveVisits > 0) {
    return createLiveVisitorPop(liveVisits, merchant.liveVisitors);
  }

  let addToCartsPop =
    lastHour.addToCarts.pop() ||
    last6Hour.addToCarts.pop() ||
    last24Hour.addToCarts.pop() ||
    last48Hour.addToCarts.pop() ||
    lastWeek.addToCarts.pop();

  if (addToCartsPop) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createAddToCartsPop(
      addToCartsPop.firstName,
      addToCartsPop.location,
      addToCartsPop.product.title,
      merchant.addToCarts
    );
  }

  let orderPop =
    lastHour.orders.pop() ||
    last6Hour.orders.pop() ||
    last24Hour.orders.pop() ||
    last48Hour.orders.pop() ||
    lastWeek.orders.pop();

  if (orderPop) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createOrdersPop(
      orderPop.firstName,
      orderPop.location,
      orderPop.order.products[0].title,
      merchant.orders
    );
  }

  if (recentVisits > 0) {
    return createRecentVisitorPop(recentVisits, merchant.recentVisitors);
  }
};

const searchProductFromOrder = function (i, idx, arr) {
  let order = i.order.products.find((p) => p.id === SA_product_id);
  if (order) {
    arr.splice(idx, 1);
    return true;
  }
};

const searchProductFromAddToCart = function (i, idx, arr) {
  let product = i.product.productId === SA_product_id;
  if (product) {
    arr.splice(idx, 1);
    return true;
  }
};

const productTierPop = function (merchant, liveVisits, recentVisits) {
  const { lastHour, last6Hour, last24Hour, last48Hour, lastWeek } = JSON.parse(
    localStorage.getItem('SA_latest_popData')
  );
  console.log('')

  let productOrder =
    lastHour.orders.find(searchProductFromOrder) ||
    last6Hour.orders.find(searchProductFromOrder) ||
    last24Hour.orders.find(searchProductFromOrder) ||
    last48Hour.orders.find(searchProductFromOrder) ||
    lastWeek.orders.find(searchProductFromOrder);

  if (productOrder) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createOrdersPop(
      productOrder.firstName,
      productOrder.location,
      productOrder.order.products.find((p) => p.id === SA_product_id).title,
      merchant.orders
    );
  }

  let productAddToCart =
    lastHour.addToCarts.find(searchProductFromAddToCart) ||
    last6Hour.addToCarts.find(searchProductFromAddToCart) ||
    last24Hour.addToCarts.find(searchProductFromAddToCart) ||
    last48Hour.addToCarts.find(searchProductFromAddToCart) ||
    lastWeek.addToCarts.find(searchProductFromAddToCart);

  if (productAddToCart) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createAddToCartsPop(
      productAddToCart.firstName,
      productAddToCart.location,
      productAddToCart.product.title,
      merchant.addToCarts
    );
  }

  if (liveVisits > 0) {
    return createLiveVisitorPop(liveVisits, merchant.liveVisitors);
  }

  if (recentVisits > 0) {
    return createRecentVisitorPop(recentVisits, merchant.recentVisitors);
  }
};

const productSecondTierPop = function (merchant, liveVisits, recentVisits) {
  const { lastHour, last6Hour, last24Hour, last48Hour, lastWeek } = JSON.parse(
    localStorage.getItem('SA_latest_popData')
  );

  if (liveVisits > 0) {
    return createLiveVisitorPop(liveVisits, merchant.liveVisitors);
  }

  let productAddToCart =
    lastHour.addToCarts.find(searchProductFromAddToCart) ||
    last6Hour.addToCarts.find(searchProductFromAddToCart) ||
    last24Hour.addToCarts.find(searchProductFromAddToCart) ||
    last48Hour.addToCarts.find(searchProductFromAddToCart) ||
    lastWeek.addToCarts.find(searchProductFromAddToCart);

  if (productAddToCart) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createAddToCartsPop(
      productAddToCart.firstName,
      productAddToCart.location,
      productAddToCart.product.title,
      merchant.addToCarts
    );
  }

  let productOrder =
    lastHour.orders.find(searchProductFromOrder) ||
    last6Hour.orders.find(searchProductFromOrder) ||
    last24Hour.orders.find(searchProductFromOrder) ||
    last48Hour.orders.find(searchProductFromOrder) ||
    lastWeek.orders.find(searchProductFromOrder);

  if (productOrder) {
    localStorage.setItem(
      'SA_latest_popData',
      JSON.stringify({ lastHour, last6Hour, last24Hour, last48Hour, lastWeek })
    );
    return createOrdersPop(
      productOrder.firstName,
      productOrder.location,
      productOrder.order.products.find((p) => p.id === SA_product_id).title,
      merchant.orders
    );
  }

  if (recentVisits > 0) {
    return createRecentVisitorPop(recentVisits, merchant.recentVisitors);
  }
};

/* main function */
const renderSAPops = async function () {
  const liveVisits = await getLiveVisits();
  const recentVisits = await getRecentVisits();
  const merchant = await getMerchantDetails();
  await getLatestPopData();

  /* Tracking the customer's visits */
  if (leave) {
    if (
      (current.valueOf() - leave.valueOf()) / (1000 * 60 * 60) >
      LIVE_VISIT_DELAY
    ) {
      newLiveVisit(current);
      await getLatestPopData();
    }

    if (
      (current.valueOf() - leave.valueOf()) / (1000 * 60 * 60) >
      RECENT_VISIT_DELAY
    ) {
      newRecentVisit(current);
      await getLatestPopData();
    }
  } else {
    newLiveVisit(current);
    newRecentVisit(current);
    await getLatestPopData();
  }

  /*Pop container */
  let SA_pop_container = document.createElement('div');
  SA_pop_container.style.cssText += `border: #e5e5e5 solid 1px;
  height: 100px;
  position: absolute;
  top: 20px;
  right: 20px;
  font-family: 'Roboto';
  display: none;`;
  SA_pop_container.id = 'SA_pop_container';
  document.body.appendChild(SA_pop_container);

  let newPop;
  const pops_per_session = 5;
  const firstTier = 2;
  const secondTier = 2;
  let popCount = 0;

  let intervalId = setInterval(function () {
    popCount++;
    console.log(popCount);

    $('#SA_pop_container').empty();

    if (SA_product_id) {
      if (popCount <= firstTier) {
        newPop = productTierPop(merchant, liveVisits.count, recentVisits.count);
      }

      if (firstTier < popCount && popCount <= firstTier + secondTier) {
        newPop = productSecondTierPop(
          merchant,
          liveVisits.count,
          recentVisits.count
        );
      }

      if (firstTier + secondTier < popCount && popCount <= pops_per_session) {
        newPop = productTierPop(merchant, liveVisits.count, recentVisits.count);
      }
    } else {
      if (popCount <= firstTier) {
        newPop = firstTierPop(merchant, liveVisits.count, recentVisits.count);
      }

      if (firstTier < popCount && popCount <= firstTier + secondTier) {
        newPop = secondTierPop(merchant, liveVisits.count, recentVisits.count);
      }

      if (firstTier + secondTier < popCount && popCount <= pops_per_session) {
        newPop = firstTierPop(merchant, liveVisits.count, recentVisits.count);
      }
    }

    document.getElementById('SA_pop_container').appendChild(newPop);
    $('#SA_pop_container').fadeIn('slow');
    setTimeout(function () {
      $('#SA_pop_container').fadeOut('slow');
    }, 4000);

    if (popCount === pops_per_session) {
      clearInterval(intervalId);
      setTimeout(function () {
        $('#SA_pop_container').fadeOut('slow');
      }, 8000);
    }
  }, 8000);
};

renderSAPops();
