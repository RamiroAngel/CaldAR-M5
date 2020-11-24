const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const boilerTypes = require('boiler-types.js');

// PORT 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Gets all boiler types
app.get('/data/boiler-types', (req, res) => res.json(boilerTypes));

// Gets boiler type by ID
app.get('/data/boiler-types/id', (req, res) => {
    const found = boilerTypes.some(boilerTypes => boilerTypes.id_boiler_type === parseInt(req.query.id_boiler_type));
    if(found){
        res.json(boilerTypes.filter(boilerTypes => boilerTypes.id_boiler_type === parseInt(req.query.id_boiler_type)));
    } else{
        res.status(400).json({msg : `No member with id of ${req.query.id_boiler_type}`});
    }
});

// Gets boilerTypes by Attribute
app.get('/data/boiler-types/:filter', (req,res) => {
    const filterboilerTypes = boilerTypes;
    if(req.query.id_boiler_type !== undefined){
        filterboilerTypes = filterboilerTypes.filter(boilerTypes => boilerTypes.id_boiler_type === parseInt(req.query.id_boiler_type));
    }
    if(req.query.id_Buildings !== undefined){
        filterboilerTypes = filterboilerTypes.filter(boilerTypes => boilerTypes.id_Buildings === parseInt(req.query.id_Buildings));
    }
    if(req.query.description !== undefined){
        filterboilerTypes = filterboilerTypes.filter(boilerTypes => boilerTypes.description === (req.query.description));
    }
    if(req.query.skills !== undefined){
        filterboilerTypes = filterboilerTypes.filter(boilerTypes => boilerTypes.skills === (req.query.skills));
    }
    if(req.query.stock !== undefined){
        filterboilerTypes = filterboilerTypes.filter(boilerTypes => boilerTypes.stock === parseInt(req.query.stock));
    }
    console.log(req.query.type)
    return res.json(filterboilerTypes);
};