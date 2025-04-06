import {menuDataItems} from '/menuItemsData.js';
const urlParams= new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const product = menuDataItems.find(item => item.id == productId);


document.querySelector(".product-description").textContent = product.description;
document.querySelector(".product-name").textContent = product.title;
document.querySelector(".product-price").innerHTML = `Price: &#x20B9;${product.price}`;
const prodImage=document.querySelector(".product-image")
prodImage.style.backgroundImage = `url(${product.image})`;
