const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const db = require('./queries') //this is for calling functions in queries.js
const port = 3000;  //this is for the localhost 


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


//calls the login func in queries.js
app.post('/Login', (req,res)=>{
    console.log(req.body);
    db.Login(req.body.Username, req.body.Password, req, res);
  
});




//This group of code call Show functions in queries.js to print tables
app.get('/ShowEmp', (request, res) => {
	db.ShowEmp(request, res);	
})

app.get('/ShowEmpA', (request, res) => {
	db.ShowEmpA(request, res);
})

app.get('/ShowDep', (request, res) => {
	db.ShowDep(request, res);
})

app.get('/ShowDepA', (request, res) => {
	db.ShowDepA(request, res);
})

app.get('/ShowProj', (request, res) => {
	db.ShowProj(request, res);
})

app.get('/ShowProjA', (request, res) => {
	db.ShowProjA(request, res);
})

app.get('/ShowWO', (request, res) => {
	db.ShowWO(request, res);
})

app.get('/ShowWOA', (request, res) => {
	db.ShowWOA(request, res);
})




//what does this stuff do?
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');




//This group of code renders the html pages 
app.get('/', (request, res) => {    //this will render login page first
    res.render('Login.html');
})

app.get('/home', (request, res) => {
    res.render('home.html');
})

app.get('/homeAdmin', (request, res) => {
    res.render('homeAdmin.html');
})

app.get('/DelEmp', (request, res) => {
    res.render('DeleteEmp.html');
})

app.get('/DelWO', (request, res) => {
    res.render('DeleteWO.html');
})

app.get('/DelProj', (request, res) => {
    res.render('DeleteProj.html');
})

app.get('/DelDep', (request, res) => {
    res.render('DeleteDep.html');
})




//This group of code will call the Delete functions in queries.js to delete rows from a table
app.post('/DeleteEmp', (req,res)=>{
    console.log(req.body);
    db.DeleteEmp(req.body.EID, res, req);
    console.log("DeleteEmp")
});

app.post('/DeleteWO', (req,res)=>{
    console.log(req.body);
    db.DeleteWO(req.body.DID, req.body.PID, res, req);
    console.log("DeleteWO")
});

app.post('/DeleteProj', (req,res)=>{
    console.log(req.body);
    db.DeleteProj(req.body.PID, res, req);
    console.log("DeleteProj")
});

app.post('/DeleteDep', (req,res)=>{
    console.log(req.body);
    db.DeleteDep(req.body.DID, res, req);
    console.log("DeleteDep")
});




////This group of code will call the create functions in queries.js to create new rows in a table
app.post('/addEmployee', (req,res)=>{
    console.log(req.body);
    db.createEmp(req.body.SSN, req.body.EID, req.body.Name, req.body.Salary, req.body.Address, req.body.DOB, req.body.Username, req.body.Password, res, req);
    console.log("I have submitted")
});

app.post('/addDepartment', (req,res)=>{
    console.log(req.body);
    db.createDep(req.body.DID, req.body.Dname, req.body.MgrID, req.body.Daddress, res, req);    
    console.log("I have submitted")
});

app.post('/addProjects', (req,res)=>{
    console.log(req.body);
    db.createProj(req.body.PID, req.body.Pname, req.body.Plocation, res, req);    
    console.log("I have submitted")
});

app.post('/addWorksOn', (req,res)=>{
    console.log(req.body);
    db.createWO(req.body.EID, req.body.PID, req.body.MgrID, req.body.DID, req.body.Pstart, req.body.Pend, res, req);   
    console.log("I have submitted")
});




//This group of code will render the insert pages where users enter info to add to a Table
app.get('/Insert', (request, res) => {
    res.render('Insert.html');
})

app.get('/InsertWO', (request, res) => {
    res.render('InsertWO.html');
})

app.get('/InsertProj', (request, res) => {
    res.render('InsertProj.html');
})
app.get('/InsertDep', (request, res) => {
    res.render('InsertDep.html');
})




//This is for cmd line to make sure it was called successfully
console.log("index.js called successfully")

//This is for cmd line to make sure the app is still running 
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})