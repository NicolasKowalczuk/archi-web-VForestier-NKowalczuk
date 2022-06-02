const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Module = new Schema({
    nom: {
        type: String
    },
    
    formation: {
        type: String
    },
    semestre: {
        type: Number
    },
    ref: {
        type: String
    },
    intitutle: {

    },
    statut: {

    },
    "h/CM": {

    },
    "h/TD": {

    },
    "h/TP": {

    },
    effectif:{ 

    },
    grCM:{

    },
    grTD:{

    },
    grTP:{
        
    }
}, {
    collection: 'modules'
})
module.exports = mongoose.model('Module', Module)