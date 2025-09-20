// receipt.js
function openReceiptModal() {
  const receiptModal = document.getElementById("receiptModal");
  const receiptDetails = document.getElementById("receiptDetails");
  const cartList = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal").innerText;

  // Customer details
  const customer = JSON.parse(localStorage.getItem("customerDetails")) || {
    name: "Not Provided",
    phone: "Not Provided",
    address: "Not Provided"
  };

  if (!cartList.innerHTML.trim()) {
    receiptDetails.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    const cloned = cartList.cloneNode(true);
    cloned.querySelectorAll("button").forEach(btn => btn.remove());

    cloned.querySelectorAll("li").forEach(li => {
      const title = li.querySelector("span.title")?.innerText || "";
      const size = li.querySelector(".cart-item-size")?.innerText || "";
      const toppings = [...li.querySelectorAll(".cart-topping-line")]
        .map(t => `<div style="font-size:12px;">${t.innerText}</div>`).join("");
      const qty = li.querySelector(".cart-quantity-controls span")?.innerText || "";
      const price = li.querySelector(".cart-item-price")?.innerText || "";

      li.innerHTML = `
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;">
          <div><strong>${title}</strong> ${size} ${toppings}</div>
          <div style="white-space:nowrap;text-align:right;font-size:14px;">
            Qty: ${qty}&nbsp;&nbsp;&nbsp;<strong>${price}</strong>
          </div>
        </div>
        <hr style="border:0;height:1px;background:#ccc;margin:5px 0;">
      `;
    });

    receiptDetails.innerHTML = `
      <h3 style="margin:5px 0;text-align:center;">👤 Customer Details</h3>
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Address:</strong> ${customer.address}</p>
      <h3 style="margin:5px 0;text-align:center;">🧾 Ordered Items</h3>
      <ul style="list-style:none;padding:0;margin:0;">${cloned.innerHTML}</ul>
      <p style="text-align:right;font-weight:bold;font-size:18px;margin-top:10px;"> Grand Total: ${cartTotal}</p>
    `;
  }

  // Modal styling
  Object.assign(receiptModal.style, {
    display: "flex",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "9999"
  });

  const modalBox = receiptModal.querySelector(".modal-content");
  if (modalBox) {
    Object.assign(modalBox.style, {
      background: "#fff",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "500px",
      width: "90%",
      maxHeight: "80vh",
      overflowY: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none"
    });
  }
}

function closeReceiptModal() { document.getElementById("receiptModal").style.display = "none";}

document.getElementById("viewReceiptBtn").addEventListener("click", openReceiptModal);
