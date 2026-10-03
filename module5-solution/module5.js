// STEP 0: Set up categories URL & home HTML snippet URL
var homeHtmlUrl = "snippets/home-snippet.html";
var allCategoriesUrl =
  "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";

// STEP 1: Build the function to choose a random category
function chooseRandomCategory(categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

// STEP 2: Inside buildAndLoadHomeHTML, retrieve categories via AJAX,
// pick a random short_name, and inject it into homeHtml
function buildAndLoadHomeHTML(categories) {
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtmlSnippet) {
      // Choose a random category from the retrieved categories array
      var randomCategory = chooseRandomCategory(categories);
      var randomCategoryShortName = "'" + randomCategory.short_name + "'";

      // Replace {{randomCategoryShortName}} in the snippet template
      var homeHtmlToInsertIntoMainPage = insertProperty(
        homeHtmlSnippet,
        "randomCategoryShortName",
        randomCategoryShortName
      );

      // Insert the produced HTML into the main view
      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
    },
    false // False because it's an HTML snippet, not JSON
  );
}

// STEP 3: Load the home page on initial load
document.addEventListener("DOMContentLoaded", function (event) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndLoadHomeHTML,
    true // True because categories URL returns JSON
  );
});
