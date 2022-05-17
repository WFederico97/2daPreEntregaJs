/*Saludo al usuario */
const saludar = () => {
    let saludo = document.querySelector("#saludoIndex");
    let inputNombre = document.querySelector('#inputNombre')
    let formSaludo = document.querySelector('#formSaludo')
    
    formSaludo.addEventListener('submit', (e) =>{
        e.preventDefault();
        saludo.innerHTML = `<h1>¡Bienvenido! ${inputNombre.value.toUpperCase()}, esto es Alianza .</h1>`
    });
};
saludar();

//Inventario
class Seguro {
    constructor(id,nombre,precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const seguro1 = new Seguro(1,"La Meridional",5000);
const seguro2 = new Seguro(2,"Hogar Sano",2400);
const seguro3 = new Seguro(3,"Suarez & Martinez",8000);


let carrito = JSON.parse(localStorage.getItem('seguros')) ?? []
let seguros = [seguro1,seguro2,seguro3]

let bodyCarrito = document.querySelector("#canvaCarritoBody")
let botonSeguro1 = document.querySelector('#boton1')
let botonSeguro2 = document.querySelector('#boton2')
let botonSeguro3 = document.querySelector('#boton3')
let botonVaciar = document.querySelector('#btnVaciarCarrito')
let seguroTotal = document.querySelector('#total')



botonSeguro1.addEventListener('click', () =>{
    if(carrito.some(seguro => seguro.nombre === 'La Meridional')){
        let index = carrito.findIndex(seguro => seguro.nombre === 'La Meridional')
        carrito[index].cant++
    }else{
        let seguro1Elegido = {
            ...seguro1, 
            cant: 1
        }
        carrito.push(seguro1Elegido)
    }
    localStorage.setItem('seguros', JSON.stringify(carrito))
})
botonSeguro2.addEventListener('click', ()=>{
    if(carrito.some(seguro => seguro.nombre === 'Hogar Sano')){
        let index = carrito.findIndex(seguro => seguro.nombre === 'Hogar Sano')
        carrito[index].cant++
    }else{
        seguro2Elegido = {
            ...seguro2,
            cant:1
        }
        carrito.push(seguro2Elegido)
    }
    localStorage.setItem('seguros', JSON.stringify(carrito))
})
botonSeguro3.addEventListener('click', () =>{
    if(carrito.some(seguro => seguro.nombre === 'Suarez & Martinez')){
        let index = carrito.findIndex(seguro => seguro.nombre === 'Suarez & Martinez')
        carrito[index].cant++
    }else{
        seguro3Elegido = {
            ...seguro3,
            cant: 1
        }
        carrito.push(seguro3Elegido)
    }
    localStorage.setItem('seguros', JSON.stringify(carrito))
})

carrito.forEach(seguros => {
    bodyCarrito.innerHTML += `
        <div class="card border-secondary mb-3 bg-dark " style="max-width: 20rem;">
            <div class="card-header">${seguros.nombre}</div>
                <div class="card-body">
                <p class="card-text">$${seguros.precio}</p>
                <p class="card-text">${seguros.cant}</p>
            </div>
        </div>
    `
})

const vaciarCarrito = () => {
    botonVaciar.addEventListener('click', () => {
        bodyCarrito.innerHTML = ""
        carrito.splice(0, carrito.length);
        seguroTotal.textContent = `Total: 0`;
        console.log(carrito.length)
    })
}

let mostrarTotal = () =>{
    
    let precioFinal = carrito.reduce((acc, ite)=>acc + ite.precio * ite.cant ,0)
    seguroTotal.innerHTML += `<h6 class="bg-danger">El total es : $${precioFinal}</h6>`
    ;
}
mostrarTotal()
vaciarCarrito()