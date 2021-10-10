import {router}  from "express";
import garden from("../models/garden.js");


module.exports = function (app) {
    app.get('/api/gardens', function (req, res, next) {
        getGardens(res);
    });

    // create garden and send back all gardens after creation
    app.post('/api/gardens', function (error, req, res, next) {
        Garden.create({
            text: req.body.text,
            width: req.body.width,
            length: req.body.length,
            plants: req.body.plants,
            done: false
        })
          .then(function(data) {
            getGardens(res);
        })
        .catch(function(err) {
            res.send(422, err);
        });
    });
     // delete a garden
    app.delete('/api/gardens/:garden_id', function (error, req, res, next) {
        Garden.remove({
            _id: req.params.garden_id
        }, function (err, garden) {
            if (err)
                res.send(err);

            getGardens(res);
        });
    });
}

function getGardens(res) {
    Garden.find(function (err, gardens) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(gardens); // return all gardens in JSON format
    }).populate('plants');
}