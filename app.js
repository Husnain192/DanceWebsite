const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

// Define mongoose schema
// Schema means how the data will be saved (model)
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))

app.use(express.urlencoded())

// Pug specific stuff
// Set the template engine as pug
app.set('view engine', 'pug')
// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item could not be saved to the database");
    })
    // res.status(200).render('contact.pug')
})

// start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
