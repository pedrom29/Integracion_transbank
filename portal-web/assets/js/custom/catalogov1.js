let carrito = [];

function load() {
  fetch("assets/data.json")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error al obtener data.json");
      }
    })
    .then(data => {
      let cards = "";
      data.forEach(producto => {
        cards += `
          <div class="col-sm m-3">
            <div class="card m-auto" style="width: 18rem;">
              <img src="${producto.imagen}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${producto.titulo}</h5>
                <p class="card-text text-truncate">${producto.descripcion}</p>
                <h6 class="text">$${producto.precio}</h6>
                <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.titulo}', '${producto.descripcion}', ${producto.precio})">AGREGAR AL CARRITO</button>
              </div>
            </div>
          </div>`;
      });

      const catalogoHTML = document.getElementById("catalogo");
      catalogoHTML.innerHTML = cards;
    })
    .catch(error => {
      console.error(error);
    });
}

function agregarAlCarrito(titulo, descripcion, precio) {
  const producto = {
    titulo: titulo,
    descripcion: descripcion,
    precio: precio
  };

  carrito.push(producto);
  console.log("Producto agregado al carrito:", producto);
  renderizarCarrito();
}

function renderizarCarrito() {
  const carritoHTML = document.getElementById("carrito");

  if (carrito.length === 0) {
    carritoHTML.innerHTML = "<p>El carrito está vacío</p>";
  } else {
    let carritoItems = "";
    carrito.forEach(producto => {
      carritoItems += `
        <div class="carrito-item">
          <h5>${producto.titulo}</h5>
          <p>${producto.descripcion}</p>
          <h6>$${producto.precio}</h6>
        </div>
      `;
    });

    carritoHTML.innerHTML = carritoItems;
  }
}

function create() {
  const carritoDataInput = document.getElementById("carritoData");
  carritoDataInput.value = JSON.stringify(carrito);
}

load();
