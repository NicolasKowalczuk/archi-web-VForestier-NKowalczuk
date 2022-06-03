const express = require('express');
const app = express();
const createError = require('http-errors');

const moduleRoute = express.Router();

let Module = require('../model/Module');

//Add Module
moduleRoute.route('/add-module').post((req, res, next) => {
    Module.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        }else{
            res.json(data)
        }
    })
});

//Get all modules
moduleRoute.route('/modules').get((req, res) => {
    Module.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
})

// Get single module
moduleRoute.route('/read-module/:id').get((req, res, next) => {
    Module.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })


  module.exports = moduleRoute;