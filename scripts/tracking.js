import { orders } from "../data/orders.js";
import { getDeliveryStatus } from "./utils/deliverystatus.js";
import { productMatch } from "./utils/productmatch.js";

//local run
const urlparams = new URLSearchParams(window.location.search);
const orderid = urlparams.get("order");
const productid = urlparams.get("product");//local run end

//github supported
// const hashParams = new URLSearchParams(window.location.hash.substring(1));
// const orderid = hashParams.get("order");
// const productid = hashParams.get("product");
//github supported end

// console.log(`Order ID: ${orderid}, Product ID: ${productid}`);

let trackingHTML = "";
const currentDate = new Date(); // Get today's date

orders.forEach(order => {
    if (order.id === orderid) {
        order.products.forEach(product => {
            let productmatch = productMatch(product.productId);

            if (product.productId === productid) {
                // Convert estimated delivery date to Date object
                const estimatedDeliveryDate = new Date(product.estimatedDeliveryTime);
                
                // Determine progress bar status
                let progressClass = "progress-stage-1"; // Default: Preparing
                if (currentDate >= estimatedDeliveryDate) {
                    progressClass = "progress-stage-3"; // Delivered
                } else {
                    const timeDiff = estimatedDeliveryDate - currentDate;
                    const daysRemaining = timeDiff / (1000 * 60 * 60 * 24);

                    if (daysRemaining <= 2) {
                        progressClass = "progress-stage-2"; // Shipped
                    }
                }

                trackingHTML += `
                <div class="order-tracking">
                    <a class="back-to-orders-link link-primary" href="orders.html">
                        All Orders
                    </a>

                    <div class="delivery-date">
                        ${getDeliveryStatus(product.estimatedDeliveryTime)}
                    </div>

                    <div class="product-info">
                        ${productmatch.name}
                    </div>

                    <div class="product-info">
                        Quantity: 1
                    </div>

                    <img class="product-image" src="${productmatch.image}">

                    <div class="progress-labels-container">
                        <div class="progress-label ${progressClass === "progress-stage-1" ? "current-status" : ""}">
                            Preparing
                        </div>
                        <div class="progress-label ${progressClass === "progress-stage-2" ? "current-status" : ""}">
                            Shipped
                        </div>
                        <div class="progress-label ${progressClass === "progress-stage-3" ? "current-status" : ""}">
                            Delivered
                        </div>
                    </div>

                    <div class="progress-bar-container">
                        <div class="progress-bar ${progressClass}"></div>
                    </div>
                </div>
                `;
            }
        });
    }
});

document.querySelector(".main").innerHTML = trackingHTML;



// // Wait until the page is fully loaded
setTimeout(() => {
    document.querySelectorAll(".progress-bar").forEach(bar => {
        bar.style.transition = "width 1.5s ease-in-out";
    });
}, 100);


// document.addEventListener("DOMContentLoaded", () => {
//     const progressBar = document.querySelector(".progress-bar");

//     if (!progressBar) return; // Exit if no progress bar is found

//     // Extract estimated delivery date from the page
//     const estimatedDeliveryText = document.querySelector(".delivery-date")?.textContent.trim();

//     if (!estimatedDeliveryText) {
//         console.error("Estimated delivery date not found.");
//         return;
//     }

//     // Extract the date part using regex
//     const dateMatch = estimatedDeliveryText.match(/Arriving on:\s*(.*)/);
//     if (!dateMatch || dateMatch.length < 2) {
//         console.error("Could not extract valid date from:", estimatedDeliveryText);
//         return;
//     }

//     // Remove ordinal suffixes (th, st, nd, rd) to make it parseable
//     const cleanedDateStr = dateMatch[1].replace(/(\d+)(st|nd|rd|th)/, "$1");

//     // Convert to Date object
//     const deliveryDate = new Date(cleanedDateStr);
//     const currentDate = new Date();

//     if (isNaN(deliveryDate.getTime())) {
//         console.error("Invalid delivery date format after cleaning:", cleanedDateStr);
//         return;
//     }

//     console.log(`Current Date: ${currentDate}, Delivery Date: ${deliveryDate}`);

//     let progressWidth = "20%"; // Default: Preparing

//     const diffDays = Math.floor((deliveryDate - currentDate) / (1000 * 60 * 60 * 24));

//     if (diffDays < 0) {
//         progressWidth = "100%"; // Delivered
//     } else if (diffDays <= 2) {
//         progressWidth = "60%"; // Shipped
//     }

//     console.log(`Setting progress bar width: ${progressWidth}`);

//     // Apply animation smoothly
//     setTimeout(() => {
//         progressBar.style.width = progressWidth;
//     }, 500);
// });