document.addEventListener("DOMContentLoaded", function () {
  // === XML RULES ===
  const xmlButton = document.getElementById("btn1");
  const xmlPanelBody = document.querySelector("#xml1 .card-body");
  const xmlSearchInput = document.getElementById("xmlSearch");
  let xmlRulesData = [];

  function renderXML(rules) {
    let html = `
      <h1 class="mb-2">XML Syntax Rules</h1>
      <p class="mb-4">6 important rules that must be adhered to in order to create a valid XML file:</p>
      <div class="row g-4">
    `;

    for (let rule of rules) {
      html += `
        <div class="col-12 col-md-6 xml-rule">
          <div class="p-3 border border-1 border-black rounded-0 bg-body-secondary h-100">
            <h5 class="fw-bold">${rule.heading}</h5>
            <p>${rule.description}</p>
            <pre class="bg-body-secondary p-2 border">${rule.example}</pre>
          </div>
        </div>
      `;
    }

    html += '</div>';
    xmlPanelBody.innerHTML = html;
  }

  function loadXMLRules() {
    fetch("xml-rules.xml")
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.text();
      })
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const rules = data.getElementsByTagName("rule");
        xmlRulesData = Array.from(rules).map(rule => ({
          heading: rule.getElementsByTagName("heading")[0].textContent,
          description: rule.getElementsByTagName("description")[0].textContent,
          example: rule.getElementsByTagName("example")[0].textContent
        }));
        renderXML(xmlRulesData);
      })
      .catch(err => {
        xmlPanelBody.innerHTML = `<div class="text-danger">Failed to load XML: ${err.message}</div>`;
      });
  }

  xmlButton.addEventListener("change", function () {
    if (xmlButton.checked) {
      loadXMLRules();
    }
  });

  if (xmlButton.checked) {
    xmlButton.dispatchEvent(new Event("change"));
  }

  xmlSearchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = xmlRulesData.filter(rule =>
      rule.heading.toLowerCase().includes(query) ||
      rule.description.toLowerCase().includes(query) ||
      rule.example.toLowerCase().includes(query)
    );
    renderXML(filtered);
  });

  // === RSS FEED ===
  const rssSearchInput = document.getElementById("rssSearch");
  let rssItemsData = [];

  function renderRSS(items) {
    const container = document.getElementById("rssFeed");
    let html = items.map(item => `
      <div class="col-12 col-md-6 pt-2 rss-item">
        <div class="p-3 border border-1 border-black rounded-0 bg-body-secondary h-100">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <p style="font-style: italic; color:blue;">${item.pubdate}</p>
          <p><a href="${item.link}" target="_blank">Read more</a></p>
        </div>
      </div>
    `).join('');
    container.innerHTML = html;
  }

  function loadRSS() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = "http://feeds.bbci.co.uk/news/rss.xml";
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", proxy + url, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const items = this.responseXML.getElementsByTagName("item");
        rssItemsData = Array.from(items).map(item => ({
          title: item.getElementsByTagName("title")[0].textContent,
          link: item.getElementsByTagName("link")[0].textContent,
          description: item.getElementsByTagName("description")[0].textContent,
          pubdate: item.getElementsByTagName("pubDate")[0].textContent
        }));
        renderRSS(rssItemsData);
      }
    };
  }

  rssSearchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = rssItemsData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.pubdate.toLowerCase().includes(query)
    );
    renderRSS(filtered);
  });

  // Optional: auto-load RSS on page load
  loadRSS();
});


