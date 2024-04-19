let shop = document.getElementById("shop");

// let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Function to generate the shop items
let generateShop = () => {
  // Display loading GIF image
  var loadingImage = document.createElement("img");
  loadingImage.classList.add("loading-image");
  loadingImage.src = "assets/Spinner-1s-200px.gif"; // Replace "loading.gif" with the path to your GIF image
  document.body.appendChild(loadingImage);

  // Simulate a delay for demonstration purposes
  setTimeout(() => {
    // Remove the loading GIF image after the delay
    document.body.removeChild(loadingImage);

    // Generate shop items
    shop.innerHTML = shopItemsData
      .map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
          <div id=product-id-${id} class="item">
              <img width="220" src=${img} alt="">
              <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                  <h2>$ ${price} </h2>
                  <div class="buttons">
                  <img onclick="decrement(${id})" src="assets/free-minus-icon-3108-thumb.png" class="bi bi-dash-lg"></img>
                    <div id=${id} class="quantity">
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <img onclick="increment(${id})" src="assets/1200px-Plus_symbol.svg.png" class="bi bi-plus-lg"></img>
                  </div>
                </div>
              </div>
            </div>
          `;
      })
      .join("");
  }, 2000); // Simulate a delay of 2 seconds for demonstration
};

generateShop();

// Your increment, decrement, update, and calculation functions remain unchanged


// generateShop();

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

  // console.log(basket);
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
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


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



