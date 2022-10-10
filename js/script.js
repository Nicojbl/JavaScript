// Carrito array
const products = [];
let cart = [];

// localstorage
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addToCart(cart);
    }
});

// alertas 
const alert = () => {
    let buttonBuy = document.querySelector('.buttonBuy');
    buttonBuy.addEventListener('click', () => {
        if(cart.length > 0) {
            localStorage.removeItem('cart');
            cart = [];
            addToCart(cart);
            Swal.fire('La compra se ha realizado con exito!');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione un producto',
              });
        }
    });
}

const alertToast = () => {
    Swal.fire({
        toast: true,
        title: 'Se agrego un producto al carrito',
        timer: 3000,
        position: 'top',
        showConfirmButton: false,
        background: 'rgb(23, 219, 105)',
        color: 'white',
    })
}

// eliminar productos del carrito
const eliminarProd = () => {
    let buttonDelete = document.querySelectorAll('.buttonDelete');
    buttonDelete.forEach(button => {
        button.addEventListener('click', () => {
            let prod = cart.find(product => product.id == button.id);
            if(prod.cantidad > 1) {
                prod.cantidad--;
            } else {
                let index = cart.findIndex(product => product.id == button.id);
                cart.splice(index,1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            addToCart(cart);
         });
    });
}

// Los productos se agregan al carrito
const addToCart = (cart) => {
    let containerCart = document.querySelector('#containerCart');
    let container = document.querySelector('#cart');
    if(container) {
        container.parentNode.removeChild(container);
    }
    let div = document.createElement('div');
    div.setAttribute('id', 'cart');
    div.innerHTML += `<h2>Carrito</h2>`;
    const total = cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
    cart.forEach(product => {
        const totalProd = (product.price * product.cantidad);
        div.innerHTML += `
            <div class="cartItem">
                <h4 class="cartProd">Producto: ${product.name}</h4>
                <h4 class="cartPrice">Precio: ${totalProd}</h4>
                <h4 class="cartCant">Cantidad: ${product.cantidad}</h4>
                <img class="buttonDelete" id="${product.id}" src="img/eliminar.png" alt="boton de borrar">
            </div>`;
    });
    div.innerHTML += `
    <h4 class="cartTotal">Total: US$ ${total}</h4>
    <button class="buttonBuy">REALIZAR COMPRA</button>`
    containerCart.appendChild(div); 
    eliminarProd();
    alert();
}

// Se eligen los productos
const loadEvents = () => {
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let prod = cart.find(product => product.id == button.id);
            alertToast();
            if (prod) {
                prod.cantidad++;               
            } else {
                let prod = products.find(product => product.id == button.id);
                if(prod) {
                    let newProduct = {
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        cantidad: 1
                    }
                    cart.push(newProduct);
                }   
            }
            addToCart(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
}

// Se cargan los productos
const loadProducts = (products) => {
    let containerProd = document.querySelector('#containerProd');
    products.forEach(product => {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>US$ ${product.price}</h3>
            <h4>${product.name}</h4>
            <button class="button" id="${product.id}">Enviar al carrito</button>
        `;
        containerProd.appendChild(div);
    });
    loadEvents();
}

// fletch
const getData = async () => {
    try {
        const response = await fetch('https://nicojbl.github.io/JavaScript/bdd/products.json'); // esta ruta es por que me tiraba error el pages de githab
        const data = await response.json();
        loadProducts(data);
        products.push(...data);
    } catch(error) {
        console.error(error);
    }
}
getData();

