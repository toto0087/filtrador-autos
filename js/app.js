// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');
const puertas = document.querySelector('#puertas');
const maximo = document.querySelector('#maximo');
const minimo = document.querySelector('#minimo');

// Contenedor de resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10

// Objeto de busqueda
const datosBusqueda = {
    puertas : '',
    transmision : '',
    color : '',
    year : '',
    maximo : '',
    minimo : '',
    marca : '',
}




// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    
    // Llena las opciones de los años
    llenarSelect();
})


// Event listener para formularios de select de busqueda
    marca.addEventListener('change', (e) =>  {
        datosBusqueda.marca = e.target.value;
        filtrarAuto();
    })
    year.addEventListener('change', (e) =>  {
        datosBusqueda.year = e.target.value;
        filtrarAuto()
    })
    color.addEventListener('change', (e) =>  {
        datosBusqueda.color = e.target.value;
        filtrarAuto();
    })
    transmision.addEventListener('change', (e) =>  {
        datosBusqueda.transmision = e.target.value;
        filtrarAuto();
    })
    puertas.addEventListener('change', (e) =>  {
        datosBusqueda.puertas = e.target.value;
        filtrarAuto();
    })
    maximo.addEventListener('change', (e) =>  {
        datosBusqueda.maximo = e.target.value;
        filtrarAuto();
    })
    minimo.addEventListener('change', (e) =>  {
        datosBusqueda.minimo = e.target.value;
        filtrarAuto();
    })


// Funciones
function mostrarAutos (autos) {
    limpiarHTML(); // Elimina el HTML
    autos.forEach( auto => {
        const {marca, modelo, year , puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');
        
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transimision ${transmision} - Precio: ${precio} Color: ${color}
        `;
        resultado.appendChild(autoHTML);
    })
}

// Limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for(i = max; i >= min; i--) {
        const opcion = document.createElement('option')
        opcion.value = i
        opcion.textContent = i
        year.appendChild(opcion)
    }
}


// Funcion que filtra en base a la busqueda
function filtrarAuto() {
    limpiarHTML();
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarColor ).filter( filtrarTransmision )
    if(resultado.length) {
      mostrarAutos(resultado);  
    } else {
        noResultado();
    }

    
}  

function noResultado () {
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
    
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if( year ) {
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;
    if( maximo ) {
        return auto.precio >= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if( puertas ) {
        return auto.puertas === parseInt(puertas);
    }
    return auto;
}

function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if( color ) {
        return auto.color === color;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

