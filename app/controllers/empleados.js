// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_EMPLEADOS = '../../app/api/empleados.php?action=';
const ENDPOINT_TIPO = '../../app/api/tipo_empleado.php?action=readAll';

document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    fillSelect(ENDPOINT_TIPO,'tipoemp',null)
    readRows(API_EMPLEADOS);
    //readRows(ENDPOINT_TIPO);
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {       
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>   
                <td>${row.id_empleado}</td>             
                <td>${row.nombre_usuario}</td>
                <td>${row.nombre_emp}</td>
                <td>${row.apellido_emp}</td>
                <td>${row.telefono_emp}</td>
                <td>${row.estado}</td> 
                <td>${row.tipoemp}</td>  
                <td>
                    <a href="#" onclick="openUpdateDialog(${row.id_empleado})"class="btn"  data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</a> /
                    <a href="#" onclick="openDeleteDialog(${row.id_empleado})"class="btn">Eliminar</a>
                </td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-rows').innerHTML = content;
  
    // Se inicializa el componente Material Box asignado a las imagenes para que funcione el efecto Lightbox.
   // M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    // Se inicializa el componente Tooltip asignado a los enlaces para que funcionen las sugerencias textuales.

}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_EMPLEADOS, 'search-form');
});

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('save-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    
    saveRow(API_EMPLEADOS, 'create', 'save-form', null);
});


// Función para preparar el formulario al momento de modificar un registro.
function openUpdateDialog(id) {
    const data = new FormData();
    data.append('id_empleado', id);
    fetch(API_EMPLEADOS + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje indicando el problema.
        if (request.ok) {
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {        
                document.getElementById('id_empleado2').value = response.dataset.id_empleado;
                document.getElementById('nombre_usuario2').value = response.dataset.nombre_usuario;
                document.getElementById('nombre_emp2').value = response.dataset.nombre_emp;
                document.getElementById('apellido_emp2').value = response.dataset.apellido_emp;
                document.getElementById('telefono_emp2').value = response.dataset.telefono_emp;
                document.getElementById('estado2').value = response.dataset.estado;
                fillSelect(ENDPOINT_TIPO,'tipoemp2',value = response.dataset.id_tipo_empleado);
            } else {
                sweetAlert(2, response.exception, null);
            }
        });
    } else {
        console.log(request.status + ' ' + request.statusText);
    }
}).catch(function (error) {
    console.log(error);
});
}


document.getElementById('save-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = '';
    // Se comprueba si el campo oculto del formulario esta seteado para actualizar, de lo contrario será para crear.
    if (document.getElementById('id_empleado2').value) {
        action = 'update';
    } else {
        action = 'create';
    }
    saveRow(API_CLIENTES, action, 'save-form', 'save-modal');
}); 

document.getElementById('update-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    updateRow(API_EMPLEADOS, 'update', 'update-form', 'update-modal');
});

function openDeleteDialog(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id_empleado', id);
    // Se llama a la función que elimina un registro. Se encuentra en el archivo components.js
    confirmDelete(API_EMPLEADOS, data);
}
