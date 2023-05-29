const Photo = require('../models/Photo');
const User = require('../models/User');
const mongoose = require('mongoose');


// Insira uma foto com usuário relacionado a mesma
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const  image  = req.file.filename;
    
    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    //Criar uma foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,        
    })

    //Se foto criada com sucesso, retorne dados
    if(!newPhoto) {
        res.status(422).json({
            errors: ['Houve um problema tente novamente mais tarde.']
        });
    }
    
    res.status(201).json(newPhoto);
}

module.exports = { insertPhoto };


