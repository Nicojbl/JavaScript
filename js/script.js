// Carrito array
const cart = [];

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
    const total = cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
    cart.forEach(product => {
        div.innerHTML += `
            <div class="cartItem">
                <h4 class="cartProd">Producto: ${product.name}</h4>
                <h4 class="cartPrice">Precio: ${product.price}</h4>
                <h4 class="cartCant">Cantidad: ${product.cantidad}</h4>
            </div>`;
    })
    div.innerHTML += `
    <h4 class="cartTotal">Total: US$ ${total}</h4>`
    containerCart.appendChild(div);
}

// Se eligen los productos
const loadEvents = () => {
    let buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let prod = cart.find(product => product.id == button.id);
            if (prod) {
                prod.cantidad++;               
            } else {
                let prod = Products.find(product => product.id == button.id);
                if(prod) {
                    let newProduct = {
                        id: prod.id,
                        name: prod.name,
                        price: prod.price,
                        description: prod.description,
                        image: prod.image,
                        cantidad: 1
                    }
                    cart.push(newProduct);
                }   
            }
            addToCart(cart);
        });
    });
}

// Se cargan los productos
const loadProducts = (Products) => 
{
    let containerProd = document.querySelector('#containerProd');
    Products.forEach(product => {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>US$ ${product.price}</h3>
            <h4>${product.name}</h4>
            <button class="button" id="${product.id}">Enviar al carrito</button>
        `;
        containerProd.appendChild(div);
    })
    loadEvents();
}
loadProducts(Products);
