const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


//Database Connectivity
const connectDB = require('./db');
connectDB();

//routes

app.use('/api/files', require('./routes/files'));





app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
    
})