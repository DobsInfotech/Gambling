const express = require("express");
const router = express.Router();
const { class1 } = require("../controller/controller");

var path = require("path");

var { upload } = require('../middleware/schema');

router.get("/login", class1.a)
router.post("/login", class1.b)

router.get("/upload", class1.c)
router.post("/upload",upload.array('add', 100 ), class1.d)

router.get("/", class1.e)

router.get("/delete/:id", class1.f)

module.exports = router;
