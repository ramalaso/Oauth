const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');
require('dotenv').config();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
}));

const isLoggedIn = (req, res, next) => {
    if (req.user) next();
    else res.sendStatus(401);
};

app.get('/', (req, res) => res.send('You are not logged in'));
app.get('/failed', (req, res) => re.send('You are failed to login'));
app.get('/good', isLoggedIn, (req, res) => re.send('Welcome ' + req.user.email));

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
