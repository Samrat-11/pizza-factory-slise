/* === WhatsApp Config === */
const CONFIG = {
  // PHONE_ID: "851197734735713",
  PHONE_ID: "813926495145436",
  TOKEN: "EAAVKNkhTUSgBPlTaVoAp2eZAdy5pZCde21bpsu4ZBQfbaHYVRD9S8I2cMBW6tmDYAFgu1BtNjIkzVuj6nZCFWDb5Otal4ndZCPjp37LGaGF5XqYtnyhKlYNIkX4PCMZClDmsHdXhqWJ8iUZArGOAIU1HBSIUpQEH4zy2LeCwRXvRsDnxmHkUQAbRP8vNGRSITCU1wZDZD",
  VERSION: "v22.0",
  TEMPLATE: "pizza_img_receipt",
  CUSTOMER: "919640521971",
  // CHEF: "919640521971",
  MANAGER: "919640521971"
};

/* === Helpers === */
const now = () => new Date();
const generateOrderId = () => {
  const d = now();
  return `ORD-${d.toISOString().slice(0,10).replace(/-/g,"")}-${d.toTimeString().slice(0,8).replace(/:/g,"")}${d.getMilliseconds().toString().padStart(3,"0")}`;
};
const getCurrentDateTime = () => now().toLocaleString();
const sendMessage = (payload) =>
  fetch(`https://graph.facebook.com/${CONFIG.VERSION}/${CONFIG.PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${CONFIG.TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.json()).catch(e => console.error("❌ Send Error:", e));

/* === Get Cart Items === */
const getCartItems = () => [...document.querySelectorAll("#cartItems li")].map(li => {
  li = li.cloneNode(true);
  li.querySelectorAll("button").forEach(b => b.remove());
  const toppings = [...li.querySelectorAll(".cart-topping-line")].map(t => t.innerText.trim()).filter(Boolean);
  const nonVeg = /chicken|meat|mutton|fish|prawn|egg/i;
  return {
    title: li.querySelector("span.title")?.innerText.trim() || "",
    size: li.querySelector(".cart-item-size")?.innerText.trim() || "",
    crust: li.querySelector(".cart-item-crust")?.innerText.trim() || "",
    vegToppings: toppings.filter(t => !nonVeg.test(t)),
    nonVegToppings: toppings.filter(t => nonVeg.test(t)),
    qty: +(li.querySelector(".cart-quantity-controls span")?.innerText || 1),
    price: +(li.querySelector(".cart-item-price")?.innerText.replace("₹","").trim() || 0)
  };
});

/* === Build Receipt HTML === */
const buildReceipt = (orderId, dateTime, c, items) => {
  const cartTotalElement = document.getElementById("cartTotal");
  const totalText = cartTotalElement ? cartTotalElement.innerText.trim() : "";
  
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  // Extract discount and final total from text (e.g. "Total: ₹100\nDiscount: ₹10\nGrand Total: ₹90")
  let discount = 0, grandTotal = subtotal;
  const discountMatch = totalText.match(/Discount:\s*₹?(\d+)/i);
  const grandMatch = totalText.match(/Grand\s*Total:\s*₹?(\d+)/i);
  if (discountMatch) discount = parseFloat(discountMatch[1]);
  if (grandMatch) grandTotal = parseFloat(grandMatch[1]);

  return `
    <h2 style="text-align:center;margin-bottom:8px;">🍕 Pizza Factory Slice</h2>
    <p style="margin-bottom:8px;">
      <b>Order ID:</b> ${orderId}<br>
      <b>Date:</b> ${dateTime}<br>
      <b>👤 Customer:</b> ${c.name}<br>
      <b>📱 Phone:</b> ${c.phone.replace(/^(\+?91)?/,"+91 ").trim()}<br>
      <b>🏠 Address:</b> ${c.address}
    </p>
    <hr><h3 style="margin-bottom:8px;">🧾 Items</h3>
    ${items.map(i => {
      const tops = [...i.vegToppings, ...i.nonVegToppings].map(t => `• ${t}`).join("<br>");
      return `<div style="margin-bottom:8px;"><b>${i.title}</b> ${i.size || ""} ${i.crust || ""}<br>
      Qty: ${i.qty} × ₹${i.price} = ₹${i.price * i.qty}<br>${tops ? `<div style="margin-left:10px;">${tops}</div>` : ""}</div>`;
    }).join("")}
    <hr>
    <div style="text-align:right; font-weight:bold;">
      ${discount > 0 ? `Total: ₹${subtotal}<br>Discount: ₹${discount}<br>` : ''}
      <p><b>Grand Total:</b> ₹${grandTotal}</p>
    </div>`;
};

/* === Create and Send Receipt Image === */
const sendReceiptImageToAll = async (orderId, dateTime, c, items) => {
  const div = Object.assign(document.createElement("div"), {
    style: "background:#fff;color:#000;padding:10px;width:480px;font-family:Arial;position:fixed;left:-9999px;",
    innerHTML: buildReceipt(orderId, dateTime, c, items)
  });
  const watermark = Object.assign(document.createElement("img"), {
    src: "../assets/img/pizza_factory_slise_logo.png",
    style: "position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.15;width:25rem;z-index:9999;"
  });
  div.appendChild(watermark);
  document.body.appendChild(div);

  const canvas = await html2canvas(div);
  div.remove();
  const blob = await new Promise(r => canvas.toBlob(r,"image/png"));

  const form = new FormData();
  form.append("file", blob, "receipt.png");
  form.append("messaging_product", "whatsapp");

  const res = await fetch(`https://graph.facebook.com/${CONFIG.VERSION}/${CONFIG.PHONE_ID}/media`, {
    method: "POST",
    headers: { Authorization: `Bearer ${CONFIG.TOKEN}` },
    body: form
  });
  const data = await res.json();
  if (!data.id) return alert("❌ Upload failed:\n" + JSON.stringify(data, null, 2));

  for (const { phone, text } of [
    { phone: c.phone, text: "We will update shortly" },
    // { phone: CONFIG.CHEF, text: "Please Prepare items as soon as possible" },
    { phone: CONFIG.MANAGER, text: "Please check the details" }
  ]) {
    await sendMessage({
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: CONFIG.TEMPLATE,
        language: { code: "en_US" },
        components: [
          { type: "header", parameters: [{ type: "image", image: { id: data.id } }] },
          { type: "body", parameters: [
              { type: "text", text: "Receipt" },
              { type: "text", text: orderId },
              { type: "text", text: dateTime },
              { type: "text", text }
          ]}
        ]
      }
    });
  }
  alert("✅ Receipt image sent to Customer, Chef, and Manager!");
};

/* === Main === */
const processAndSendWhatsApp = async () => {
  const rawPhone = document.getElementById("custPhone")?.value.trim() || CONFIG.CUSTOMER;
  if (!rawPhone) return alert("Please enter customer's phone number!");
  const cleanedPhone = rawPhone.replace(/^(\+?91)/, "").trim();
  if (!/^\d{10}$/.test(cleanedPhone)) {return alert("Please enter a valid 10-digit phone number (without +91).");}
  const fullPhone = `+91${cleanedPhone}`;

  const c = {
    name: document.getElementById("custName")?.value || "Guest",
    phone: fullPhone,
    address: document.getElementById("custAddress")?.value || "Not Provided"
  };

  const items = getCartItems();
  if (!items.length) return alert("Your cart is empty!");

  await sendReceiptImageToAll(generateOrderId(), getCurrentDateTime(), c, items);
};

/* === Events === */
document.addEventListener("DOMContentLoaded", () =>
  document.getElementById("sendWhatsAppBtn")?.addEventListener("click", processAndSendWhatsApp)
);
const autoSendAfterPayment = () => processAndSendWhatsApp();
