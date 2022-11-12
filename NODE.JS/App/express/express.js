const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const router = require("../DB/router/router.js")
const path = require("path")

const app = express()

app.use(express.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(cors())
app.use(express.static(path.join(__dirname, '../front')))
app.use('/api', router)


app.get('/', (req, res, next) => {
    const currentLoc = path.join(process.cwd(), '../front', req.url === '/' ? "/index.html" : req.url)
 res.sendFile(currentLoc)
})


module.exports = app