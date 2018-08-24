const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));


app.use( (req,res,next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log',log + '\n');
    next();

});


app.use( (req,res,next) => {
    res.render('maintenace.hbs');
});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (value) => {
    return value.toUpperCase();
})

app.get('/',(req,res) => {
   res.render('home.hbs',{
    pageTitle: 'Welcome Page',
    welcomeMessage : 'Hello'
})
});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage : 'bad request'

    });    
});


app.listen(3000, () => {
    console.log('Server is up on port 3000')
});
