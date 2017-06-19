// setting up our express server
const express = require('express');
const app = express();
const models = require('./models')
const indexRouter = require('./routes/index');
// logging middleware and body parsing middleware
const morgan = require('morgan');
const bodyparser = require('body-parser');

const nunjucks = require('nunjucks');
nunjucks.configure('views', { noCache: true });
app.set("view engine", "html");
app.engine("html", nunjucks.render);
//const routes = require('./routes');

// GET, POST, DELETE, PUT
// USE is the catch all
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



app.use(express.static('public'));



app.get('/', (req, res, next) => {
    console.log('send now');
    res.redirect('/wiki');
});

// app.get('/wiki', (req, res, next) => {
//     res.send('hello');
// })
app.use('/', indexRouter)

models.db.sync({ force: true })
    .then(function() {
        // make sure to replace the name below with your express app
        app.listen(3000, function() {
            console.log('Server is listening on port 3000!');
        });
    })
    .catch(console.error);