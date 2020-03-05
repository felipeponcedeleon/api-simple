const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async(req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({mensaje: 'Se agregó un nuevo pedido.'});
    } catch(error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedidos = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        });
        res.json(pedidos);
    }catch(error) {
        console.log(error);
        next();
    }
}

exports.mostrarPedido = async(req, res, next) => {

}

exports.actualizarPedido = async(req, res, next) => {

}

exports.eliminarPedido = async(req, res, next) => {

}