document.addEventListener("DOMContentLoaded", () => {
    const products = [
        {
            title: "Tablet: Samsung",
            image: "images/tablet_samsung.jpg",
            alt: "Samsung",
            description: "Stylish with a touch of cool, the Galaxy Tab A9+ features a sleek design and a smooth metal body. Enjoy Samsung's signature tablet design in Graphite, Silver and Navy with each hue highlighting effortless charm."
        },
        {
            title: "Tablet: Lenovo",
            image: "images/tablet_lenovo.jpg",
            alt: "Lenovo",
            description: "Unlock a world of cinematic brilliance on the Lenovo Tab M11 tablet. Discover ultra-crisp streaming on an 11\" display*, and with quad speakers optimized by Dolby Atmos, young minds can explore immersive audio landscapes."
        },
        {
            title: "Tablet: Oppo",
            image: "images/tablet_oppo.jpg",
            alt: "Oppo",
            description: "Featuring a stunning 2.4K high resolution and 11.4 inches large screen, the OPPO Pad Neo displays vividly showcase every exciting moment. The signature 7:5 aspect ratio ReadFit Screen expands your viewing area and provides a book-like reading experience."
        }
    ];
    const autoCarouselInner = document.getElementById("autoCarouselInner");

    products.forEach((product, index) => {
        const slide = document.createElement("div");
        slide.className = "carousel-item" + (index === 0 ? " active" : "");
        slide.innerHTML = `
    <div class="d-flex flex-column align-items-center text-center p-4">
      <h3 class="fw-bold">${product.title}</h3>
      <img src="${product.image}" class="carouselimg img-fluid" alt="${product.alt}">
      <p class="p-4">${product.description}</p>
    </div>
  `;
        autoCarouselInner.appendChild(slide);
       
    });

    const manualCarouselInner = document.getElementById("manualCarouselInner");

    // Inject slides
    products.forEach((product, index) => {
        const slide = document.createElement("div");
        slide.className = "carousel-item" + (index === 0 ? " active" : "");
        slide.innerHTML = `
        <div class="d-flex flex-column align-items-center text-center p-4">
          <h3 class="fw-bold">${product.title}</h3>
          <img src="${product.image}" class="carouselimg img-fluid" alt="${product.alt}">
          <p class="p-4">${product.description}</p>
        </div>
      `;
        manualCarouselInner.appendChild(slide);
    });

    // Manual controls
    let manualIndex = 0;
    const manualItems = manualCarouselInner.querySelectorAll(".carousel-item");

    function showManualSlide(index) {
        manualItems.forEach((item, i) => {
            item.classList.remove("active");
            if (i === index) item.classList.add("active");
        });
    }

    document.getElementById("manualPrevBtn").addEventListener("click", () => {
        manualIndex = (manualIndex - 1 + manualItems.length) % manualItems.length;
        showManualSlide(manualIndex);
    });

    document.getElementById("manualNextBtn").addEventListener("click", () => {
        manualIndex = (manualIndex + 1) % manualItems.length;
        showManualSlide(manualIndex);
    });
});


function displayFilteredProducts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const filteredProducts = productObjects.filter(product => {
        if (!product || typeof product.title !== "string" || typeof product.description !== "string") {
            return false;
        }
        return (
            product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword)
        );
    });

    let filteredHTML = "";
    filteredProducts.forEach(product => {
        filteredHTML += product.render();
    });

    if (filteredProducts.length === 0) {
        filteredHTML = `<div class="col-12"><p class="text-center text-muted">No products found.</p></div>`;
    }

    const grid = document.getElementById("product-grid-panel4");
    if (grid) grid.innerHTML = filteredHTML;
}


class Product {
    constructor(id, title, price, image_url, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image_url = image_url;
        this.description = description;
    }

    render() {
        return `
      <div class="col-12 col-md-4 p-2">
        <div class="card h-100">
        <div class="card-body d-flex flex-column bg-warning rounded-0 border border-dark border-1">
        <h5 class="card-title text-center rounded-0">${this.title}</h5>
        <img src="${this.image_url}" class="card-img-top img-fluid" alt="${this.title}">
            <p class="fw-bold">${this.price}</p>
            <p class="card-text">${this.description}</p>
            <button class="btn btn-light mt-auto rounded-0" onclick="addToCartUpdate(${this.id})">ADD TO CART</button>
          </div>
        </div>
      </div>
    `;
    }
}

const productData = [
    { id: 0, title: "Samsung Tablet", price: "$299", image_url: "images/tablet_samsung.jpg", description: "Galaxy Tab A9+ with sleek metal body and immersive display." },
    { id: 1, title: "Lenovo Tab M11", price: "$249", image_url: "images/tablet_lenovo.jpg", description: "11\" display with Dolby Atmos quad speakers for cinematic sound." },
    { id: 2, title: "OPPO Pad Neo", price: "$279", image_url: "images/tablet_oppo.jpg", description: "2.4K resolution and ReadFit screen for vivid viewing." },
    { id: 3, title: "Apple iPad 10th Gen", price: "$449", image_url: "images/tablet_apple.jpg", description: "A14 Bionic chip, 10.9\" Liquid Retina display, USB-C port." },
    { id: 4, title: "Amazon Fire HD 10", price: "$149", image_url: "images/tablet_amazon.jpg", description: "Affordable tablet with Alexa, 1080p display, and long battery life." },
    { id: 5, title: "Microsoft Surface Go 3", price: "$399", image_url: "images/tablet_microsoft.jpg", description: "2-in-1 tablet with Windows 11 and touchscreen versatility." }
];

