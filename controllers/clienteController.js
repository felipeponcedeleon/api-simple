const Clientes = require('../models/Clientes');

//Agregar un nuevo cliente
exports.nuevoCliente = async(req, res, next) => {
    //console.log(req.body);
    const cliente = new Clientes(req.body);

    try {
        //almacenar el registro
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo cliente.' });
    }catch(error) {
        console.log(error);
        next();
    }
}

//Muestra todo los clientes
exports.mostrarClientes = async(req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    }catch(error) {
        console.log(error);
        next();
    }
}

//Mostrar cliente por ID
exports.mostrarCliente = async(req, res, next) => {
    
        const cliente = await Clientes.findById(req.params.idCliente);

        if(!cliente) {
            res.json({mensaje: 'Ese cliente no existe'});
            next();
        }
        res.json(cliente);
}

exports.actualizarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente}, req.body, {
            new: true
        });
        res.json(cliente);
    }catch(error) {
        console.log(error);
        next();
    }
}

exports.eliminarCliente = async(req, res, next) => {
    
    try {
        await Clientes.findOneAndDelete({
            _id: req.params.idCliente
        });
        res.json({mensaje: 'Cliente eliminado.'});
        next();
    } catch (error){
        console.log(error);
        next();
    }
}
