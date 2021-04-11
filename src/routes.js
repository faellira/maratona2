const express = require("express")
const routes = express.Router()//routes 
const profileController = require('./controllers/profileController')
const jobController = require('./controllers/jobController')
const dashboardController = require('./controllers/dashboardController')
// necessary without ejs package
//const basePatch = __dirname + "/views" basePatch(main directory)
//routes.get('/', (req, res) => res.sendFile(basePatch + "./index.html"))


//request and response(req, res)

routes.get('/', dashboardController.index)

routes.get('/job', jobController.create)

routes.post('/job', jobController.save)

routes.get('/job/:id', jobController.show)

routes.post('/job/:id', jobController.update)

routes.post('/job/delete/:id', jobController.delete)

routes.get('/profile', profileController.index)

routes.post('/profile', profileController.update)

module.exports = routes;