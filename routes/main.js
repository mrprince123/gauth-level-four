// const experss = require('express');
// const router = experss.Router();
// const UserModel = require('../models/User');



// router.get('/', function (req, res) {
//     res.render('../views/home');
// });

// router.get("/register", function (req, res) {
//     res.render("register");
// });

// router.get("/login", function (req, res) {
//     res.render("login");
// });


// router.post('/register', function (req, res) {
//     const newUser = new UserModel({
//         name: req.body.name,
//         email: req.body.username,
//         password: req.body.password
//     });

//     newUser.save(function (err) {
//         if (err) {
//             console.log("This is the error : " + err);
//         } else {
//             res.render("secrets");
//         }
//     })
// });


// router.post("/login", function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;

//     UserModel.findOne({ email: username }, function (err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             if (foundUser) {
//                 if (foundUser.password === password) {
//                     res.render("secrets");
//                 } else {
//                     res.render("wrong");
//                 }
//             }
//         }
//     });
// });


// module.exports = router;