export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {  
    const orderId = generateOrderId();  
    const orderWithId = { ...order, orderId };
    orders.unshift(orderWithId);  
    saveToStorage();
    emptyCart();
}

function saveToStorage() { 
    localStorage.setItem('orders', JSON.stringify(orders)); 
}

function emptyCart(){
    localStorage.setItem('cart', JSON.stringify([])); 
}

function generateOrderId() {
    return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}
