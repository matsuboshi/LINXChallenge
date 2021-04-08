let url =
  'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1';
let allProductsFromSource = [];
let allProductsNow = [];

window.addEventListener('load', () => {
  fetchProducts();
  enableLoadMoreButton();
});

//It fetches data from API endpoint when loading the page for the first time or when requested through the "LOAD MORE PRODUCTS" button
async function fetchProducts() {
  const resource = await fetch(url);
  const json = await resource.json();

  url = `https://${json.nextPage}`;
  allProductsFromSource = json.products;
  allProductsNow = [...allProductsNow, ...allProductsFromSource];

  renderProductsDisplay();
}

//This function enables the EVENT LISTENER on the "LOAD MORE PRODUCTS" button
function enableLoadMoreButton() {
  const loadMoreButton = document.querySelector('#loadMoreButton');
  loadMoreButton.addEventListener('click', fetchProducts);
}

//This function renders all the products every time the "allProductsNow" array is updated
function renderProductsDisplay() {
  let productsHTML = '<div class="cardsDiv">'; //opening a div section

  allProductsNow.forEach((features) => {
    const {
      id,
      name,
      image,
      oldPrice,
      price,
      description,
      installments,
    } = features;

    const productHTML = `
      <div class="productCard">
        <div class="imageDiv">
          <img src="${image}" alt=" foto de ${name}" />
        </div>
        <div class="infoDiv">
          <p class="cardName">${name}</p>
          <p class="cardDescription">${description}</p>
          <p class="cardOldPrice">De: R$${oldPrice.toFixed(2)}</p>
          <p class="cardPrice">Por: R$${price.toFixed(2)}</p>
          <p class="cardInst">
            ou ${installments.count}x de R$${installments.value.toFixed(2)}
          </p>
          <button id="${id}" class="cardButton">Comprar</button>
        </div>
      </div>
    `;

    productsHTML += productHTML;
  });

  productsHTML += '</div>'; //closing div section

  productsDisplay.innerHTML = productsHTML;
}
