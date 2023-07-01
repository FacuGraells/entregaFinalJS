//carrito
     
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h2 class"modal-header-title">carrito.</h2>
    `;
    modalContainer.append(modalHeader);
    
    const modalButton = document.createElement("h2");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.append(modalButton);


    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <p>Cantidad: ${product.cantidad}</p>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌ </span>
        `;
        modalContainer.append(carritoContent);
        
        console.log(carrito.length);

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", ()=>{
            eliminarProducto(product.id);
        });

        
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡El producto se eliminará del carrito!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    pintarCarrito();
    }
  });
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    cantidadCarrito.innerText = carrito.length;
};
