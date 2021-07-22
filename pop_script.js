console.log('Superassistant script loaded');

const SA_APP_URL = 'https://3fdffa49b719.ngrok.io';

const SA_Shop_Domain = Shopify.shop;
// const SA_Shop_Domain = 'super-pops-test.myshopify.com';

const LIVE_VISIT_DELAY = 0.1; //in hours (6 min)
const RECENT_VISIT_DELAY = 24; //in hours

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
  } catch (error) {
    console.log(error);
  }
};

const checkCart = async function () {
  try {
    const response = await fetch(`https://${SA_Shop_Domain}/cart.js`);
    const data = await response.json();
    const location = localStorage.getItem('superAssistant-ipInfo');
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

      if (product.id !== parseInt(localStorage.getItem('SA_last_product_added'))) {
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

let leave = new Date(localStorage.getItem('SuperAssistant-leaveTimestamp'));
let current = new Date();

console.log(
  'Visit after ',
  (current.valueOf() - leave.valueOf()) / 1000,
  ' seconds'
);

if (leave) {
  if (
    (current.valueOf() - leave.valueOf()) / (1000 * 60 * 60) >
    LIVE_VISIT_DELAY
  ) {
    newLiveVisit(current);
  }

  if (
    (current.valueOf() - leave.valueOf()) / (1000 * 60 * 60) >
    RECENT_VISIT_DELAY
  ) {
    newRecentVisit(current);
  }
} else {
  newLiveVisit(current);
  newRecentVisit(current);
}

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
