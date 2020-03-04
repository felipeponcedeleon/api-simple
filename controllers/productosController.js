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

exports.mostrarProductos = async(req, res, next) => {

}

exports.mostrarProducto = async(req, res, next) => {

}

exports.actualizarProducto = async(req, res, next) => {

}

exports.eliminarProducto = async(req, res, next) => {

}