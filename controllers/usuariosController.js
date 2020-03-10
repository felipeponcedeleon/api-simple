const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registrarUsuario = async(req, res) => {
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 10);

    try {
        await usuario.save();
        res.json({ mensaje: 'Usuario creado con éxito!'});
    } catch (error) {
        res.json({ mensaje: 'Ocurrió un error.'});
    }
}

exports.autenticarUsuario = async(req, res, next) => {
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if(!usuario) {
        await res.status(401).json({
            mensaje: 'Usuario no existente.'
        });
    }else {
        if(!bcrypt.compareSync(password, usuario.password)) {
            await res.status(401).json({ 
                mensaje: 'Contraseña incorrecta'
            });
        } else {
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            }, 'SUPERSECRETO', {
                expiresIn: '2h'
            });

            res.json({token});


        }
    }
}