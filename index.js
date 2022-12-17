const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World - This is Dev!');
})

app.get('/secrets', (req, res) => {
    return res.json({
        secrets: process.env
    });
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
})