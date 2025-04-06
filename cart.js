const cartItemsContaiener = document.querySelector('.cart-items');
const cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')):[];


let btnEnableDisable=document.getElementById('order-button');
if(cartItems==null || cartItems.length==0){
btnEnableDisable.classList.add('disabled')
}else{
    btnEnableDisable.classList.remove('disabled');
}

for (let i = 0; i < cartItems.length; i++) {
    cartItemsContaiener.innerHTML += `
    <div id="product-${cartItems[i].id}" class="menu-item">
        <img src="${cartItems[i].image}" alt="foodImage" class="menu-item-image">
        <h1 class="menu-item-name">${cartItems[i].title}</h1>
        <span class="menu-item-description">${cartItems[i].description}</span>
        <span class="menu-item-price">TotalPrice Rs.${cartItems[i].price*cartItems[i].quantity}</span>
        <span class="menu-item-quantity">Quantity: ${cartItems[i].quantity}</span>
        <button id="button-${cartItems[i].id}" class="food-button remove-from-cart hidden">Remove from Cart</button>
    </div>`;
}

if(cartItems.length == 0) {
    cartItemsContaiener.innerHTML = `<h1 class="empty-cart">Your Cart is Empty</h1>`;
}


const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
for (let i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener('click', function (e) {
        const productId = removeFromCartButtons[i].id.split('-')[1];
        const updatedCart = cartItems.map((item) => {
            if (item.id === parseInt(productId)) {
                if(item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                }else{
                    item.quantity = 0;
                }
            }
            return item;
        }
    ).filter((item) => item.quantity > 0);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.location.reload();
    }
    )
}


const orderButton = document.getElementById('order-button');
orderButton.addEventListener('click',function(){
    const cart= JSON.parse(localStorage.getItem('cart'));
    if(cart==null || cart.length==0){
        // alert("No items in the cart.");
        return;
    }
    let orders= JSON.parse(localStorage.getItem('orders'));
    if(orders==null){
        orders=[];
    }
    orders.push(cart);
    localStorage.setItem('orders',JSON.stringify(orders));
    alert("order placed successfully.")
    localStorage.removeItem('cart');
    location.assign('./order.html');
})