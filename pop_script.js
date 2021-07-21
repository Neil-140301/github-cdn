console.log('Superassistant script loaded');

const SA_APP_URL = 'https://81a35f753a15.ngrok.io';

const SA_Shop_Domain = 'super-pops-test.myshopify.com';

const LIVE_VISIT_DELAY = 0.00833333; //0.1; //in hours (6 min)
const RECENT_VISIT_DELAY = 0.01666667; //24; //in hours

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
    if (data.items.length > 0) {
      let payload = {
        shopDomain: SA_Shop_Domain,
        city: location.city,
        province: location.state,
        country: location.country_name,
        customer: {id: 123}
      }
    }
  } catch (error) {
    console.log(error)
  }
}

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

getLiveVisits();
getRecentVisits();

checkCart()
