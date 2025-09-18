const PHONE_NUMBER_ID = "716301431576675";
const ACCESS_TOKEN = "EAAPKEBmoa4kBPVQDHZBaXSHQrgfPARPOWimuDqMHRhEnB7HDFIMBNuRcIb7obhcZCVcZAbZCeldUcrFrZCXV4lfYAIrqxcO23xEgDwdIn8f9SyZAuy5wEW0Dlgz63rlxMZCc5zZATkq6h2TyZB46gT6gI6N34w71HIUXVKk2ZCmdGNZAwYWqhxItvvZBmH0Iu9gX02jMrAZDZD";
const GRAPH_API_VERSION = "v22.0";

// Predefined Chef and Manager phone numbers
const toChef = "919505564388";     // Chef's phone number
const toManager = "919505564388";  // Manager's phone number

async function sendMessage(payload) {
  const out = document.getElementById("output");
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
    qty: item.qty,
    price: parseInt(item.price.replace('₹', ''))
  }));
}

async function sendOrderNotifications(orderId, dateTime, customerDetails, cartItems) {
  const toCustomer = customerDetails.phone;

  let totalPrice = 0;
  let itemDetails = '';
  
  cartItems.forEach(item => {
    const itemTotal = item.price * item.qty;
    itemDetails += `- ${item.title} x${item.qty} = ₹${itemTotal}\n`;
    totalPrice += itemTotal;
  });

  const receiptBody = `🍕 *Pizza Order Receipt*\n\nOrder ID: ${orderId}\nDate & Time: ${dateTime}\n\n👤 Customer: ${customerDetails.name}\n🏠 Address: ${customerDetails.address}\n📱 Phone: ${customerDetails.phone}\n\n🧾 Items:\n${itemDetails}\n*Total: ₹${totalPrice}*\n\nThank you for ordering! Visit again!`;

  const notificationBody = `📢 *New Order Notification*\n\nOrder ID: ${orderId}\nDate & Time: ${dateTime}\n\n👤 Customer: ${customerDetails.name}\n🏠 Address: ${customerDetails.address}\n📱 Phone: ${customerDetails.phone}\n\n🧾 Items:\n${itemDetails}\n*Total: ₹${totalPrice}*\n\nPlease prepare ASAP! 🍕`;

  const payloads = [
    { messaging_product: "whatsapp", to: toCustomer, type: "text", text: { body: receiptBody } },
    { messaging_product: "whatsapp", to: toChef, type: "text", text: { body: notificationBody } },
    { messaging_product: "whatsapp", to: toManager, type: "text", text: { body: notificationBody } }
  ];

  payloads.forEach(payload => sendMessage(payload));
}
