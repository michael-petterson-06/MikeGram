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
        return;
    }
    res.status(201).json(newPhoto);
}

// Remover foto
const deletePhoto = async(req,res) => {
    const { id } = req.params;
    try {
        const reqUser = req.user;
        const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
        if(!photo) {
            res.status(404).json({ errors: ['Foto não encontrada']});
        return;
    }
    // Checar se foto pertence ao usuário
    if(!photo.userId.equals(reqUser._id)) {
        res.status(422).json({ errors: ['Ocorreu um erro por favor tente mais tarde.']});
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200).json({ id: photo._id, message: 'Foto excluída com sucesso.'});
    } catch (error) {
        res.status(404).json({ errors: ['Foto não encontrada']});
        return;
    }
}   

module.exports = { insertPhoto, deletePhoto };


