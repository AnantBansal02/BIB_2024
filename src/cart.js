let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to calculate the total amount in the cart
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation(); // Calculate initial cart amount

// Function to generate cart items
let generateCartItems = () => {
  // Display loading GIF image
  var loadingImage = document.createElement("img");
  loadingImage.classList.add("loading-image");
  loadingImage.src = "assets/Blocks-Loader-200px.svg"; // Replace "loading.gif" with the path to your GIF image
  document.body.appendChild(loadingImage);

  // Simulate a delay for demonstration purposes
  setTimeout(() => {
    // Remove the loading GIF image after the delay
    document.body.removeChild(loadingImage);

    if (basket.length !== 0) {
      ShoppingCart.innerHTML = basket
        .map((x) => {
          let { id, item } = x;
          let search = shopItemsData.find((y) => y.id === id) || [];
          return `
          <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
            <div class="details">
    
              <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <img src="assets/cross.png" onclick="removeItem(${id})" class="bi bi-x-lg"></img>
              </div>
    
              <div class="buttons">
                  <img onclick="decrement(${id})" src="assets/free-minus-icon-3108-thumb.png" class="bi bi-dash-lg"></img>
                  <div id=${id} class="quantity">${item}</div>
                  <img onclick="increment(${id})" src="assets/1200px-Plus_symbol.svg.png" class="bi bi-plus-lg"></img>
              </div>
    
              <h3>$ ${item * search.price}</h3>
            </div>
          </div>
          `;
        })
        .join("");
    } else {
      ShoppingCart.innerHTML = ``;
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html">
        <button class="HomeBtn">Back to home</button>
      </a>
      `;
    }
  }, 2000); // Simulate a delay of 2 seconds for demonstration
};

generateCartItems(); // Generate cart items

// Your increment, decrement, update, and calculation functions remain unchanged


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  // console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    
    label.innerHTML = `

    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};
// Function to toggle between dark and light modes
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  
  // Toggle the dark-mode class on the body element
  body.classList.toggle("dark-mode");
  
  // Check if dark mode is enabled and set the appropriate image source
  if (body.classList.contains("dark-mode")) {
      themeToggle.src = "assets/dark.png"; // Replace with your dark mode image
  } else {
      themeToggle.src = "assets/light.png"; // Replace with your light mode image
  }

  // Save the user's preference to localStorage
  const themePreference = body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", themePreference);
}

// Check if the user has a theme preference saved in localStorage and apply it
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.add(savedTheme + "-mode");
}

// Set the initial theme toggle image based on the saved theme preference
const themeToggle = document.getElementById("theme-toggle");
if (savedTheme === "dark") {
  themeToggle.src = "assets/dark.png"; // Replace with your dark mode image
} else {
  themeToggle.src = "assets/light.png"; // Replace with your light mode image
}
TotalAmount();

