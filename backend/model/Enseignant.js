const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Enseignant = new Schema({
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    statut: {
        type: String
    },
    UC: {
        type: Number
    },
    enseignements: {
        type: Array
    }
}, {
    collection: 'enseignants'
})
module.exports = mongoose.model('Enseignant', Enseignant)