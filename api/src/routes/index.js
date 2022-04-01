const router = require("express").Router();


const Controller = require('../controllers/Controller')
router.post("/",  Controller.parsePdf)

module.exports = router;