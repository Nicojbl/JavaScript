const IVA = 1.22
let seleccionado = 1
let total = 0

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
    }
    precioConIva() {
        return this.precio * IVA
    }
    descontarStock(unidades) {
        return this.stock = this.stock - unidades
    }
}

const carrito = []

const producto1 = new Producto("Monopatin", 500, 50)
const producto2 = new Producto("Moto", 1000, 35)
const producto3 = new Producto("Bici", 300, 28)

function agregarAlCarrito(seleccionado) {
    switch(seleccionado) {
        case 1:
            carrito.push(producto1)
            console.log("El producto sleccionado es " + producto1.nombre + " con un precio de: $ "+ producto1.precioConIva())
            break;

        case 2:
            carrito.push(producto2)
            console.log("El producto sleccionado es " + producto2.nombre + " con un precio de: $ "+ producto2.precioConIva())
            break;
        
        case 3:
            carrito.push(producto3)
            console.log("El producto sleccionado es " + producto3.nombre + " con un precio de: $ "+ producto3.precioConIva())
            break;
    }

}

while(seleccionado != 0){
    seleccionado = parseInt(prompt("Cuales deseas comprar? \n 1-Monopatin \n 2-Moto \n 3-bici \n 0-Salir"));
    agregarAlCarrito(seleccionado);
}

for (item of carrito){
    total += item.precioConIva()
}
console.log(total)