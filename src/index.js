const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const InstaAutomator = require('./insta-automator')

const app = express()
app.use(cors())
//app.use(bodyParser.urlencoded({extended: false}))
//app.use(bodyParser.json())

InstaAutomator.login()
// insta prefix methods.
app.get('/insta/v1', async (req, res) => {
  if (req.query.key != process.env.API_KEY) {
    //make sure the access key is valid
    res.status(401).send("Invalid key should be: " + process.env.API_KEY + " found: " + req.query.key)
  } else {
    //proxy the request.
    let result = await InstaAutomator.proxy(req.query.url)
    //if not logged in or an error -> return that error with a 401 code.
    if (result == "Not logged in" || result == "Error") {
      res.status(401).send(result)
    } else {
      //good response -> return that with a 200.
      res.send(result)
    }
  }
})
app.get('/insta/refresh', async (req, res) => res.send(await InstaAutomator.gatherXIGAppId()))
app.get('/insta/healthcheck', async (req, res) => {
  if (InstaAutomator.isLoggedIn()) {
    res.send("Healthy")
  } else {
    res.status(401).send("Insta Proxy Not Logged In")
  }
})
app.get('/insta/', async (req, res) => {
  res.send(`/v1/url?={instagram_api} to get json data. \r\n /refresh to re-evaluate x-ig-app-id if the bootstrapped value is outdated in some cases.`)
})

//basic methods to handle both usecases.
app.get('/v1', async (req, res) => {
  if (req.query.key != process.env.API_KEY) {
    //make sure the access key is valid
    res.status(401).send("Invalid key")
  } else {
    //proxy the request.
    let result = await InstaAutomator.proxy(req.query.url)
    //if not logged in or an error -> return that error with a 401 code.
    if (result == "Not logged in" || result == "Error") {
      res.status(401).send(result)
    } else {
      //good response -> return that with a 200.
      res.send(result)
    }
  }
})
app.get('/refresh', async (req, res) => res.send(await InstaAutomator.gatherXIGAppId()))
app.get('/healthcheck', async (req, res) => {
  if (InstaAutomator.isLoggedIn()) {
    res.send("Healthy")
  } else {
    res.status(401).send("Insta Proxy Not Logged In")
  }
})
app.get('/', async (req, res) => {
  res.send(`/v1/url?={instagram_api} to get json data. \r\n /refresh to re-evaluate x-ig-app-id if the bootstrapped value is outdated in some cases.`)
})

//setup the port and start listening.
const port = process.env.PORT || 8084
app.listen(port, () => console.log(`App start at port: ${port}`))
