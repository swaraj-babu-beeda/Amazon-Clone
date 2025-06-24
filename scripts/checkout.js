import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadproducts,loadProductsFetch } from '../data/products.js';
import { loadcart } from '../data/cart.js';

// import '../data/backend-practice.js';
// import '../data/cart-class.js';

async function loadPage(){
    try {
        await loadProductsFetch();
        await new Promise((resolve, reject) => {
            loadcart((err) => {
                if (err) reject(err);
                else resolve();
            });
        });

    } catch (error) {
        console.error('Error loading page:', error);
    }
    

    renderOrderSummary();
    renderPaymentSummary();

    return 'value2';
}

loadPage();



// new Promise((resolve) =>{
//     loadproducts(() =>{
//         resolve();
//     });
// }).then(() =>{
//     return new Promise ((resolve) =>{
//         loadcart(() =>{
//             resolve();
//         });
//     });
// }).then(() =>{
//     renderOrderSummary();
//     renderPaymentSummary();
// });


// loadproducts(() =>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })

export function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Sum up all product quantities
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);


    // Update the checkout items count dynamically
    document.querySelector('.checkout-header-middle-section .return-to-home-link')
      .innerHTML = `${totalQuantity} items`;
    
  }
  
  // Call updateCartQuantity on page load to ensure the cart count is updated
  updateCartQuantity();
  