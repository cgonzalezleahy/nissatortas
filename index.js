Swal.fire({
    title: 'BIENVENIDO A NISSA TORTAS!',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.vendido = false;
    }
}

const buscando = productos.find(producto => producto.id === 3)
console.log(buscando)

const existe = productos.some(productos => producto.nombre === "Tarta de pera")
console.log(existe)

const baratos = productos.filter(producto => producto.precio < 2500)
console.log(baratos)

const listaNombres = productos.map(producto => producto.nombre)
console.log(listaNombres);

let boton = document.getElementById("btnMain")
boton.onclick = () => {console.log("Click")}
boton.onmoousemove = () => {console.log("Move")}

const lista = document.getElementById("lista");
fetch("./data.json")
.then(resp => resp.json())
.then(productos => {
    productoExtra.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p>${producto.precio}</p>
            <p>codigo: ${producto.id}</p>
            <hr/>
        `;
        lista.append(li)

    });

})

const baseDeDatos = [{id: 1, producto:"torta oreo", precio: 2900},
                    {id: 2, producto:"choco oreo", precio: 2900},
                    {id: 3, producto:"chocotorta", precio: 2800},
                    {id: 4, producto:"chocotorta 2", precio: 2800},
                    {id: 5, producto:"doble oreo", precio: 5000},
                    {id: 6, producto:"marquise clasica", precio: 2800},
                    {id: 7, producto:"marquise oreo", precio: 3300},
                    {id: 8, producto:"marquise frutillas", precio: 3700},
                    {id: 9, producto:"rogel", precio: 3300},
                    {id: 10, producto:"turron de quacker", precio: 3000},
                    {id: 11, producto:"tiramisu", precio: 2900},
                    {id: 12, producto:"cheesecake", precio: 3400},
                    {id: 13, producto:"pavlova frutillas", precio: 3800},
                    {id: 14, producto:"pavlova arandanos", precio: 3900},
                    {id: 15, producto:"pavlova frutal", precio: 4000},
                    {id: 16, producto:"tarta de coco", precio: 2700},
                    {id: 17, producto:"tarta de frutilla", precio: 3800},
                    {id: 18, producto:"tarta de durazno", precio: 3400},
                    {id: 19, producto:"lemon pie", precio: 3300},
                    {id: 20, producto:"letter cake", precio: 4000},
                    {id: 21, producto:"number cake", precio: 4000},
                    {id: 22, producto:"letter and number cake", precio: 7400},
                    {id: 23, producto:"box sorpresa 1", precio: 2500},
                    {id: 24, producto:"box sorpresa 2", precio: 3000},
                    {id: 25, producto:"box sorpresa 3", precio: 2000},
                    {id: 26, producto:"docena shots", precio: 3000},
                    {id: 27, producto:"congelados 280gr", precio: 600},
                    {id: 28, producto:"congelados 200gr", precio: 500}];
 
for (const producto of productos){
    guardarStorage(producto.id, JSON.stringify(producto))
}

localStorage.setItem("carrito", JSON.stringify(productos));

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;
  const itemImage = item.querySelector('.item-image').src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}