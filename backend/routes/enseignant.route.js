const express = require('express');
const app = express();
const createError = require('http-errors');

const enseignantRoute = express.Router();

let Enseignant = require('../model/Enseignant');

//Add Enseignant
enseignantRoute.route('/add-enseignant').post((req, res, next) => {
    Enseignant.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//Get all enseignants
enseignantRoute.route('/').get((req, res) => {
    Enseignant.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// Get single enseignant
enseignantRoute.route('/read-enseignant/:id').get((req, res, next) => {
    Enseignant.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

//Update enseignant
enseignantRoute.route('/update-enseignant/:id').post((req, res, next) => {
    Enseignant.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
          console.log(error);
            return next(error);
        }else{
            res.json(data)
        }
        console.log('Enseignant mis à jour avec succès !')
    })
})

//Delete Enseignant

enseignantRoute.route('/delete-enseignant/:id').delete((req, res, next) => {
    Enseignant.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

  module.exports = enseignantRoute;