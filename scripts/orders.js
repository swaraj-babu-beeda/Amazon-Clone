import { orders } from "../data/orders.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { productMatch } from "./utils/productmatch.js";
import { formatDate } from "./utils/dateparser.js";
let ordersHtml=`<div class="page-title">Your Orders</div>`;
import { getDeliveryStatus } from "./utils/deliverystatus.js";

orders.forEach(order => {
    ordersHtml+=`
      <div class="orders-grid">
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>`;
          order.products.forEach(product=>{
            let productmatch=productMatch(product.productId);
            ordersHtml+=`<div class="order-details-grid">
            <div class="product-image-container">
              <img src="${productmatch.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${productmatch.name}
              </div>
              <div class="product-delivery-date">
                ${getDeliveryStatus(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a>
                <button class="track-package-button button-secondary order${order.id} product${productmatch.id}">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      `
          });
          
});

document.querySelector('.main').innerHTML=ordersHtml;

function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Sum up all product quantities
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    document.querySelector('.cart-quantity').innerHTML = totalQuantity;
}
  
  // Call updateCartQuantity on page load to ensure the cart count is updated
  updateCartQuantity();


  document.querySelectorAll(".track-package-button").forEach(button => {
    button.addEventListener("click", (event) => {
        const classList = event.currentTarget.classList;
        const orderClass = [...classList].find(cls => cls.startsWith("order"));
        const productClass = [...classList].find(cls => cls.startsWith("product"));
        const orderId = orderClass ? orderClass.replace("order", "") : null;
        const productId = productClass ? productClass.replace("product", "") : null;


        if (!orderId || !productId) {
            console.error("Error: Missing orderId or productId!");
            return;
        }

        const trackingUrl = new URL("tracking.html", window.location.origin);
        trackingUrl.searchParams.append("order", orderId);
        trackingUrl.searchParams.append("product", productId);

        //console.log("Redirecting to:", trackingUrl.href); // Debugging
        window.location.href = trackingUrl.href;
    });
});

