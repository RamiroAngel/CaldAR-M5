const express = require('express');
const app = express();
const path = require('path');

const buildings = require('../data/buildings.json');

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server starter on port ${PORT}`));


//Gets all 
const getbuildingsAll = (req, res) => 
{
    const data = path.resolve(__dirname, '../data/buildings.json');
    res.sendFile(data);
};

app.get('/api/buildings', getbuildingsAll);

//Gets by Id
app.get('/api/buildings/:id_buildings', (req, res) => {
    const buildingFound = buildings.find(building => building.id_building === parseInt(req.params.id_building));
    if(buildingFound) {
        res.json(buildingFound);
    }
    else {
        res.status(400).json({msg: `No building with id of ${req.query.id_building}`});
    }
});


//Gets by attribute
app.get('./buildings/:filter', (req, res)=> {
    const filterbuildings = buildings;
    if(req.params.id_building !== undefined){
        filterbuildings = filterbuildings.filter(building => building.id_building === parseInt(req.params.id_building));
    }
    if(req.query.name !== undefined){
        filterbuildings = filterbuildings.filter(building => building.cuit === (req.query.cuit));
    }
    if(req.query.email !== undefined){
        filterbuildings = filterbuildings.filter(building => building.email === parseInt(req.query.email));
    }
    if(req.query.street !== undefined){
        filterbuildings = filterbuildings.filter(building => building.buildings === (req.query.buildings));
    }
    if(req.query.manager !== undefined){
        filterbuildings = filterbuildingd.filter(building => building.fiscal_address === parseInt(req.query.fiscal_address));
    }
    return res.json(filterbuildings);
});

//delete ById
app.delete('/buildings/:id_building', (req, res) => {
    const buildingFound = buildings.find(building => building.id_building === parseInt(req.params.id_building));
    if(buildingFound) 
    {
        res.json({msg: `building has been removed`});
    }
    else {
        res.status(400).json({msg: `No building with id of ${req.query.id_building}`});
    }
});