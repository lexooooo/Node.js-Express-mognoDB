const router = require("express").Router()
const controller = require("../controller/controller.js")



 router.post('/signup', controller.register)

 router.post('/signin', controller.logIn)

//  router.get()








module.exports = router