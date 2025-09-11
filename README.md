# pizza-factory-slise
<!-- ORDER -->
    <section id="order" class="section hidden">
      <div class="grid g-2">
        <div class="card pad">
          <h2 style="margin-top:0">Your Cart</h2>
          <div id="cartList" class="list"></div>
          <div class="order-summary">
            <div style="display:flex;justify-content:space-between"><span>Subtotal</span><strong id="subtotal">₹0</strong></div>
            <div style="display:flex;justify-content:space-between" class="muted"><span>Delivery</span><span id="delivery">₹40</span></div>
            <div style="display:flex;justify-content:space-between;font-size:18px;margin-top:6px"><span>Total</span><strong id="total">₹0</strong></div>
          </div>
        </div>
        <div class="card pad">
          <h2 style="margin-top:0">Delivery Details</h2>
          <div class="grid g-2">
            <div class="field"><label>Name</label><input id="custName" class="input" placeholder="Your name"/></div>
            <div class="field"><label>Phone</label><input id="custPhone" class="input" placeholder="10-digit phone"/></div>
          </div>
          <div class="field"><label>Address</label><textarea id="custAddr" class="input" rows="3" placeholder="Door no, street, area, city"></textarea></div>
          <div class="grid g-2">
            <div class="field"><label>Branch</label><select id="branchSelectOrder" class="input"></select></div>
            <div class="field"><label>Payment</label>
              <select id="payment" class="input">
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn primary" id="placeOrderBtn">Place Order</button>
          </div>
        </div>
      </div>
    </section>