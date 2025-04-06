import { menuDataItems, productTokens } from '/menuItemsData.js';


const searchItemsContaiener = document.querySelector('.search-sections');
searchItemsContaiener.innerHTML = '';

const menuButtons = document.querySelectorAll('.menu-search-categories button');

for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].addEventListener('click', function () {
        for (let j = 0; j < menuButtons.length; j++) {
            menuButtons[j].classList.remove('active');
        }
        menuButtons[i].classList.add('active');
    }
    )
};


const menuItems = document.querySelectorAll('.menu-item');

for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('onmouseover', function () {

    }
    )
}


const menuItemsContaiener = document.querySelector('.menu-items');
for (let i = 0; i < menuDataItems.length; i++) {
    menuItemsContaiener.innerHTML += `
    <div id="product-${menuDataItems[i].id}" class="menu-item">
        <img src="${menuDataItems[i].image}" alt="foodImage" class="menu-item-image">
        <h1 class="menu-item-name">${menuDataItems[i].title}</h1>
        <span class="menu-item-description">${menuDataItems[i].description}</span>
        <span class="menu-item-price">Rs. ${menuDataItems[i].price}</span>
        <button id="button-${menuDataItems[i].id}" class="food-button hidden">Add to Cart</button>
    </div>`;
}

const addToCartButtons = document.querySelectorAll('.food-button');
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', function () {
        console.log(addToCartButtons[i].id);
        menuDataItems.forEach((item) => {
            if (item.id == addToCartButtons[i].id) {
                console.log(item);
            }
        })
    }
    )
}


for (let i = 0; i < menuDataItems.length; i++) {
    const menuItem = document.getElementById('product-' + menuDataItems[i].id);
    menuItem.addEventListener('click', function () {
        console.log(menuItem.id);
        window.open(`./product.html?id=${menuDataItems[i].id}`, '_self');
    })
}

for (let i = 0; i < menuDataItems.length; i++) {
    const button = document.getElementById('button-' + menuDataItems[i].id);
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        if(localStorage.getItem('cart') == null){
            localStorage.setItem('cart', JSON.stringify([{...menuDataItems[i], quantity:1}]));
        }else{
        let cart=JSON.parse(localStorage.getItem('cart')) || [];
        console.log(menuDataItems[i]);
        let itemExists = false;
        let item;
        for(let j = 0; j < cart.length; j++){
            if(cart[j].id == menuDataItems[i].id){
                itemExists = true;
                item = cart[j];
                break;
            }
        }
        if(itemExists){
            item.quantity = item.quantity + 1;}
        else{
            cart.push({...menuDataItems[i], quantity:1});
        }
        localStorage.setItem('cart', JSON.stringify(cart));}
        console.log(localStorage.getItem('cart'));
        alert('Added to cart successfully!');
    })
}

const searchInput = document.querySelector('.menu-search input');


searchInput.addEventListener('input', function (e) {
    if(e.target.value == '') {
        const searchItemsContaiener = document.querySelector('.search-sections');
        searchItemsContaiener.innerHTML = '';
        return;
    }else{
        const searchItemsContaiener = document.querySelector('.search-sections');
        searchItemsContaiener.innerHTML = '';
        searchItemsContaiener.innerHTML =searchItemsContaiener.innerHTML + `<h1>Search Results</h1>
        <div class="search-section-items">
            <div class="search-items">
                </div>
            </div> `;
    }
    const products = searchFood(e.target.value);
    const searchItemsContaiener = document.querySelector('.search-items');
    searchItemsContaiener.innerHTML = '';
    if(products.length == 0){
        searchItemsContaiener.innerHTML = `<h1 class="no-results">No results found</h1>`;}
for (let i = 0; i < products.length; i++) {
    searchItemsContaiener.innerHTML += `
        <div id="product-${products[i].id}" class="search-item">
            <img src="${products[i].image}" alt="foodImage" class="search-item-image">
            <h1 class="search-item-name">${products[i].title}</h1>
            <span class="search-item-description">${products[i].description}</span>
            <span class="search-item-price">Rs. ${products[i].price}</span>
            <button id="button-${products[i].id}" class="food-button hidden">Add to Cart</button>
        </div>`;
}
});


const searchFood = (searchQuery) => {
    const searchTokens = searchQuery.toLowerCase().split(' ');
    let productMatchingScoress = [];
    for (let i = 0; i < productTokens.length; i++) {
        let score = 0;
        for (let j = 0; j < productTokens[i].tokens.length; j++) {
            if (searchTokens.includes(productTokens[i].tokens[j])) {
                score++;
            }
        }
        productMatchingScoress.push({
            id: productTokens[i].id,
            score: score
        });
    }
    productMatchingScoress.sort((a, b) => {
        return b.score - a.score;
    });
    productMatchingScoress = productMatchingScoress.filter((item) => {
        return item.score > 0;
    });
    productMatchingScoress = productMatchingScoress.splice(0, 5);
    const products = [];
    for (let i = 0; i < productMatchingScoress.length; i++) {
        menuDataItems.forEach(menuItem => {
            if (menuItem.id == productMatchingScoress[i].id) {
                products.push(menuItem);
            }
        });
    }
    return products
}


