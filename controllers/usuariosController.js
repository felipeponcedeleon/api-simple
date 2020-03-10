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

exports.autenticarUsuario = () => {

}