let url =
  'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1';
let allProductsFromSource = [];
let allProductsNow = [];

window.addEventListener('load', () => {
  fetchProducts();
  enableLoadMoreButton();
});

async function fetchProducts() {
  const resource = await fetch(url);
  const json = await resource.json();

  url = `https://${json.nextPage}`;
  allProductsFromSource = json.products;
  allProductsNow = [...allProductsNow, ...allProductsFromSource];

  renderProductsDisplay();
}

function enableLoadMoreButton() {
  const loadMoreButton = document.querySelector('#loadMoreButton');
  loadMoreButton.addEventListener('click', fetchProducts);
}

function renderProductsDisplay() {
  let productsHTML = '<div>'; //opening a div section

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
      <div class="productCard" style="display: flex">
        <div>
          <img src="${image}" alt=" foto de ${name}" />
        </div>
        <div>
          <p>${name}</p>
          <p>${description}</p>
          <ul>
            <li>${oldPrice}</li>
            <li>${price}</li>
            <li>${installments.count}</li>
            <li>${installments.value}</li>
          </ul>
        </div>
      </div>
    `;

    productsHTML += productHTML;
  });

  productsHTML += '</div>'; //closing div section

  productsDisplay.innerHTML = productsHTML;
}
