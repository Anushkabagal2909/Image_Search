const accessKey = "PA0dS9_4jRwxDMpmkTYa7vbV4Go6XvvtCXFdOvzuCFg";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.querySelector(".show");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    // Clear previous results
    searchResults.innerHTML = "";

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageLink.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    // Show/hide "Click here" message based on search results
    const Clickhere = document.querySelectorAll(".search-result");
    if (results.length > 0) {
        showMore.style.display = "block";
        Clickhere.forEach((result) => {
            result.style.display = "block";
        });
    } else {
        showMore.style.display = "none";
        Clickhere.forEach((result) => {
            result.style.display = "none";
        });
    }
}

// Change the event listener to target the search button
document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Search button clicked!"); // Debugging
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});


