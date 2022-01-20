const express = require('express');
const app = express();
//value is part of import express
const PORT = process.env.PORT || 6907; //does port number matter? suggeested was 8080

app.use(express.json())
//change from app = require('express')(); to this configuration to use middleware

app.listen(
    PORT,
    () => console.log(`woah it's working! url is http://localhost:${PORT}`)
)

app.get('/lol', (req, res) => {
    res.status(200).send({
        lol: 'lmao',
        found: true,
        working: 'yes!'
    })
})

app.post('/lol/:id', (req, res) => {
    let { id } = req.params;
    let { idk } = req.body;

    if (!idk) {
        res.status(418).send({ message: 'Idk is required!' })
    }
    res.send({
        lol: `post made with ${idk}! ID of post is ${id}.`
    })
})
