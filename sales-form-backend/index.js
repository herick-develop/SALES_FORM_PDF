const express = require('express');
const env = require('dotenv');
const path = require('path');

const cors = require('./middlewares/cors');
const pdfRoute = require('./pdfRoutes');

const app = express();

env.config();

const port = 8001;

app.use( express.json() );

app.use( cors );

app.use( pdfRoute );

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})