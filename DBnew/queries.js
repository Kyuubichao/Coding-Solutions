const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'job',
    password: 'abc',
    port: 5432,
})

pool.connect()
.then(() =>console.log("Connection to database successful"))
.catch(e => console.log(e))


//this function will determine whether a user has the correct user/pass and if they are admin or not
const Login = (Username, Password, req, response) => {
    pool.query('SELECT * FROM public."Employee" E WHERE E."Username" = $1 AND E."Password" = $2;', [req.body.Username, req.body.Password], (error, results) => {
        if (error) {
            throw error
        }

        var count = 0;
        for(var i=0; i<(results.rows).length; i++){ //this will count if querey above returned any rows
            count++;
        }

		if(count == 1){     //if user/pass is in the table
			if(results.rows[0].EID == '1'){     //Admin has Employee ID of 1
				response.render('homeAdmin.html');
				console.log("Admin Login Successful");
			}
			else{       //if they're not an Admin
            response.render('home.html');
            console.log("Login successful");
			}
        }
        else{       //if user/pass is incorrect
            response.render('err.html');
			console.log("Incorrect Password");
        }
        
    })
}



//prints Employee table normal view by rendering Employee.ejs
const ShowEmp = (request, response) => {
    pool.query('SELECT * from public."Employee";', (error, results) => {
        if (error) {
            throw error
        }
		
		response.render("Employee.ejs", {data: results.rows});
        console.log(results.rows);
    })
}


//prints Employee table with admin view by rendering EmployeeAdmin.ejs
const ShowEmpA = (request, response) => {
    pool.query('SELECT * from public."Employee";', (error, results) => {
        if (error) {
            throw error
        }
		
		response.render("EmployeeAdmin.ejs", {data: results.rows});
        console.log(results.rows);
    })
}


//prints Department table normal rendering Department.ejs
const ShowDep = (request, response) => {
    pool.query('SELECT * from public."Department";', (error, results) => {
        if (error) {
            throw error
        }

        response.render("Department.ejs", {data: results.rows});
        console.log(results.rows);        
    })
}


//prints Department table with admin view by rendering DepartmentAdmin.ejs
const ShowDepA = (request, response) => {
    pool.query('SELECT * from public."Department";', (error, results) => {
        if (error) {
            throw error
        }

        response.render("DepartmentAdmin.ejs", {data: results.rows});
        console.log(results.rows);  
    })
}


//prints WorksOn table normal view by rendering Projects.ejs
const ShowProj = (request, response) => {
    pool.query('SELECT * from public."Projects";', (error, results) => {
        if (error) {
            throw error
        }

        response.render("Project.ejs", {data: results.rows});
        console.log(results.rows);
    })
}


//prints Projects table with admin view by rendering ProjectAdmin.ejs
const ShowProjA = (request, response) => {
    pool.query('SELECT * from public."Projects";', (error, results) => {
        if (error) {
            throw error
        }

        response.render("ProjectAdmin.ejs", {data: results.rows});
        console.log(results.rows);
    })
}


//prints WorksOn table normal view by rendering WorksOn.ejs
const ShowWO = (request, response) => {
    pool.query('SELECT * from public."WorksOn";', (error, results) => {
        if (error) {
            throw error
        }

        response.render("WorksOn.ejs", {data: results.rows});
        console.log(results.rows);
    })
}


//prints WorksOn table with admin view by rendering WorksOnAdmin.ejs
const ShowWOA = (request, response) => {
    pool.query('SELECT * from public."WorksOn";', (error, results) => {
        if (error) {
            throw error
        }
		
        response.render("WorksOnAdmin.ejs", {data: results.rows});
        console.log(results.rows);
    })
}


//Deletes a row in Employee table
const DeleteEmp = (EID, response, req) => {
    pool.query('DELETE FROM public."Employee" E WHERE E."EID" = $1;', 
    [EID], (error, results) => {
        if (error) {	
            throw error
        }  
		ShowEmpA(req, response);    //after editng the table we also display the updated table
    })
}


//Deletes a row in WorksOn table
const DeleteWO = (DID, PID, response, req) => {
    pool.query('DELETE FROM public."WorksOn" W WHERE W."DID" = $1 AND W."PID" = $2;', 
    [DID, PID], (error, results) => {
        if (error) {	
            throw error
        }  
		ShowWOA(req, response);    //after editng the table we also display the updated table
    })
}


//Deletes a row in Employee table
const DeleteProj = (PID, response, req) => {
    pool.query('DELETE FROM public."Projects" P WHERE P."PID" = $1;', 
    [PID], (error, results) => {
        if (error) {	
            throw error
        }  
		ShowProjA(req, response);    //after editng the table we also display the updated table
    })
}


//Deletes a row in Department table
const DeleteDep = (DID, response, req) => {
    pool.query('DELETE FROM public."Department" P WHERE P."DID" = $1;', 
    [DID], (error, results) => {
        if (error) {	
            throw error
        }  
		ShowDepA(req, response);    //after editng the table we also display the updated table
    })
}


//creates a new row in Employee table
const createEmp = (SSN, EID, Name, Salary, Address, DOB, Username, Password, response, req) => {
    pool.query('INSERT INTO public."Employee" ("SSN", "EID", "EName", "Salary", "Address", "DOB", "Username", "Password") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [SSN, EID, Name, Salary, Address, DOB, Username, Password], (error, results) => {
        if (error) {	
            throw error
        }  

		ShowEmpA(req, response);    //after editng the table we also display the updated table
    })
}


//creates a new row in Department table
const createDep = (DID, Dname, MgrID, Daddress, response, req) => {
    pool.query('INSERT INTO public."Department" ("DID", "Dname", "MgrID", "Daddress") VALUES ($1, $2, $3, $4)',
    [DID, Dname, MgrID, Daddress], (error, results) => {
        if (error) {
            throw error
        }  
        ShowDepA(req, response);    //after editng the table we also display the updated table
    })
}


//creates a new row in Project table
const createProj = (PID, Pname, Plocation, response, req) => {
    pool.query('INSERT INTO public."Projects" ("PID", "Pname", "Plocation") VALUES ($1, $2, $3)',
    [PID, Pname, Plocation], (error, results) => {
        if (error) {
            throw error
        }  
		ShowProjA(req, response);    //after editng the table we also display the updated table
    })
}


//creates a new row in WorksOn table
const createWO = (EID, PID, MgrID, DID, Pstart, Pend, response, req) => {
    pool.query('INSERT INTO public."WorksOn" ("EID", "PID", "MgrID", "DID", "Pstart", "Pend") VALUES ($1, $2, $3, $4, $5, $6)',
    [EID, PID, MgrID, DID, Pstart, Pend], (error, results) => {
        if (error) {
            throw error
        }  
        ShowWOA(req, response);      //after editng the table we also display the updated table
    })
}



module.exports = {  //this exports all of the above functions so they can be used in index.js
    DeleteEmp, DeleteProj, DeleteWO, DeleteDep, ShowEmp, ShowDep, ShowProj, ShowWO, 
    createEmp, createDep, createProj, createWO, ShowEmpA, ShowDepA, ShowWOA, ShowProjA,
    Login
};