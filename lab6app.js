const mongoose = require("mongoose");
const express = require("express");
const app = express();
let bodyParser = require('body-parser');
let randomstring = require("randomstring");
const url = 'mongodb://localhost:27017/';
const Author = require("./models/lab6author.js");
const Book = require("./models/lab6book.js");

app.use(express.static('css'));

mongoose.connect("mongodb://localhost:27017/newlibDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err) {
    if (err) {
      throw err;
    }

    console.log("Succesfully connected to the database.");
  }
);

app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/views/lab6homepage.html");
});

app.post('/addnewauthor', (req, res) => {
  console.log(req.body);
  const A = new Author({
    name: {
        fname: req.body.fname,
        lname: req.body.lname
    },
    dob: req.body.dob,
    address: {
        state: req.body.state,
        suburb: req.body.suburb,
        street: req.body.street,
        unit: req.body.unit
        
    },
    numBooks: parseInt(req.body.numbooks)
  });

  A.save(function (err) {
    if (err) {
      console.log("Unable to create Author", err.message);
      res.redirect("/addnewauthor");
    }
    else {res.redirect("/listbooks");}
  });
});

app.post('/addnewbook', (req, res) => {
  console.log(req.body);
  const B = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    dop: req.body.dop,
    summary: req.body.summary
  });

  B.save(function (err) {
    if (err) {
      console.log("Unable to create Book", err.message);
      res.redirect("/addnewbook");
    }
    else {res.redirect("/listbooks");}
  });
});

app.post('/deletebook', (req, res) => {
  Book.findOneAndDelete(
    { 'isbn': req.body.isbn }, 
    function (err, data) {
      if (err) {
        console.log("Unable to find isbn");
        res.redirect("/deletebook");
      }
      else {res.redirect("/listbooks");}
    });
});

app.post('/updateauthor', (req, res) => {
  Author.updateOne(
    { '_id': req.body.id },
    { $set: { 'numBooks': parseInt(req.body.numbooks) } },
    function (err, data) {
      if (err) {
        console.log("Invalid Input");
        res.redirect("/updateauthor");
      }
      else {res.redirect("/listbooks");}
    }
  )
});

app.get('/addnewauthor', (req, res) => {
  res.sendFile(__dirname + "/views/lab6newAuthor.html");
});

app.get('/listauthors', function (req, res) {
  Author.find(function (err, authors){
      
      res.render('lab6listAuthors.html', {ar:authors});
  });
});

app.get('/addnewbook', (req, res) => {
  let tempISBN = randomstring.generate(13);
  res.render('lab6newBook.html', {newISBN: tempISBN});
});

app.get('/listbooks', function (req, res) {
  Book.find().populate('author').exec(function (err, books){
      
      res.render('lab6listBooks.html', {ar:books});
  });
});

app.get('/deletebook', (req, res) => {
  res.sendFile(__dirname + "/views/lab6deleteBook.html");
});

app.get('/updateauthor', (req, res) => {
  res.sendFile(__dirname + "/views/lab6updateauthor.html");
});

app.listen(8080);
console.log('Server running at http:///localhost:8080/');