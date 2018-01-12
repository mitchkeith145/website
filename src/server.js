const express = require('express')
const app = express()
const process = require('process'), path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(process.cwd(), "html/home.html")));

app.use(express.static('public'));

app.listen(3000, () => console.log('Example app listening on port 3000!'))