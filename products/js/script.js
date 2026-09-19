// 1) DATA: list of 10 products
const products = [
    { id: 1, name: "Airpods", price: 129, image: "./images/Airpods.png" },
    { id: 2, name: "Apple", price: 399, image: "./images/Apple.png" },
    { id: 3, name: "Huawei", price: 70, image: "./images/Huawei.png" },
    { id: 4, name: "sony", price: 350, image: "./images/sony.png" },
    { id: 5, name: "samsung", price: 799, image: "./images/samsung.png" },
    { id: 6, name: "iphone", price: 799, image: "./images/iphone.png" },
    { id: 7, name: "macbook", price: 1099, image: "./images/macbook.png" },
    { id: 8, name: "ipad", price: 429, image: "./images/ipad.png" },
    { id: 9, name: "Logitech", price: 99, image: "./images/Logitech.png" },
    { id: 10, name: "playstation", price: 499, image: "./images/playstation.png" },
];

let cart = [];
let favorites = [];


// 2) SHOW PRODUCTS ON THE PAGE
function renderProducts() {
    const grid = document.getElementById("productsGrid");
    grid.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        grid.innerHTML += `
        <div class="card">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <button class="btn-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            <button class="btn-fav" onclick="addToFav(${product.id})">Add to Favorites</button>
        </div>
        `;
    }
}


// 3) SHOW CART ITEMS
function renderCart() {
    const grid = document.getElementById("cartGrid");
    grid.innerHTML = "";

    if (cart.length === 0) {
        grid.innerHTML = "<p class='empty-msg'>Your cart is empty.</p>";
    }

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];

        grid.innerHTML += `
        <div class="card">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <button class="btn-delete" onclick="deleteFromCart(${product.id})">Remove</button>
        </div>
        `;
    }
    document.getElementById("cartCount").textContent = cart.length;
}


// 4) SHOW FAVORITE ITEMS
function renderFav() {
    const grid = document.getElementById("favGrid");
    grid.innerHTML = "";

    if (favorites.length === 0) {
        grid.innerHTML = "<p class='empty-msg'>No favorites yet.</p>";
    }

    for (let i = 0; i < favorites.length; i++) {
        const product = favorites[i];

        grid.innerHTML += `
        <div class="card">
            <img src="${product.image}">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <button class="btn-delete" onclick="deleteFromFav(${product.id})">Remove</button>
        </div>
        `;
    }

    document.getElementById("favCount").textContent = favorites.length;
}


// 5) THE 4 MAIN FUNCTIONS

// Find a product by its id
function findProductById(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
        return products[i];
        }
    }
}

// (1) Add to cart
function addToCart(id) {
    const product = findProductById(id);
    cart.push(product);
    renderCart();
}

// (2) Add to favorites
function addToFav(id) {
    const product = findProductById(id);
    favorites.push(product);
    renderFav();
}

// (3) Delete from cart
function deleteFromCart(id) {
    cart = cart.filter(function (product) {
        return product.id !== id;
    });
    renderCart();
}

// (4) Delete from favorites
function deleteFromFav(id) {
    favorites = favorites.filter(function (product) {
        return product.id !== id;
    });
    renderFav();
}


// 6) SWITCH BETWEEN TABS (Products / Cart / Favorites)
function showPage(pageId, btn) {
    const allPages = document.querySelectorAll(".page");
    const allButtons = document.querySelectorAll(".tab-btn");

    // Step 1: hide every page
    for (let i = 0; i < allPages.length; i++) {
        allPages[i].style.display = "none";
    }

    // Step 2: reset every button to its normal color
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].style.background = "#ddd";
        allButtons[i].style.color = "black";
    }

    // Step 3: show only the page the user clicked on
    document.getElementById(pageId).style.display = "block";

    // Step 4: highlight only the button the user clicked on
    btn.style.background = "#333";
    btn.style.color = "white";
}


// 7) RUN ONCE WHEN THE PAGE LOADS
renderProducts();
renderCart();
renderFav();

// Show the Products page by default when the page first opens
const firstButton = document.querySelector(".tab-btn");
showPage("productsPage", firstButton);