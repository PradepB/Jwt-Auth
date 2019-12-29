const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()


app.get('/api', (req, res) => {
    res.json({ message: "Welcome Api" })
})

app.post('/api/posts', verifyToken, (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, 'secretkey', (err, authdata) => {
        console.log(err)
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post api created",
                authdata
            })
        }
    })
})

app.post('/api/login', (req, res) => {

    const user = {
        id: 1,
        username: 'bad',
        email: 'bad@gmail.com'
    }
    jwt.sign({ user }, 'secretkey', {expiresIn:'30s'}, (err, token) => {
        res.json({ token })
    })
})

function verifyToken(req, res, next) {

    const bHeader = req.headers['authorization']
    if (typeof bHeader !== 'undefined') {
        const bearer = bHeader.split(' ')
        const bearerTokken = bearer[1]
        console.log(bearerTokken)
        req.token = bearerTokken
        next()

    } else {
        res.sendStatus(403)
    }
}



app.listen(8080, () => {
    console.log("Port running on 8080")
})