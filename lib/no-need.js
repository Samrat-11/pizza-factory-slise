const PHONE_NUMBER_ID = "716301431576675";
const ACCESS_TOKEN = "EAAPKEBmoa4kBPVQDHZBaXSHQrgfPARPOWimuDqMHRhEnB7HDFIMBNuRcIb7obhcZCVcZAbZCeldUcrFrZCXV4lfYAIrqxcO23xEgDwdIn8f9SyZAuy5wEW0Dlgz63rlxMZCc5zZATkq6h2TyZB46gT6gI6N34w71HIUXVKk2ZCmdGNZAwYWqhxItvvZBmH0Iu9gX02jMrAZDZD";
const GRAPH_API_VERSION = "v22.0";

// Predefined Chef and Manager phone numbers
const toChef = "918247634398";     // Chef's phone number
const toManager = "919505564388";  // Manager's phone number

/* === Send Message to WhatsApp Cloud API === */
async function sendMessage(payload) {
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
    document.getElementById("output")?.append(JSON.stringify(data, null, 2), "\n\n");
  } catch (err) {
    document.getElementById("output")?.append("Error: " + err.message + "\n\n");
  }
}

let orderCounter = 0;
let lastOrderDate = "";

/* === Utility functions === */
function generateOrderId() {
  const d = new Date();
  // Format date as YYYYMMDD
  const date = d.toISOString().slice(0,10).replace(/-/g,""); 
  // Format time as HHMMSSmmm
  const time = d.toTimeString().slice(0,8).replace(/:/g,"") + String(d.getMilliseconds()).padStart(3,"0");
  // Reset counter if date has changed
  if (lastOrderDate !== date) { orderCounter = 0; lastOrderDate = date; }
  orderCounter++;
  return `ORD-${date}-${time}-${String(orderCounter).padStart(3,"0")}`;
}

function getCurrentDateTime() { return new Date().toLocaleString(); }

/* === Cart Extract === */
function getCartItems() {
  return [...document.querySelectorAll("#cartItems li")].map(li => {
    const clone = li.cloneNode(true);
    clone.querySelectorAll("button").forEach(btn => btn.remove());

    const toppings = [...clone.querySelectorAll(".cart-topping-line")]
      .map(t => t.innerText.trim()).filter(Boolean);
    const veg = toppings.filter(t => !/chicken|meat|mutton|fish|prawn|egg/i.test(t));
    const nonVeg = toppings.filter(t => /chicken|meat|mutton|fish|prawn|egg/i.test(t));

    return {
      title: clone.querySelector("span.title")?.innerText.trim() || "",
      size: clone.querySelector(".cart-item-size")?.innerText.trim() || "",
      crust: clone.querySelector(".cart-item-crust")?.innerText.trim() || "",
      vegToppings: veg,
      nonVegToppings: nonVeg,
      qty: +(clone.querySelector(".cart-quantity-controls span")?.innerText || 1),
      price: +(clone.querySelector(".cart-item-price")?.innerText.replace("₹","").trim() || 0)
    };
  });
}

/* === Send Receipt & Notifications via Template === */
async function sendOrderNotifications(orderId, dateTime, customer, items) {
  const toCustomer = customer.phone;

  let totalPrice = 0;
  let itemDetails = '';

  items.forEach(item => {
    const itemTotal = item.price * item.qty;
    const size = item.size ? ` (${item.size})` : "";
    const crust = item.crust ? ` [${item.crust}]` : "";
    const toppings = [...item.vegToppings, ...item.nonVegToppings]
      .map(t => `\n     - ${t}`).join("");

    itemDetails += `*${item.title}*${size}${crust}\n   Qty: ${item.qty}  Price: ₹${itemTotal}${toppings}\n\n`;
    totalPrice += itemTotal;
  });

  // === Add order meta details into the items section ===
  const orderBlock = `Order ID: ${orderId}\nDate & Time: ${dateTime}\n\n👤 Customer: ${customer.name}\n📱 Phone: ${customer.phone}\n🏠 Address: ${customer.address}\n\n`;

  // === Reusable template payload builder ===
  const buildPayload = (to, who) => ({
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: "order_notify",   // ✅ your approved template
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: who },                // {{1}}
            { type: "text", text: `🧾 Items:\n${itemDetails}` },         // {{2}}
            { type: "text", text: `₹${totalPrice}` }    // {{3}}
          ]
        }
      ]
    }
  });

  // === Send to all parties ===
  await sendMessage(buildPayload(toCustomer, customer.name || "Guest"));
  await sendMessage(buildPayload(toChef, "Chef 👨‍🍳"));
  await sendMessage(buildPayload(toManager, "Manager 🧑‍💼"));
}

/* === Helper: Collect details + Send === */
async function processAndSendWhatsApp() {
  const orderId = generateOrderId();
  const dateTime = getCurrentDateTime();

  const customer = {
    name: document.getElementById("custName")?.value || "Guest",
    phone: document.getElementById("custPhone")?.value || "9999999999",
    address: document.getElementById("custAddress")?.value || "Not Provided"
  };

  const items = getCartItems();

  if (!items.length) return alert("Your cart is empty!");
  await sendOrderNotifications(orderId, dateTime, customer, items);
  alert("WhatsApp messages sent successfully ✅");
}

/* === 1. Manual Send via Button === */
document.addEventListener("DOMContentLoaded", () =>
  document.getElementById("sendWhatsAppBtn")?.addEventListener("click", processAndSendWhatsApp)
);

/* === 2. Auto Send after Payment Success === */
function autoSendAfterPayment() {
  processAndSendWhatsApp();
}
