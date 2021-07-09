// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_AGENDA = '../../app/api/agenda.php?action=';
const ENDPOINT_CLIENTES = '../../app/api/agenda.php?action=readClientes';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_AGENDA);

    // Se declara e inicializa un objeto para obtener la fecha y hora actual.
    let today = new Date();
    // Se declara e inicializa una variable para guardar el día en formato de 2 dígitos.
    let day = ('0' + today.getDate()).slice(-2);
    // Se declara e inicializa una variable para guardar el mes en formato de 2 dígitos.
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    // Se declara e inicializa una variable para guardar el año con la mayoría de edad.
    let year = today.getFullYear();
    // Se declara e inicializa una variable para establecer el formato de la fecha.
    let date = `${year}-${month}-${day}`;

    document.getElementById('fecha_pro').setAttribute('min', date);
    document.getElementById('fecha_nal').setAttribute('min', date);
    document.getElementById('fecha_pro2').setAttribute('min', date);
    document.getElementById('fecha_nal2').setAttribute('min', date);
    fillSelect(ENDPOINT_CLIENTES, 'cli-select', null);
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>
                <td>${row.nombre_cli}</td>
                <td>${row.nombre_usuario}</td>
                <td>${row.fecha_programacion}</td>
                <td>${row.hora_programacion}</td>
                <td>${row.fecha_provisional}</td>
                <td>${row.hora_provisional}</td>
                <td>${row.tarea}</td>
                <td>${row.estado_tarea}</td>
                <td>${row.observaciones}</td>
                <td>
                <a href="#" onclick="openUpdateDialog(${row.id_agenda})" class="btn"  data-bs-toggle="modal" data-bs-target="#UpdateModal">Editar</a>  /
                <a href="#" onclick="openDeleteDialog(${row.id_agenda})"class="btn">Eliminar</a>
                </td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-rows').innerHTML = content;
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('save-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    
    saveRow(API_AGENDA, 'create', 'save-form', null);
    document.getElementById('save-form').reset();
});

// Función para preparar el formulario al momento de modificar un registro.
function openUpdateDialog(id) {

    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id_agenda', id);

    fetch(API_AGENDA + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje indicando el problema.
        if (request.ok) {
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se inicializan los campos del formulario con los datos del registro seleccionado.
                    document.getElementById('id_agenda').value = response.dataset.id_agenda;
                    document.getElementById('fecha_pro2').value = response.dataset.fecha_programacion;
                    document.getElementById('hora_pro2').value = response.dataset.hora_programacion;
                    document.getElementById('fecha_nal2').value = response.dataset.fecha_provisional;
                    document.getElementById('hora_nal2').value = response.dataset.hora_provisional;
                    document.getElementById('tarea2').value = response.dataset.tarea;
                    document.getElementById('comentario').value = response.dataset.observaciones;
                    fillSelect(ENDPOINT_CLIENTES,'cli-select2',value = response.dataset.id_cliente);
                    document.getElementById('tarea-select2').value = response.dataset.estado_tarea;
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

    // Método manejador de eventos que se ejecuta cuando se envía el formulario de actualizar.
    document.getElementById('update-form').addEventListener('submit', function (event) {
        // Se evita recargar la página web después de enviar el formulario.
        event.preventDefault();
        
        updateRow(API_AGENDA, 'update', 'update-form', 'UpdateModal');
    });
}

function openDeleteDialog(id) {
    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id_agenda', id);
    // Se llama a la función que elimina un registro. Se encuentra en el archivo components.js
    confirmDelete(API_AGENDA, data);
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de buscar.
document.getElementById('search-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se llama a la función que realiza la búsqueda. Se encuentra en el archivo components.js
    searchRows(API_AGENDA, 'search-form');
});
