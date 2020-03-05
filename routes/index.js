const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');

module.exports = () => {

    //CLIENTES
    //Agregar nuevos clientes
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Mostrar cliente por ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar cliente por ID
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar cliente por ID
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);


    //PRODUCTOS
    //Agregar nuevos productos
    router.post('/productos', 
        productosController.subirArchivo,    
        productosController.nuevoProducto);

    //Obtener todos los productos
    router.get('/productos', productosController.mostrarProductos);

    //Mostrar producto por ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    //Actualizar producto por ID
    router.put('/productos/:idProducto', 
        productosController.subirArchivo,     
        productosController.actualizarProducto);

    //Eliminar producto por ID
    router.delete('/productos/:idProducto', productosController.eliminarProducto);


    //PEDIDOS
    //Agregar nuevo pedido
    router.post('/pedidos', pedidosController.nuevoPedido);

    //Obtener todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos);

    //Mostrar pedido por ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);

    //Actualizar pedido por ID
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);

    //Eliminar pedido por ID
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);

    return router;
}