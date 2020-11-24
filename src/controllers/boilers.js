const express = require('express');
const { type } = require('os');
const path = require('path');
const boilers = require('../data/data.json');

const app = express();
app.listen(3000,()=>{
    console.log('App running in port 3000')
})
app.use(express.static(path.join(__dirname,'controllers')))

//get all boilers 
const getBoilersAll = (req,res) => {
    var datos = path.join(__dirname,'../data/data.json')
    res.sendFile(datos)
};
app.get('/',getBoilersAll);

// getBoilerById
const getBoilersById = (req,res)=>{
    const found = boilers.some(boilers => boilers.id_boiler == parseInt(req.query.id_boiler));
    
    if(found){
        res.json(boilers.filter(boilers => boilers.id_boiler == parseInt(req.query.id_boiler)));
    }else{
        res.status(400).json({msg : `No member with id of ${req.query.id_boiler}`})
    }
}
app.get('/id_boiler',getBoilersById);

//getBoilerByAttribute
const getBoilersByAttribute = (req,res)=>{
    var filterBoilers = boilers;
    if(req.query.id_boiler !== undefined){
        filterBoilers = filterBoilers.filter(boilers => boilers.id_boiler === parseInt(req.query.id_boiler))
    }
    if(req.query.description !== undefined){
        filterBoilers = filterBoilers.filter(boilers => boilers.description === (req.query.description))
    }
    if(req.query.type !== undefined){
        filterBoilers = filterBoilers.filter(boilers => boilers.type === parseInt(req.query.type))
    }
    if(req.query.maintance_rate !== undefined){
        filterBoilers = filterBoilers.filter(boilers => boilers.maintance_rate === (req.query.maintance_rate))
    }
    if(req.query.hour_maintaince_cost !== undefined){
        filterBoilers = filterBoilers.filter(boilers => boilers.hour_maintaince_cost === parseInt(req.query.hour_maintaince_cost))
    }
    if(req.query.hour_eventual_cost !== undefined){
        filterBoilers = filterBoilers.filter(boilers => boilers.hour_eventual_cost === parseInt(req.query.hour_eventual_cost))
    }
    console.log(req.query.type)
    return res.json(filterBoilers);

}
app.get('/filter',getBoilersByAttribute);

//deleteBoilerById
const deleteBoilersById = (req,res)=>{
    const found = boilers.some(boilers => boilers.id_boiler === parseInt(req.query.id_boiler));

    if(found){
    res.json({ 
        msg: 'Boilers has been removed',
        boilers: boilers.filter(boilers => boilers.id_boiler !== parseInt(req.query.id_boiler))});
    }else{
        res.status(400).json({msg : `No member with id of ${req.query.id_boiler}`})
    }
}
app.delete('/id_boiler',deleteBoilersById);









