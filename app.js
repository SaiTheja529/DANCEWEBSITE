
const express = require('express');
const fs=require("fs")
const path = require('path')
const app = express();
const port = 80;

// const bodyparser=require('body-parser')  we didnt use body parser here

// getting-started with mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const contact = mongoose.model('contact', contactSchema);












// EXPRESS RELATED STUFF
// for serving static files
app.use('/static',express.static('static'));
app.use(express.urlencoded())

// PUG RELATED STUFF
// set the template engine as pug
app.set('view engine', 'pug')

// set the views directory
app.set('views',path.join(__dirname,'views'));


// END POINTS
app.get('/',(req,res)=>{
    const con ="";
    const params ={}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const con ="";
    const params ={}
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send(" this item has been saved to database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })


    // res.status(200).render('contact.pug')
})


// start the server
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
})