const productObjects = [];
let itemNumber = 0;

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("product-grid-panel4");
    let productHTML = "";

    productData.forEach((data) => {
        const product = new Product(data.id, data.title, data.price, data.image_url, data.description);
        productObjects.push(product);
        productHTML += product.render();
    });

    if (grid) grid.innerHTML = productHTML;
});

function addToCartUpdate(id) {
    itemNumber++;
    const cart = document.getElementById("shopping-cart-panel4");

    const cartItem = document.createElement("div");
    cartItem.id = `item-${itemNumber}`;
    cartItem.className = "d-flex justify-content-between align-items-center mb-2";

    cartItem.innerHTML = `
    <span style="color: red; background: yellow; padding: 5px;">
      ${productObjects[id].title} — ${productObjects[id].price}
    </span>
    <button class="btn btn-sm btn-danger" onclick="removeItem('item-${itemNumber}')">REMOVE</button>
  `;

    cart.appendChild(cartItem);
}

function removeItem(itemID) {
    const item = document.getElementById(itemID);
    if (item) item.remove();
}

//Data: Assume we have a list of existing comments stored in an array "allComments"
let allComments = [{name: "Ian", comment: "Recommended, good one"},
				   {name: "Aman", comment: "I don't like the color"},
				   {name: "John", comment: "Love it"},
				  ];	
				  
//----------
//Load all existing comments and display them on HTML
function loadComments() {
	//Loop through all comments in the array "allComments"
	for (var i=0; i < allComments.length; i++) {
		let name = allComments[i].name;
		let comment = allComments[i].comment;		
		//
		//Create a new HTML node/element <P> to display this comment
		let node = document.createElement("P");
		let textnode = document.createTextNode(name + ": " + comment);
		node.appendChild(textnode);//Append the content (created TextNode) to the HTML Node (child)			
		let parrent_node = document.getElementById("comment-list");//Get the id of parent node "comment-list"		
		parrent_node.appendChild(node);//Append the above child HTML node to the parent node
	}
}

 loadComments();

//----------
//Add a new comment
function addComment() {	
	//Get entered value/data by user
	let enteredCommentName = document.getElementById("comment_name").value;
	let enteredCommentText = document.getElementById("comment_text").value;	
	
	//Add this new comment to the array
	allComments.push({name: enteredCommentName, comment: enteredCommentText});	
	alert("Thank you for your comment!");
	
	//Display this new comment on HTML page	
	//Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
	let node = document.createElement("P");
	//Create a new TextNode
	let textnode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
	//Append the content (created TextNode) to the HTML Node (child)
	node.appendChild(textnode);	
	//Get the id of parent node "comment-list"
	let parrent_node = document.getElementById("comment-list");
	//Append the above child HTML node to the parent node
	parrent_node.appendChild(node);
	
	//Clear comment box
	document.getElementById("comment_name").value = "";
	document.getElementById("comment_text").value = "";
}

const products = [
  { title: "Samsung Tablet", price: 2244, image: "images/tablet_samsung.jpg" }
];

function populateDropdown() {
  const dropdown = document.getElementById("productDropdown");
  dropdown.innerHTML = "";
  products.forEach((product, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = product.title;
    dropdown.appendChild(option);
  });
  displayProduct();
}

function displayProduct() {
  const index = document.getElementById("productDropdown").value;
  const product = products[index];
  const details = `
    <h4>${product.title}</h4>
    <p>Price: ${product.price}</p>
   <img src="${product.image}" alt="${product.title}" class="img-fluid w-100">

  `;
  document.getElementById("productDetails").innerHTML = details;
}

function addToList() {
  const title = document.getElementById("newTitle").value.trim();
  const price = parseFloat(document.getElementById("newPrice").value);
  const image = document.getElementById("newImage").value.trim();

  if (!title || isNaN(price) || !image) {
    alert("Please fill in all fields correctly.");
    return;
  }

  products.push({ title, price, image });
  populateDropdown();

  document.getElementById("newTitle").value = "";
  document.getElementById("newPrice").value = "";
  document.getElementById("newImage").value = "";
}

window.onload = populateDropdown;



