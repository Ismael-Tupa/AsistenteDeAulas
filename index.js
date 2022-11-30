const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const mysql = require('mysql');
const path = require('path');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 9090);
app.set('views', path.join(__dirname, 'views'));
//confi view engine
const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.Option_estado = req.flash('Option_estado');
    res.locals.user = req.user || null;
    next();
});

const dotenv = require('dotenv');
dotenv.config({ path:'./env/.env'});

app.get('/', (req,res)=>{
    res.render("index");
})
//rutas
app.use(require('./route/aula.route'));
app.use(require('./route/ocupante.route'));
app.use(require('./route/estadoAula.route'));

app.listen(app.get('port'), ()=>{
    console.log('Server on port ', app.get('port'));
});