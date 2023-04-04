var Todo = require("../model/schema");
var Todo2 = require("../model/schema2");
const HTTP = require("../../constant/response.constant");

var path = require("path");
const fs = require("fs");

var jwt = require("jsonwebtoken");

var SECRET_KEY = process.env.SECRET_KEY || "ThisisSECRETKEY";

var session;

class class1 {

    static a = async (req, res) => {

        try {

            res.render("login");

        } catch (e) {

            console.log(err);
            return res.status(HTTP.SUCCESS).send({
                "errors": [{
                    "message": "Something went wrong!",
                    "code": HTTP.INTERNAL_SERVER_ERROR
                }
                ]
            })

        }

    }

    static b = async (req, res) => {

        try {

            var a = await Todo2.find({});

            if (a[0].username == req.body.username && a[0].password == req.body.password) {

                var token = jwt.sign({ username: req.body.username }, SECRET_KEY);

                var session = req.session;
                session.token = token;

                res.redirect('/upload');
                // res.render("files");

            } else {
                res.render("404");
            }

        } catch (err) {

            console.log(err);
            return res.status(HTTP.SUCCESS).send({
                "errors": [{
                    "message": "Something went wrong!",
                    "code": HTTP.INTERNAL_SERVER_ERROR
                }
                ]
            })

        }

    }

    static c = async (req, res) => {

        try {

            if (req.session.token) {
                res.render("files");
            } else {
                res.redirect('/login');
            }

        } catch (e) {

            console.log(err);
            return res.status(HTTP.SUCCESS).send({
                "errors": [{
                    "message": "Something went wrong!",
                    "code": HTTP.INTERNAL_SERVER_ERROR
                }
                ]
            })

        }

    }

    static d = async (req, res) => {

        try {

            var session = req.session;

            if (req.session.token) {

                var a = await Todo.find({});
                var b = a.length + 1

                let data = new Todo({
                    srnumber: b
                })

                await data.save();

                var dir = path.join(__dirname, `../../public/${b}`);
                fs.mkdirSync(dir, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("New first Directory created successfully !!");
                    }
                });

                var moveFile = (file, dir2) => {

                    var f = path.basename(file);
                    var dest = path.resolve(dir2, f);

                    fs.rename(file, dest, (err) => {
                        if (err) throw err;
                        else console.log('Successfully moved');
                    });

                };

                for (var j = 0; j < req.files.length; j++) {


                    moveFile(path.join(__dirname, `../${req.files[j].originalname}`), path.join(__dirname, `../../public/${b}`));


                }

                fs.copyFile(path.join(__dirname, `../index.html`), path.join(__dirname, `../../public/${b}/index.html`), (err) => {

                    if (err) {

                        console.log("Error Found:", err);

                    } else {

                        console.log('File has been moved to another folder.')

                    }

                });

                if (req.files.length == 5) {

                    fs.copyFile(path.join(__dirname, `../../public/icon.jpg`), path.join(__dirname, `../../public/${b}/icon.jpg`), (error) => {
                        if (error) {
                            throw error
                        } else {
                            console.log('File has been moved to another folder.')
                        }
                    })

                }

                res.render("success")

            } else {
                res.redirect('/login');
            }

        } catch (err) {

            console.log(err);
            return res.status(HTTP.SUCCESS).send({
                "errors": [{
                    "message": "Something went wrong!",
                    "code": HTTP.INTERNAL_SERVER_ERROR
                }
                ]
            })

        }

    }

    static e = async (req, res) => {

        try {

            var a = await Todo.find({});
            var token = jwt.sign({ username: req.body.username }, SECRET_KEY);
            var session = req.session;
            session.userid = token;

            res.render('index', { a })

        } catch (e) {

            console.log(err);
            return res.status(HTTP.SUCCESS).send({
                "errors": [{
                    "message": "Something went wrong!",
                    "code": HTTP.INTERNAL_SERVER_ERROR
                }
                ]
            })

        }

    }
    
    static f = async (req, res) => {

        try {

            if (req.session.token) {

                var dir = path.join(__dirname, `../../public/${req.params.id}`);

                fs.rmSync(dir, { recursive: true, force: true });

                await Todo.find({srnumber:req.params.id}).deleteOne();

                res.render("delete")

            } else {
                res.redirect('/login');
            }

        } catch (err) {

            console.log(err);
            return res.status(HTTP.SUCCESS).send({
                "errors": [{
                    "message": "Something went wrong!",
                    "code": HTTP.INTERNAL_SERVER_ERROR
                }
                ]
            })

        }

    }

}

module.exports = { class1 };
