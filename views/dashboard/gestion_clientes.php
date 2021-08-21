<?php
//Se incluye la clase con las plantillas del documento
require_once('../../app/helpers/dashboard_page.php');
//Se imprime la plantilla del encabezado y se envía el titulo para la página web
Dashboard_Page::headerTemplate('Clientes');
?>

<section>
    <div class="container">
        <div class="row">
            <div class="col-12 text-center" id="Titulo1">
                <h1 class="center">Gestión de Clientes</h1>
            </div>
        </div>
        <br>
        <!-- Navbar para los elementos de filtrado y agregar -->
        <div class="row">
            <div class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 p-3">
                <form class="d-flex" method="post" id="search-form">
                    <input id="search" class="form-control me-2" type="text" name="search" required />
                    <button class="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>

            <div class="col-6 col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-3 text-center" id="MuestraBTN">
                <div class="form-group">

                </div>
            </div>

            <div class="col-6 col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-3 text-center">
                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#ModalAgregarCliente">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Agregar
                </button>
            </div>
        </div>
        </nav>
        <br>
        <div class="row">
            <div class="table-responsive" class="col scroll">
                <table id="data-table" class="table table-bordered">
                    <thead class="table-info">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">NIT</th>
                            <th scope="col">DUI</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Estado pago</th>
                            <th scope="col">Controladores</th>
                        </tr>
                    </thead>
                    <tbody id="tbody-rows">
                    </tbody>
                </table>
            </div>

            <div class="row">
                <nav>

                    <div class="col-6 col-xs-6 col-sm-6 col-md-2 col-lg-2 col-xl-2 col-xxl-2 p-3 text-center"
                        id="MuestraBTN">
                        <div id="ModalAgregarCliente" class="modal fade">
                            <div class="container-fluid">
                                <form method="post" id="save-form">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="modal-title">Agregar cliente</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>

                                            <div class="modal-body">
                                                <div class="container">
                                                    <div class="form-group">
                                                        <label for="nombre_cli">Nombre</label>
                                                        <input type="text" class="form-control" id="nombre_cli"
                                                            name="nombre_cli" placeholder="Nombre cliente"
                                                            pattern="[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]{1,50}" required
                                                            minlength="3" maxlength="50" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="telefono_cli">Teléfono</label>
                                                        <input type="text" class="form-control" id="telefono_cli"
                                                            name="telefono_cli" placeholder="0000-0000"
                                                            pattern="[2,6,7]{1}[0-9]{3}[-][0-9]{4}" required
                                                            minlength="9" maxlength="9" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="nit_cli">NIT</label>
                                                        <input type="text" class="form-control" id="nit_cli"
                                                            name="nit_cli" placeholder="0000-000000-000-0" validate />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="dui_cli">Dui</label>
                                                        <input type="text" class="form-control" id="dui_cli"
                                                            name="dui_cli" placeholder="00000000-0" required
                                                            minlength="10" maxlength="10" validate />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="direccion_cli">Direccion</label>
                                                        <input type="text" class="form-control" id="direccion_cli"
                                                            name="direccion_cli" placeholder="Ej: Av. Los heroes"
                                                            required minlength="1" maxlength="300" />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="correo_cli">Correo</label>
                                                        <input type="text" class="form-control" id="correo_cli"
                                                            name="correo_cli" placeholder="usuario@gmail.com" validate
                                                            required />
                                                    </div>
                                                    <br>
                                                    <div class="form-group">
                                                        <label for="estado_pago">Estado Pago</label>
                                                        <select id="estado_pago" name="estado_pago">
                                                            <option selected></option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <br>
                                                <!-- Botones de Control -->
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-bs-dismiss="modal">Cancelar</button>
                                                    <button type="submit" class="btn waves-effect blue tooltipped"
                                                        data-tooltip="Guardar">Guardar</button><br>
                                                </div>
                                </form>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
            </nav>
            <br>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-title">Actualizar cliente</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Partes del modal para hacer insert -->
                    <form id="update-form" method="post" enctype="multipart/form-data">
                        <div class="form-group ">
                            <label for="formGroupExampleInput" class="d-none">ID</label>
                            <input type="text" class="form-control d-none" placeholder=""
                                aria-describedby="basic-addon1" id="id_cliente2" type="text" name="id_cliente2" />
                        </div>
                        <div class="modal-body">
                            <form id="update-form" method="post" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label for="nombre_cli2">Nombre</label>
                                    <input type="text" class="form-control" id="nombre_cli2" name="nombre_cli2"
                                        placeholder="Nombre cliente" pattern="[a-zA-ZñÑáÁéÉíÍóÓúÚ\s]{1,50}" required
                                        minlength="3" maxlength="50" />
                                </div>
                                <div class="form-group">
                                    <label for="telefono_cli2">Teléfono</label>
                                    <input type="text" class="form-control" id="telefono_cli2" name="telefono_cli2"
                                        placeholder="0000-0000" pattern="[2,6,7]{1}[0-9]{3}[-][0-9]{4}" required
                                        minlength="9" maxlength="9" />
                                </div>
                                <div class="form-group">
                                    <label for="nit_cli2">NIT</label>
                                    <input type="text" class="form-control" id="nit_cli2" name="nit_cli2"
                                        placeholder="0000-000000-000-0" validate required />
                                </div>
                                <div class="form-group">
                                    <label for="dui_cli2">Dui</label>
                                    <input type="text" class="form-control" id="dui_cli2" name="dui_cli2"
                                        placeholder="00000000-0" validate required minlength="10" maxlength="11" />
                                </div>
                                <div class="form-group">
                                    <label for="direccion_cli2">Direccion</label>
                                    <input type="text" class="form-control" id="direccion_cli2" name="direccion_cli2"
                                        placeholder="Ej: Av. Los heroes" required minlength="1" maxlength="300" />
                                </div>
                                <div class="form-group">
                                    <label for="correo_cli2">Correo</label>
                                    <input type="text" class="form-control" id="correo_cli2" name="correo_cli2"
                                        placeholder="usuario@gmail.com" validate required />
                                </div>
                                <br>
                                <div class="form-group">
                                    <label for="estado_pago2">Estado Pago</label>
                                    <select id="estado_pago2" name="estado_pago2">
                                        <option selected></option>
                                    </select>
                                </div>
                        </div>
                        <br>
                        <!-- Botones de Control -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn waves-effect blue tooltipped"
                                data-tooltip="Guardar">Guardar</button><br>
                        </div>
                    </form>
                    </form>

                </div>
            </div>
        </div>
    </div>
</section>


<?php
// Se imprime la plantilla del pie enviando el nombre del controlador para la página web.
Dashboard_Page::footerTemplate('clientes.js');
?>