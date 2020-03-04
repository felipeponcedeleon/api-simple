const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

module.exports = () => {

    //Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Mostrar cliente por ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar cliente por ID
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar cliente por ID
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    return router;
}