 const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const technicians = require('technicians.js');

// PORT 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Gets all technicians
app.get('/data/technicians', (req, res) => res.json(technicians));

// Gets technician by ID
app.get('/data/technicians/id', (req, res) => {
    const found = technicians.some(technicians => technicians.id_technician === parseInt(req.query.id_technician));
    if(found){
        res.json(technicians.filter(technicians => technicians.id_technician === parseInt(req.query.id_technician)));
    } else{
        res.status(400).json({msg : `No member with id of ${req.query.id_technician}`});
    }
});

// Gets technicians by Attribute
app.get('/data/technicians/:filter', (req,res) => {
    const filterTechnicians = technicians;
    if(req.query.id_technician !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.id_boiler === parseInt(req.query.id_technician));
    }
    if(req.query.rol !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.rol === (req.query.rol));
    }
    if(req.query.email !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.email === (req.query.email));
    }
    if(req.query.fullname !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.fullname === (req.query.fullname));
    }
    if(req.query.phone !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.phone === parseInt(req.query.phone));
    }
    if(req.query.address !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.address === (req.query.address));
    }
    if(req.query.boiler !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.boiler === (req.query.boiler));
    }
    if(req.query.capabilities !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.boiler === parseInt(req.query.capabilities));
    }
    if(req.query.hour_rate !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.boiler === parseInt(req.query.hour_rate));
    }
    if(req.query.daily_capacity !== undefined){
        filterTechnicians = filterTechnicians.filter(technicians => technicians.boiler === parseInt(req.query.daily_capacity));
    }
    console.log(req.query.type)
    return res.json(filterTechnicians);
}

// Delete technicians by id

// Curly braces shows an error in the vscode
app.delete('/data/technicians./id_technician', (req,res) => {
    const found = technicians.some(technicians => technicians.id_technician === parseInt(req.query.id_technician));
    if(found){
        res.json({
            msg: 'Technicians has been removed',
            technicians: technicians.filter(technicians => technicians.id_technician !== parseInt(req.query.id_technician))});
    }else{
            res.status(400).json({msg : `No member with id of ${req.query.id_technician}`});
}