const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('streamIt', (text) => {
    return text.toUpperCase();
});

// register a middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to write server.log');
        }
    })
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.get('/', (req, res) => {
    //res.send('Hello express!');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Node JS'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        aboutContent: 'some content here'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Somthings went wrong!'
    });
});

app.listen(3000);