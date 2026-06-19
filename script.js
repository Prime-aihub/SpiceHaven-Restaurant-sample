
/* ======================================
   CART
====================================== */

let cart = [];

/* ======================================
   ADD TO CART
====================================== */

function addToCart(name, price){

const existingItem = cart.find(
item => item.name === name
);

if(existingItem){

existingItem.qty++;

}
else{

cart.push({

name:name,
price:price,
qty:1

});

}

updateCart();

}

/* ======================================
   UPDATE CART
====================================== */

function updateCart(){

let count = 0;

let total = 0;

const cartCount =
document.getElementById(
"cart-count"
);

const cartItems =
document.getElementById(
"cart-items"
);

const cartTotal =
document.getElementById(
"cart-total"
);

if(cartItems){

cartItems.innerHTML = "";

}

cart.forEach((item,index)=>{

count += item.qty;

total += item.price * item.qty;

if(cartItems){

cartItems.innerHTML += `

<div class="cart-row">

<h4>${item.name}</h4>

<p>

${item.qty} × ₹${item.price}

</p>

<button
onclick="removeItem(${index})">

❌

</button>

</div>

`;

}

});

if(cartCount){

cartCount.innerText = count;

}

if(cartTotal){

cartTotal.innerText = "₹" + total;

}

}

/* ======================================
   REMOVE ITEM
====================================== */

function removeItem(index){

cart.splice(index,1);

updateCart();

}

/* ======================================
   SEND CART TO WHATSAPP
====================================== */

function sendWhatsAppOrder(){

if(cart.length===0){

alert("Cart is empty");

return;

}

let total = 0;

let message =

`🍽️ Spice Haven Order

`;

cart.forEach(item=>{

message +=

`${item.qty} x ${item.name}

₹${item.price * item.qty}

`;

total += item.qty * item.price;

});

message +=

`

Total = ₹${total}

Name:

Phone:

Address:
`;

window.open(

`https://wa.me/919004130508?text=${encodeURIComponent(message)}`,

'_blank'

);

}


/* ======================================
   MENU DATA
====================================== */

const menuItems = [

{
name:"Butter Chicken",
price:349,
category:"chicken"
},

{
name:"Chicken Biryani",
price:280,
category:"biryani"
},

{
name:"Paneer Butter Masala",
price:260,
category:"paneer"
},

{
name:"Paneer Tikka",
price:280,
category:"paneer"
},

{
name:"Chicken Manchurian",
price:280,
category:"chinese"
},

{
name:"Veg Manchurian",
price:220,
category:"chinese"
},

{
name:"Veg Fried Rice",
price:190,
category:"rice"
},

{
name:"Mutton Rogan Josh",
price:420,
category:"mutton"
},

{
name:"Fish Fry",
price:350,
category:"seafood"
},

{
name:"Dragon Chicken",
price:340,
category:"chinese"
}

];


/* ======================================
   WHATSAPP ORDER
====================================== */

function orderDish(name, price, qty){

qty = parseInt(qty);

const total = price * qty;

const message =

`🍽️ Spice Haven Order

Dish: ${name}

Quantity: ${qty}

Price Per Item: ₹${price}

Total: ₹${total}

-----------------------

Name:

Phone:

Address:
`;

window.open(

`https://wa.me/919004130508?text=${encodeURIComponent(message)}`,

'_blank'

);

}


/* ======================================
   AI SEARCH
====================================== */

function searchFood(){

const input =

document.getElementById(
"food-search"
).value.toLowerCase();

const resultDiv =
document.getElementById(
"ai-results"
);

if(!resultDiv) return;

let results = [];


/* Search By Dish */

results = menuItems.filter(item=>

item.name.toLowerCase()
.includes(input)

);


/* Search By Category */

if(results.length===0){

results = menuItems.filter(item=>

item.category.toLowerCase()
.includes(input)

);

}


/* Search Under Price */

if(input.includes("under")){

const price = parseInt(

input.replace(/\D/g,'')

);

results = menuItems.filter(item=>

item.price <= price

);

}


/* Display Results */

resultDiv.innerHTML = "";

if(results.length===0){

resultDiv.innerHTML =

`
<h3>
No matching dishes found
</h3>
`;

return;

}


results.forEach(item=>{

resultDiv.innerHTML +=

`

<div class="ai-card">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<select class="qty-select">

<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>

</select>

<button
onclick="orderDish(
'${item.name}',
${item.price},
this.previousElementSibling.value
)">
Order Now
</button>

</div>

`;

});

}


/* ======================================
   AI RECOMMENDATIONS
====================================== */

function showRecommendations(keyword){

const resultDiv =
document.getElementById(
"recommendations"
);

if(!resultDiv) return;

let html = "";

if(keyword.includes("paneer")){

html =

`
<h3>Recommended Paneer Dishes</h3>

<ul>

<li>Paneer Butter Masala</li>
<li>Kadai Paneer</li>
<li>Paneer Tikka</li>
<li>Palak Paneer</li>

</ul>
`;

}

else if(keyword.includes("chicken")){

html =

`
<h3>Recommended Chicken Dishes</h3>

<ul>

<li>Butter Chicken</li>
<li>Chicken Tikka</li>
<li>Chicken Biryani</li>
<li>Dragon Chicken</li>

</ul>
`;

}

else if(keyword.includes("biryani")){

html =

`
<h3>Recommended Biryani</h3>

<ul>

<li>Chicken Biryani</li>
<li>Mutton Biryani</li>
<li>Veg Biryani</li>

</ul>
`;

}

resultDiv.innerHTML = html;

}


/* ======================================
   SEARCH ENTER KEY
====================================== */

const foodSearch =

document.getElementById(
"food-search"
);

if(foodSearch){

foodSearch.addEventListener(

"keyup",

function(e){

if(e.key==="Enter"){

searchFood();

showRecommendations(
this.value.toLowerCase()
);

}

}

);

}


/* ======================================
   RESERVATION FORM
====================================== */

function sendReservation(){

const name =
document.getElementById(
"res-name"
).value;

const phone =
document.getElementById(
"res-phone"
).value;

const persons =
document.getElementById(
"res-persons"
).value;

const date =
document.getElementById(
"res-date"
).value;

const time =
document.getElementById(
"res-time"
).value;

const msg =

`🍽️ Table Reservation

Name: ${name}

Phone: ${phone}

Persons: ${persons}

Date: ${date}

Time: ${time}`;

window.open(

`https://wa.me/919004130508?text=${encodeURIComponent(msg)}`,

"_blank"

);

}


/* ======================================
   GALLERY LIGHTBOX
====================================== */

const galleryImages =

document.querySelectorAll(
".gallery-grid img"
);

galleryImages.forEach(image=>{

image.addEventListener(

"click",

function(){

const overlay =

document.createElement("div");

overlay.classList.add(
"lightbox"
);

overlay.innerHTML =

`
<img src="${this.src}">
`;

document.body.appendChild(
overlay
);

overlay.addEventListener(
"click",
()=>{
overlay.remove();
}
);

}

);

});


/* ======================================
   NAVBAR SCROLL EFFECT
====================================== */

window.addEventListener(

"scroll",

function(){

const navbar =
document.querySelector(
"header"
);

if(window.scrollY > 50){

navbar.classList.add(
"sticky"
);

}
else{

navbar.classList.remove(
"sticky"
);

}

}
);
