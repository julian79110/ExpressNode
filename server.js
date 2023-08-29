const express = require('express');
const passport = require('passport');
const cookParser = require('cookie-parser')
const session = require('express-session');
const Strategy = require('passport-local');
const PassportLocal = require('passport-local').Strategy;


const app = express();

app.use(express.urlencoded({extended: true}))

app.use(cookParser('MI ULTRA SECRETO MKA'))
app.use(session({
    secret: 'MI ULTRA SECRETO MKA',
    resave:true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(function(username,password,done){
    if(username === "dylan_mka" && password === '1234')
    return done(null,{id: 1, name: 'Cody'});

    done(null, false);
}));

//{id: 1, name: 'Cody'}
// 1 = serial 
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// Deserial
passport.deserializeUser(function(id,done){
    done(null,{id: 1, name: 'Cody'}); 
})


app.set('view engine', 'ejs');

app.get("/",(req,res) => {
    //si
    
    //si no
    res.send('hola')
})

app.get('/login',(req,res) => {
    //mostrar dizque un formulario
    res.render("login")
});
app.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login'
}))

app.listen(8080, ()=> console.log("Server ha iniciado"))