const Producto = require('../models/Productos');

const multer = require('multer');
const shortid = require('shortid');


const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'));
        }
    },
}

//Pasar la configuracioón y el campo
const upload = multer(configuracionMulter).single('imagen');

exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
      if(error) {
        res.json({mensaje: error});
      }  
      return next();
    })
}

//Crear nuevo producto
exports.nuevoProducto = async(req, res, next) => {
    const producto = new Producto(req.body);

    try {
        if(req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto.'});
    } catch(error) {
        console.log(error);
        next();
    }
}

//Mostrar todos los productos
exports.mostrarProductos = async(req, res, next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch(error) {
        console.log(error);
        next();
    }
}

//Mostrar producto por ID
exports.mostrarProducto = async(req, res, next) => {

    const producto = await Producto.findById(req.params.idProducto);
    
    if(!producto) {
        res.json({mensaje: 'Ese producto no existe'});
        return next();
    }
    
    res.json(producto);
}

exports.actualizarProducto = async(req, res, next) => {
    try {

        //construir un nuevo producto
        let nuevoProducto = req.body;

        //verificar si hay imagen nueva
        if(req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            //Si no hay imagen entonces asigna la imagen anterior
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }


        let producto = await Producto.findOneAndUpdate({_id: req.params.idProducto},
            nuevoProducto, {
                new: true
        });
        res.json(producto);
    }catch(error) {
        console.log(error);
        next();
    }
}

exports.eliminarProducto = async(req, res, next) => {


    try {
        await Producto.findByIdAndDelete({ _id: req.params.idProducto});
        res.json({mensaje: 'Producto eliminado.'});
    }catch(error) {
        console.log(error);
        next();
    }


}