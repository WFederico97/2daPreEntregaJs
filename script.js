
//Inventario
class Seguro {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const seguro1 = new Seguro(0, "La Meridional", 5000, 1);
const seguro2 = new Seguro(1, "Hogar Sano", 2400, 1);
const seguro3 = new Seguro(2, "Suarez & Martinez", 8000, 1);


let carrito = JSON.parse(localStorage.getItem('seguros')) ?? []; //Operador ternario "nullish ??"
let seguros = [seguro1, seguro2, seguro3];

let bodyCarrito = document.querySelector("#canvaCarritoBody");
let seguroTotal = document.querySelector('#total');

let añadirProducto = (e) => {
    if (carrito.find(seguro => seguro.id == e.target.id)) {
        for (let index = 0; index < carrito.length ; index++) {
            const seguro = carrito[index];
            if (seguro.id == e.target.id) {
               seguro.cantidad++
            }
        }
    } else
        carrito.push(seguros[e.target.id])
    localStorage.setItem('carrito', JSON.stringify(carrito))

    subtotal()
};

let subtotal = () => {
    bodyCarrito.innerHTML = ``
    carrito.forEach(Seguro => {
        bodyCarrito.innerHTML += `
            <div class="card border-secondary bg-info mb-3 bg-dark " style="max-width: 20rem;">
                <div class="card-header">
                    <h2 class="text-light fs-bold" >${Seguro.nombre}</h2>
                </div>
                <div class="card-body">
                    <p class="card-text fs-bold">$${Seguro.precio}</p>
                    <p class="card-text">${Seguro.cantidad}</p>
                </div>
            </div>
        `
    });

    mostrarTotal();

};

let mostrarTotal = () => {

    let precioFinal = carrito.reduce((acc, ite) => acc + ite.precio * ite.cantidad, 0) ///Operador Avanzado REDUCE
    seguroTotal.innerHTML = `  
    <div class="card  bg-success style="width: 18rem;">
        <h2 class="card-header text-light" >El total es : </h2>
        <div class="card-body" style="width: 18rem;">
            <h3 class="card-text text-light">$ ${precioFinal} </h3>
        </div>
    </div>    
        `
    ;

};

const vaciarCarrito = () => {
    carrito = []
    bodyCarrito.innerHTML = ""
    seguroTotal.innerHTML = '';

    localStorage.setItem("carrito", JSON.stringify(carrito))

};
