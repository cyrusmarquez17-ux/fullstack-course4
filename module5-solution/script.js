var menuCategories = [
  { short_name: "L", name: "Lunch", image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=400&q=80" },
  { short_name: "A", name: "Appetizers", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80" },
  { short_name: "S", name: "Soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80" },
  { short_name: "C", name: "Chicken", image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80" },
  { short_name: "B", name: "Beef", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" }
];

var menuItems = {
  "L": [
    { name: "Orange Chicken Lunch Special", description: "Crispy chicken morsels tossed in signature sweet and tangy orange sauce.", price_small: 10.95, price_large: 14.95 },
    { name: "Kung Pao Beef", description: "Sliced beef stir-fried with peanuts, vegetables, and chili peppers.", price_small: 11.50, price_large: 15.50 }
  ],
  "A": [
    { name: "Egg Rolls (2)", description: "Crispy fried rolls filled with seasoned pork and fresh vegetables.", price_small: null, price_large: 5.25 },
    { name: "Steamed Dumplings (6)", description: "Handmade pork dumplings served with savory soy dipping sauce.", price_small: null, price_large: 8.95 }
  ],
  "S": [
    { name: "Hot and Sour Soup", description: "Classic spicy and tangy broth loaded with mushrooms, tofu, and bamboo shoots.", price_small: 4.50, price_large: 7.50 },
    { name: "Wonton Soup", description: "Pork wontons served in a rich clear chicken broth with scallions.", price_small: 4.25, price_large: 7.25 }
  ],
  "C": [
    { name: "General Tso's Chicken", description: "Deep-fried chicken chunks coated in a spicy garlic sauce.", price_small: 11.95, price_large: 15.95 },
    { name: "Sesame Chicken", description: "Tender fried chicken coated in sweet sesame glaze.", price_small: 11.95, price_large: 15.95 }
  ],
  "B": [
    { name: "Mongolian Beef", description: "Sliced beef stir-fried with onions and green onions in sweet soy sauce.", price_small: 12.95, price_large: 16.95 },
    { name: "Beef with Broccoli", description: "Tender beef slices with fresh broccoli florets in brown garlic sauce.", price_small: 12.50, price_large: 16.50 }
  ]
};

function loadHome() {
  var html = `
    <div class="jumbotron">
      <img src="https://raw.githubusercontent.com/jhu-ep-coursera/fullstack-course4/master/examples/Lecture32/images/jumbotron_1200.jpg" alt="Picture of restaurant" class="img-responsive visible-md visible-lg">
    </div>

    <div id="home-tiles" class="row">
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div id="menu-tile" onclick="loadMenuCategories()"><span>Menu</span></div>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div id="specials-tile" onclick="loadSpecials()"><span>Specials</span></div>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <a href="https://maps.google.com" target="_blank">
          <div id="map-tile">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.675253818318!2d-76.7116431!3d39.3635903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c81a14e7817803%3A0xab20a0e99daa17ea!2s7105+Reisterstown+Rd%20Baltimore%20MD%2021215!5e0!3m2!1sen!2sus!4v1" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
            <span>Map</span>
          </div>
        </a>
      </div>
    </div>
  `;
  document.getElementById("main-content").innerHTML = html;
}

function loadMenuCategories() {
  var html = `<h2 class="text-center page-title">Menu Categories</h2><div class="row">`;
  
  menuCategories.forEach(function(cat) {
    html += `
      <div class="col-md-3 col-sm-4 col-xs-6 text-center">
        <div class="category-tile" onclick="loadCategoryItems('${cat.short_name}')">
          <img src="${cat.image}" alt="${cat.name}">
          <span>${cat.name}</span>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  document.getElementById("main-content").innerHTML = html;
}

function loadCategoryItems(categoryShortName) {
  var catObj = menuCategories.find(c => c.short_name === categoryShortName);
  var items = menuItems[categoryShortName] || [];

  var html = `
    <h2 class="text-center page-title">${catObj ? catObj.name : 'Menu'} Menu</h2>
    <div class="text-center" style="margin-bottom: 20px;">
      <button class="btn btn-warning" onclick="loadMenuCategories()">&laquo; Back to Categories</button>
    </div>
    <div class="row">
  `;

  items.forEach(function(item) {
    html += `
      <div class="col-md-6 col-sm-12">
        <div class="menu-item-tile">
          <div class="menu-item-photo">
            <img src="${catObj.image}" alt="${item.name}">
          </div>
          <div class="menu-item-description">
            <h3 class="menu-item-name">${item.name}</h3>
            <p class="menu-item-details">${item.description}</p>
            <p class="menu-item-price">
              ${item.price_small ? 'Pint: $' + item.price_small.toFixed(2) + ' | ' : ''}
              Quart: $${item.price_large.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  document.getElementById("main-content").innerHTML = html;
}

function loadSpecials() {
  var randomIndex = Math.floor(Math.random() * menuCategories.length);
  var randomCategory = menuCategories[randomIndex].short_name;
  loadCategoryItems(randomCategory);
}

// Initial load
document.addEventListener("DOMContentLoaded", function() {
  loadHome();
});
