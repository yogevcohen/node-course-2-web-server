const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('Failed writing log file', err);
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintaince.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('hello express!');
    res.render('home.hbs', {
        pageTitle: 'Home',
        wellcomeMessage: 'Wellcome',
    });
});
app.get('/about', (req, res) => {
    // res.send('hello express!');
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

app.get('/projects', (req, res) => {
    // res.send('hello express!');
    res.render('projects.hbs', {
        pageTitle: 'Projects',
    });
});

app.get('/bad', (req, res) => {
    // res.send('hello express!');
    res.send({
        errorMessage: 'Failed'
    });
});
app.listen(port, () => {
    console.log(`Server up ${port}`);
});