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

app.get('/failed', (req, res) => re.send('You are failed to login'));
app.get('/good', (req, res) => re.send('Welcome ' + req.user.email));

app.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/good');
    });

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
