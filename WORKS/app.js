/*
    SETUP
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
// app.js - SETUP section

const path = require('path');


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
PORT = 3011;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.



/*
    ROUTES
*/
// app.js

// GET ROUTE for displaying index page
app.get('/', function(req, res)
    {
        res.render('index');
    });

// GET ROUTE for displaying all utility providers
app.get('/utility-providers', function(req, res) {
    let query = "SELECT * FROM UtilityProviders;";
    db.pool.query(query, function(error, rows, fields) {
        res.render('utility-providers', { data: rows });
    });
});

app.get('/providersID', function(req, res){
    let query = "SELECT name, service_type, utility_cost FROM UtilityProviders WHERE provider_ID = ?";
    let providerID = parseInt(req.query.id)
   db.pool.query(query, [providerID], function(error, results, fields) {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
                res.json(results);
        }
    });
});


// POST ROUTE for adding utility provider
app.post('/add-utility-provider-form', function(req, res) {
    let data = req.body;

    if (!data || !data.name || !data.service_type || !data.utility_cost) {
        console.log("Missing required fields");
        return res.sendStatus(400);  // Bad Request
    }

    // Ensure that the utility cost is a valid number
    let utilityCost = parseFloat(data.utility_cost);
    let name = data.name
    let serviceType = data.service_type

    let query = `INSERT INTO UtilityProviders (name, service_type, utility_cost) VALUES (?, ?, ?)`;
    console.log(name)
    
    db.pool.query(query, [name, serviceType, utilityCost], function(error, rows, fields) {
        if (error) {
            console.error(error);
            return res.sendStatus(500); // Internal Server Error
        } else {
            console.log("Utility provider added successfully");
            res.sendStatus(200); // OK
        }
    });
});


// PUT ROUTE for updating a utility provider by id
app.put('/update-utility-provider', function(req, res) {
    let data = req.body;

    let providerID = parseInt(data.providerId);
    let providerName = data.providerName;
    let serviceType = data.serviceType;
    let utilityCost = parseInt(data.utilityCost);

    if (isNaN(providerID) || isNaN(utilityCost)) {
        res.status(400).send(`Invalid entry`);
        return;
    }

    let selectUtilityProvider = 'SELECT * FROM UtilityProviders WHERE provider_ID = ?';
    let updateQuery = `UPDATE UtilityProviders 
                   SET name = ?, 
                       service_type = ?, 
                       utility_cost = ? 
                   WHERE provider_ID = ?`;

    let updateValues = [providerName, serviceType, isNaN(utilityCost) ? null : utilityCost, providerID];

    db.pool.query(updateQuery, updateValues, function(error, rows, fields) {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error: Unable to update utility provider.'); 
        } else {
            db.pool.query(selectUtilityProvider, [providerID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});



// DELETE ROUTE for deleting a utility provider by id
app.delete('/delete-utility-provider-ajax', function(req, res) {
    let data = req.body;
    let providerID = parseInt(data.id);

    let deleteQuery = "DELETE FROM UtilityProviders WHERE provider_ID = ?";

    db.pool.query(deleteQuery, [providerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500); 
        } else {
            res.sendStatus(204); 
        }
    });
});

app.listen(PORT, function(){     
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});