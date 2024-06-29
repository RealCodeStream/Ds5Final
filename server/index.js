const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const cors = require('cors');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header(
        'Access-Control-Allow-Headers', 'Origin,X-CSRF-Token, X-Requested-With, Accept-Version, Content-Length, Content-MD5, Content-Type, Accept, Date, X-Api-Version, Authorization, X-Auth-Token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS,PATCH');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
const startServer = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/semestral");
        console.log('Connected to DB');
        //await createInitialAdmin();

        app.use(cors());
        app.use(express.json());
        app.use(routes);
        
        // Iniciar servidor
        app.listen(9000, () => {
            console.log("Server started on port 9000");
        });

    } catch (error) {
        console.error('Error connecting to DB or starting server:', error);
    }
};

startServer();
