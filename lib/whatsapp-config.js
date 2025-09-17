const PHONE_NUMBER_ID = "716301431576675";
const ACCESS_TOKEN = "EAAPKEBmoa4kBPVQDHZBaXSHQrgfPARPOWimuDqMHRhEnB7HDFIMBNuRcIb7obhcZCVcZAbZCeldUcrFrZCXV4lfYAIrqxcO23xEgDwdIn8f9SyZAuy5wEW0Dlgz63rlxMZCc5zZATkq6h2TyZB46gT6gI6N34w71HIUXVKk2ZCmdGNZAwYWqhxItvvZBmH0Iu9gX02jMrAZDZD";  // ← Replace with your real access token
const GRAPH_API_VERSION = "v22.0";

// Predefined Chef and Manager phone numbers
const toChef = "919505564388";     // Replace with actual chef number
const toManager = "919505564388";  // Replace with actual manager number

async function sendMessage(payload) {
  const out = document.getElementById("output"); // Optional: for debugging
  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );
    const data = await response.json();
    out.textContent += JSON.stringify(data, null, 2) + '\n\n';
  } catch (err) {
    out.textContent += "Error: " + err.message + '\n\n';
  }
}

function generateOrderId() {
  return 'ORD-' + Date.now();
}

function getCurrentDateTime() {
  return new Date().toLocaleString();
}

function getCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.map(item => ({
    title: item.title,
    size: item.size || 'Standard Size',
    vegToppings: item.vegToppings || [],
    nonVegToppings: item.nonVegToppings || [],
    price: parseInt(item.price.replace('₹', '')),
    qty: item.qty
  }));
}

async function sendOrderNotifications(orderId, dateTime, customerDetails, cartItems) {
  const toCustomer = customerDetails.phone;

  let totalPrice = 0;
  let itemDetails = '';

  cartItems.forEach(item => {
    const itemTotal = item.price * item.qty;

    let vegToppings = item.vegToppings.length > 0
      ? item.vegToppings.map(t => `${t.name} (₹${t.price})`).join(', ')
      : 'No Veg Toppings';

    let nonVegToppings = item.nonVegToppings.length > 0
      ? item.nonVegToppings.map(t => `${t.name} (₹${t.price})`).join(', ')
      : 'No Non-Veg Toppings';

    itemDetails += `- ${item.title} (${item.size})\n  Veg Toppings: ${vegToppings}\n  Non-Veg Toppings: ${nonVegToppings}\n  Price: ₹${item.price} x ${item.qty} = ₹${itemTotal}\n\n`;

    totalPrice += itemTotal;
  });

  const receiptBody = `🍕 *Pizza Order Receipt*\n\nOrder ID: ${orderId}\nDate & Time: ${dateTime}\n\n👤 Customer: ${customerDetails.name}\n🏠 Address: ${customerDetails.address}\n📱 Phone: ${customerDetails.phone}\n\n🧾 Items Ordered:\n${itemDetails}*Total: ₹${totalPrice}*\n\nThank you for ordering! Visit again!`;

  const notificationBody = `📢 *New Order Notification*\n\nOrder ID: ${orderId}\nDate & Time: ${dateTime}\n\n👤 Customer: ${customerDetails.name}\n🏠 Address: ${customerDetails.address}\n📱 Phone: ${customerDetails.phone}\n\n🧾 Items Ordered:\n${itemDetails}*Total: ₹${totalPrice}*\n\nPlease prepare ASAP! 🍕`;

  const payloads = [
    { messaging_product: "whatsapp", to: toCustomer, type: "text", text: { body: receiptBody } },
    { messaging_product: "whatsapp", to: toChef, type: "text", text: { body: notificationBody } },
    { messaging_product: "whatsapp", to: toManager, type: "text", text: { body: notificationBody } }
  ];

  payloads.forEach(payload => sendMessage(payload));
}
