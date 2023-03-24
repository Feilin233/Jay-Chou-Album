// Remove button
var removeCartItemButton =
  document.getElementsByClassName("cart-button-remove");
for (var i = 0; i < removeCartItemButton.length; i++) {
  var button = removeCartItemButton[i];
  button.addEventListener("click", removeCartItem);
}
// Remove button
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}



// quantity input can't be less than 1
var quantityInputs = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantityInputs.length; i++) {
  var input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}
// quantity input can't be less than 1
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// add to cart button
var addToCartButtons = document.getElementsByClassName('store-album-button')
for (var i = 0; i < addToCartButtons.length; i++) {
  var button = addToCartButtons[i]
  button.addEventListener('click', addToCartClicked)
}

// adding album to cart
function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName('store-album-name')[0].innerText
  var price = shopItem.getElementsByClassName('store-album-price')[0].innerText
  var cover = shopItem.getElementsByClassName('store-album-cover')[0].src
  addItemToCart(title, price, cover)
  updateCartTotal()
}

// adding correct title, price, cover inside the cart
function addItemToCart(title, price, cover) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart')
  var cartItems = document.getElementsByClassName('carts')[0]
  var cartItemNames = cartItems.getElementsByClassName('cart-album-name')
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents = `
  <div class="cart-item cart-header">
  <img
    class="cart-image"
    src="${cover}"
    width="200"
    height="200"
  />
  <strong class="cart-album-name">${title}</strong>
</div>
<strong class="cart-price cart-header">${price}</strong>
<div class="cart-quantity cart-header">
  <input class="cart-quantity-input" type="number" value="1" />
  <button class="cart-button-remove" role="button">REMOVE</button>
</div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('cart-button-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}



// Purchase button
document.getElementsByClassName('cart-button-purchase')[0].addEventListener('click', purchaseClicked)
// Purchase button - popup message
function purchaseClicked() {
   alert('Thank you for your purchase')
   var cartItems = document.getElementsByClassName('carts')[0]
   while (cartItems.hasChildNodes()) {
       cartItems.removeChild(cartItems.firstChild)
   }
   updateCartTotal()
 }



// Cart total price
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("carts")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
