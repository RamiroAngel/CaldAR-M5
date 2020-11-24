const express = require('express');
const app = express();
const path = require('path');
const companies = require('../data/construction-company.json');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server initialized on port ' + PORT));


//Gets all companies
const getCompaniesAll = (req, res) => {
    const data = path.resolve(__dirname, '../data/construction-company.json');
    res.sendFile(data);
};
app.get('/companies', getCompaniesAll);

//Gets company by Id
app.get('/companies/:id_company', (req, res) => {
    const companyFound = companies.find(company => company.id_company === parseInt(req.params.id_company));
    if(companyFound) {
        res.json(companyFound);
    }
    else {
        res.status(400).json({msg: `No company with id of ${req.query.id_company}`});
    }
});

//Gets company by attribute
app.get('./companies/:filter', (req, res)=> {
    const filterCompanies = companies;
    if(req.params.id_company !== undefined){
        filterCompanies = filterCompanies.filter(company => company.id_company === parseInt(req.params.id_company));
    }
    if(req.query.cuit !== undefined){
        filterCompanies = filterCompanies.filter(company => company.cuit === (req.query.cuit));
    }
    if(req.query.email !== undefined){
        filterCompanies = filterCompanies.filter(company => company.email === parseInt(req.query.email));
    }
    if(req.query.buildings !== undefined){
        filterCompanies = filterCompanies.filter(company => company.buildings === (req.query.buildings));
    }
    if(req.query.fiscal_address !== undefined){
        filterCompanies = filterCompanies.filter(company => company.fiscal_address === parseInt(req.query.fiscal_address));
    }
    if(req.query.user !== undefined){
        filterCompanies = filterCompanies.filter(company => company.user === parseInt(req.query.user));
    }
    return res.json(filterCompanies);
});

//deleteCompanyById
app.delete('/companies/:id_company', (req, res) => {
    const companyFound = companies.find(company => company.id_company === parseInt(req.params.id_company));
    if(companyFound) {
        res.json({msg: `Company has been removed`});
    }
    else {
        res.status(400).json({msg: `No company with id of ${req.query.id_company}`});
    }
});
