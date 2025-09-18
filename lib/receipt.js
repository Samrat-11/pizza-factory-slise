// receipt.js
function openReceiptModal() {
  const receiptModal = document.getElementById("receiptModal");
  const receiptDetails = document.getElementById("receiptDetails");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    receiptDetails.innerHTML = "<p>Your cart is empty.</p>";
    receiptModal.style.display = "flex";
    return;
  }

  let total = 0;
  let html = `<ul style="list-style:none; padding:0;">`;

  cart.forEach(item => {
    let toppings = item.toppings && item.toppings.length 
      ? `<br><small>+ ${item.toppings.join(", ")} </small>` 
      : "";

    const price = parseInt(item.price.replace("₹", ""));
    const itemTotal = price * item.qty;
    total += itemTotal;

    html += `<li style="margin-bottom:10px; border-bottom:1px dashed #ccc; padding-bottom:5px;">
      <strong>${item.title}</strong> 
      ${item.size ? `(${item.size})` : ""}
      ${toppings}
      <br>Qty: ${item.qty} × ₹${price} = <strong>₹${itemTotal}</strong>
    </li>`;
  });

  html += `</ul><p style="text-align:right; font-weight:bold; font-size:18px;">Total: ₹${total}</p>`;

  receiptDetails.innerHTML = html;
  receiptModal.style.display = "flex";
}

function closeReceiptModal() {
  document.getElementById("receiptModal").style.display = "none";
}

// Attach event to button
document.getElementById("viewReceiptBtn").addEventListener("click", openReceiptModal);
