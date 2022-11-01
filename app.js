require('dotenv').config();
const mongoose = require('mongoose');
const experss = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = experss();


app.use(experss.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/againNewUserDB');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Here we will do the salting
// password + salt ( 28891 ) -> hash function -> hash 
// salt is the randome set of character.
// We can increase the complexity by salt rounds - means how many
// round of salt do you want.



// Put this userschema before teh mongoose model
const User = mongoose.model("User", UserSchema);


console.log(process.env.SECRET);

app.get('/', function (req, res) {
    res.render('home');
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/login", function (req, res) {
    res.render("login");
});



app.post('/register', function (req, res) {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

        const newUser = new User({
            // name: req.body.name,
            email: req.body.username,
            password: hash
        });

        newUser.save(function (err) {
            if (err) {
                console.log("This is the error : " + err);
            } else {
                res.render("secrets");
            }
        });
    })

});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, function (err, result) {
                    if (result === true) {
                        res.render("secrets");
                    } else {
                        res.render("wrong");
                    }
                });
            }
        }
    });
});

app.listen(3000, function () {
    console.log("Server is up and running on port 3000");
});